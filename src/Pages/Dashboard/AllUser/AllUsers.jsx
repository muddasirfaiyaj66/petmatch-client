import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] , refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = user =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, set admin!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res=>{
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Admin!",
                        text: `${user?.name} is an admin now!!`,
                        icon: "success"
                      });
                }
            })
          
        }
      });

  }
  const handleDelete = id =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/users/${id}`)
            .then(res=>{
        if(res?.data?.deletedCount > 0){
                refetch();
            Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success"
          });

          
          

                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }
            })
      
        }
      });
  }
  return (
    <div>
      <div className="flex justify-evenly my-5 p-8">
        <h1 className="text-3xl font-bold ">All User</h1>
        <h1 className="text-3xl font-bold ">Total User: {users.length}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => 
              <tr key={user._id}>
                <th>{index+1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{ user?.role === 'admin' ? <p className="font-bold ">Admin</p>:<button onClick={()=> handleMakeAdmin(user)} className="btn btn-ghost  bg-[#D1A054]">
                    <FaUsers className="text-white text-2xl"></FaUsers>
                  </button>}</td>
                <td> <button onClick={()=> handleDelete(user?._id)} className="btn btn-ghost btn-lg">
                    <FaTrash className="text-[red]"></FaTrash>
                  </button></td>
              </tr>
           )}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;