import { MdDelete } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyAddedPets = () => {
  const { user } = useAuth();
  const [currentPage , setCurrentPage]= useState(null);
  const email = user?.email || '';
const [count,setCount]= useState(0)
  const axiosSecure = useAxiosSecure();
  const { data: petData, isLoading ,refetch} = useQuery({
    queryKey: ['myaddedpets', { email,currentPage }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets?email=${email}&page=${currentPage}&limit=10`);
      return res.data;
    }
  });

  const {adopted,time,date,location,category,short_description,long_description,image,name}=petData || {};
  axiosSecure.get('/totalPetsData')
  .then(res=> 
    {
     const {count}= res.data;
      
      setCount(count)
    }
    )
  const numberOfPages = Math.ceil(count / 10);
  const pages = [...Array(numberOfPages).keys()]
  console.log(pages);
  const data = useMemo(() => petData || [], [petData]);
  const CustomAdoptedCell = ({ value }) => {
    let text = '';
  
    if (value === "true") {
      text = 'Adopted';
    } else if (value === "false") {
      text = 'Not Adopted';
    } else {
      text = 'Pending';
    }
  
    return <span>{text}</span>;
  };
  const columns = useMemo(
    () => [
      {
        Header: "Serial",
        accessor: (row, index) => index + 1,
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      }
      ,
      
     
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Pet Image" className="w-12 h-12 rounded-full" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Adopted",
        accessor: "adopted",
        Cell: CustomAdoptedCell,
      },
    
    {
      Header: "Adopt",
      accessor: "adopt",
      Cell: ({ row }) => (
        <button className="btn" onClick={() => handleAdopt(row.original._id)}>
          < GrUploadOption className="text-xl text-green-500 "/> 
        </button>
      ),
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (

        <Link to={`/dashboard/my-pet-edit/${row.original._id}`}>
          <button>
          <FiEdit  className="text-2xl font-bold text-[#FFFF99] hover:text-black "/> 
        </button>
        </Link>
      ),
    },
 
    {
      Header: "Delete",
      accessor: "delete",
      Cell: ({ row }) => (
        <button className="btn" onClick={() => handleDelete(row.original._id)}>
          <MdDelete  className="text-xl text-red-500 "/> 
        </button>
      ),
    },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
    const handleDelete = async (id) => {
      try {
        const { data: petData } = await axiosSecure.get(`/pets/${id}`);
        const { adopted } = petData;
    
        const confirmationResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Delete it!"
        });
    
        if (confirmationResult.isConfirmed) {
          const petRes = await axiosSecure.delete(`/pets/${id}`);
          refetch();
    
          if (adopted === "pending" || adopted === "true") {
            const adoptRes = await axiosSecure.delete(`/adopts/${id}`);
            refetch();
    
            if (adoptRes.data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Pet and its adoption entry have been deleted.",
                icon: "success"
              });
            }
          } else {
            if (petRes.data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Pet has been deleted.",
                icon: "success"
              });
            }
          }
        }
      } catch (error) {
        console.error('Error in handleDelete:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    };
    
const handleAdopt = async (id) => {
  try {
    const { data: petData } = await axiosSecure.get(`/pets/${id}`);
    const { adopted, name, email, location, user, image, long_description, short_description, category, date, time } = petData;

    if (adopted === 'true') {
      Swal.fire(`Already ${name} is Adopted`);
      return;
    }

    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Adopt it!"
    });

    if (confirmationResult.isConfirmed) {
      const newAdopted = 'true';
      const updateAdopted = { adopted: newAdopted };

      if (adopted === 'pending') {
        await axiosSecure.put(`/pets/${id}`, updateAdopted);

        const adoptFormData = {
          adoptUserEmail: email,
          adoptUserLocation: location,
          adoptUserName: user?.displayName,
          adoptUserNumber: '',
          image,
          name,
          long_description,
          short_description,
          category,
          adopted: newAdopted,
          location,
          date,
          time,
          petId: id,
          ownerEmail: email
        };

        const adoptRes = await axiosSecure.post('/adopts', adoptFormData);

        if (adoptRes.data.insertedId) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} successfully added in Adopt collection`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else if (adopted === 'false') {
        await axiosSecure.put(`/pets/${id}`, updateAdopted);

        const adoptFormData = {
          adoptUserEmail: email,
          adoptUserLocation: location,
          adoptUserName: user?.displayName,
          adoptUserNumber: '',
          image,
          name,
          long_description,
          short_description,
          category,
          adopted: newAdopted,
          location,
          date,
          time,
          petId: id,
          ownerEmail: email
        };

        const adoptRes = await axiosSecure.post('/adopts', adoptFormData);

        if (adoptRes.data.insertedId) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} successfully added in Adopt collection`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
  } catch (error) {
    console.error('Error in handleAdopt:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
};

const handlePrePage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < pages.length) {
    setCurrentPage(currentPage + 1);
  }
};

  return (
    <div className="App">
      <div className="flex justify-center text-center items-center my-10">
      <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">My Added Pets</h1>
      </div>
      <div className="container mx-auto my-8">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right rounded-lg bg-gradient-to-r text-white font-bold to-[#0000FF] from-[#00ff9d]"
        >
          <thead className="text-md font-bold rounded-lg  bg-[#FF0505] text-white   uppercase">
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup._id}
                {...headerGroup.getHeaderGroupProps()}
                className=" rounded-lg"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column._id}
                    {...column.getHeaderProps()}
                    className="p-2 font-semibold text-left"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-black" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row._id} {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column._id}
                      {...cell.getCellProps()}
                      className="p-2 border-t border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
{
  count > 10 ? 

  <div className="join">
  <button onClick={handlePrePage} className="join-item btn">«</button>
 
  { 
                    pages?.map(page=> <button 
                        className={currentPage === page ? 'join-item btn active' : 'join-item btn'}
                        onClick={()=> setCurrentPage(page)} 
                        key={page}
                        >{page}</button>)

                        
                }


  <button  onClick={handleNextPage} className="join-item btn">»</button>
</div>
: ''
}
      </div>
    </div>
  );
};

export default MyAddedPets;
