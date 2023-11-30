import { useParams } from 'react-router-dom';
import banner from '../../../src/assets/8036876_3824243.jpg'
import loadingImg from '../../../src/assets/preloader.gif'
import PetListCard from '../PetListing/PetListCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const CategoryDetails = () => {
    const {category} = useParams()
    const axiosSecure = useAxiosSecure();
    const {data, refetch,isLoading}=useQuery({
        queryKey:['getCategory',{category}] ,
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/pets?category=${category}`)
            return res.data;

        }
    })
    return (
        <div>
            <div>
                <img src={banner} className='w-full h-full object-cover' alt="" />
            </div>
            <div className='my-20'>
            <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">Pets Category: {category}</h1>
            </div>
           {
            isLoading? 
            <div className='flex justify-center items-center'>
                <img src={loadingImg} alt="" />
            </div>
            :
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl mx-auto p-5 '>
            {
                data?.map((item)=><PetListCard key={item._id} item={item}></PetListCard>
                )
            }
          </div>
           }
        </div>
    );
};

export default CategoryDetails;