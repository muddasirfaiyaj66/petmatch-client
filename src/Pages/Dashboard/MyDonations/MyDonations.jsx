
import { HiReceiptRefund } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyDonations = () => {
    const { user } = useAuth();
  const [currentPage , setCurrentPage]= useState(null);
  const email = user?.email || '';
const [count,setCount]= useState(0)
  const axiosSecure = useAxiosSecure();
  const { data:campaignData, isLoading ,refetch} = useQuery({
    queryKey: ['myDonations', { email,currentPage }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${email}&page=${currentPage}&limit=10`);
      return res.data;
    }
  });

  const {image,name,donatedAmount,petName,_id}=campaignData || {};
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
  const data = useMemo(() => campaignData || [], [campaignData]);

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
          <img src={value} alt="Donation Image" className="w-12 h-12 rounded-full" />
        ),
      },
      {
        Header: "Pet Name",
        accessor: "petName",
      },
      {
        Header: "Donated Amount",
        accessor: "donatedAmount",
      },
      
 
    {
        Header: "Refund",
        accessor: "Refund", 
        Cell: ({ row }) => (
          <button className="btn" onClick={() => handleDelete(row.original._id)}>
            <HiReceiptRefund></HiReceiptRefund>
          </button>
        ),
      }
      
      
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
    const handleDelete = async (id) => {
        try {
       
      
          const confirmationResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund it!"
          });
      
          if (confirmationResult.isConfirmed) {
            const res = await axiosSecure.delete(`/donations/${id}`);
            refetch();
            if(res?.data){
                Swal.fire({
                    title: "Deleted!",
                    text: "Donation has been refunded.",
                    icon: "success"
                  });
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
      <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">My Donations</h1>
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

export default MyDonations;