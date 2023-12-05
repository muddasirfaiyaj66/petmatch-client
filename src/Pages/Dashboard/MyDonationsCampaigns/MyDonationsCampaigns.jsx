
import { MdDelete, MdPause } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { GrResume } from "react-icons/gr";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const MyDonationsCampaigns = () => {
    const { user } = useAuth();
  const [currentPage , setCurrentPage]= useState(null);
  const email = user?.email || '';
const [count,setCount]= useState(0)
  const axiosSecure = useAxiosSecure();
  const { data:campaignData, isLoading ,refetch} = useQuery({
    queryKey: ['myDonationsCampign', { email,currentPage }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationCampaigns?email=${email}&page=${currentPage}&limit=10`);
      return res.data;
    }
  });

  const {image,name,maxDonationAmount,totalDonation,remaining, isPaused,_id}=campaignData || {};
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
  const CustomTotalCell = ({ value, row }) => {
    const { maxDonationAmount } = row.original;
  
    // Calculate the progress ratio
    const progressRatio = (value / maxDonationAmount) * 100;
  
    return (
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs  inline-block py-1 px-2 uppercase font-bold rounded-full text-teal-600 bg-teal-200">
              {value} / {maxDonationAmount}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-red-600">
              {progressRatio.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-teal-300 rounded">
          <div
            style={{ width: `${progressRatio}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          ></div>
        </div>
      </div>
    );
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
          <img src={value} alt="Donation Image" className="w-12 h-12 rounded-full" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Max Donation Amount",
        accessor: "maxDonationAmount",
      },
      {
        Header: "Total Donation",
        accessor: "totalDonation",
        Cell: CustomTotalCell,
      },
    
 
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (

        <Link to={`/dashboard/my-donation-edit/${row.original._id}`}>
          <button>
          <FiEdit  className="text-2xl font-bold text-[#FFFF99] hover:text-black "/> 
        </button>
        </Link>
      ),
    },
 
    {
        Header: "Paused",
        accessor: "isPaused", 
        Cell: ({ row }) => (
          <button className="btn" onClick={() => handlePaused(row.original._id)}>
            {row.original.isPaused === 'false' ? (
              <MdPause className="text-xl text-red-500" />
            ) : (
              <GrResume className="text-xl text-red-500" />
            )}
          </button>
        ),
      }
      
      
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
    const handlePaused= async (id) => {
      try {
        const { data: pausedData } = await axiosSecure.get(`/donationCampaigns/${id}`);
        const { isPaused } = pausedData;
    
        const confirmationResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, ${isPaused==='false'? 'paused':'resume'} it!`
        });
    
        if (confirmationResult.isConfirmed) {
          if(isPaused === 'false'){
            const updatedDonationCampaign = { isPaused:'true'}
            const isPausedRes = await axiosSecure.put(`/donationCampaigns/${id}`,updatedDonationCampaign);
            refetch();
          }else{
            const updatedDonationCampaign = { isPaused:'false'}
            const isPausedRes = await axiosSecure.put(`/donationCampaigns/${id}`,updatedDonationCampaign);
            refetch();
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
      <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">My Donation Campaigns</h1>
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

export default MyDonationsCampaigns;