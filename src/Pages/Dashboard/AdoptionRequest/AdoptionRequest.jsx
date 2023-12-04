



import { MdDelete } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";


import { useMemo, useState } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const [currentPage , setCurrentPage]= useState(null);
  const email = user?.email || '';
const [count,setCount]= useState(0)
  const axiosSecure = useAxiosSecure();
  const { data: petData, isLoading ,refetch} = useQuery({
    queryKey: ['adoptedPets', { email,currentPage }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adopts?page=${currentPage}&limit=10`);
      return res.data;
    }
  });

  const {adopted,image,name}=petData || {};
  
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
        Header: "Email",
        accessor: "email",
        
      },
    
    {
      Header: "Adopt",
      accessor: "adopt",
      Cell: ({ row }) => (
        <button className="btn" onClick={() => handleAdopt(row.original.petId)}>
          < GrUploadOption className="text-xl text-green-500 "/> 
        </button>
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
  const handleDelete =async(id)=>{
    const res = await axiosSecure.delete(`/adopt/${id}`)
    if(res?.data){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} adoption record successfully Canceled`,
            showConfirmButton: false,
            timer: 1500
          });
    }

  }

    const handleAdopt = async (id) => {
        try {
       console.log(id);
      
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
            const updatedPet = { adopted: 'true' };
            await axiosSecure.put(`/pets/${id}`, updatedPet);
    
         
            const adoptionRecord = {
              adopted: 'true' 
              
            };
  
            const adoptRes = await axiosSecure.put(`/adopts/${id}`, adoptionRecord);
    
            if (adoptRes.data) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${name} adoption record successfully updated`,
                showConfirmButton: false,
                timer: 1500
              });
            }
            //if done
          }
        } catch (error) {
    
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
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
      <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]"> Adoption Request</h1>
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

export default AdoptionRequest;
