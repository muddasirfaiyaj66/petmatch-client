import { useEffect, useState } from 'react';
import bg from '../../../src/assets/breadcrumb_bg.jpg';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PetListCard from './PetListCard';
import loadingImage from '../../assets/preloader.gif'
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const PetListing = () => {
  
 const [searchValue, setSearchValue] = useState('');
 const [categoryValue, setCategoryValue] = useState('');
const [page ,setPage]=useState(1);
const [pets, setPets]=useState([]);
const [loading,setLoading]=useState(true);
const [totalPages,setTotalPages]=useState(null);
const axiosPublic = useAxiosPublic()





 

 const axiosSecure = useAxiosSecure();

const uri = `/pets?category=${categoryValue}&name=${searchValue}&sortOrder=dsc&sortField=date&adopted=false&limit=9&page=${page}`;
  
 const {data, refetch, isLoading,} = useQuery({
    queryKey:['pets',{categoryValue,searchValue}],
    queryFn: async () => {
        console.log(searchValue,categoryValue);
      const res = await axiosSecure.get(uri)
      console.log(uri);
      setLoading(false)
    const data = res.data;
    setPets((prev)=>[...prev, ...data])
      return data;
    }
    
 });


    
 const handleSearchChange = (event) => {
    setSearchValue(event.target.value, () => {
      console.log(searchValue); // Log the updated value in the callback
      setLoading(true);
      
    });
 };
  
 const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value, () => {
      console.log(categoryValue); // Log the updated value in the callback
      setLoading(true)
     
      refetch();
      setLoading(false)
    });
 };
  
  
 const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
   
    refetch();
    setLoading(false)
    // Perform the search or other actions based on the state values
    console.log('Search:', searchValue);
    console.log('Category:', categoryValue);
 };
 useEffect(()=>{
   axiosPublic.get('/pets')
   .then(res=>{
    console.log(res.data.length);
    const totalPageNum = Math.ceil((res.data.length)/9)
    setTotalPages(totalPageNum)
    console.log(totalPages); 
   })

},[isLoading])
  
//   console.log(data);
 const handleInfiniteScroll = async () => {
    try {
//     //   console.log("scrollHeight" + document.documentElement.scrollHeight);
//     //   console.log("innerHeight" + window.innerHeight);
//     //   console.log("scrollTop" + document.documentElement.scrollTop);
  
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (page <=( totalPages || 5) ) { // Check if the current page number has exceeded the total number of pages
            setLoading(true);
            setPage((prev) => prev + 1);
            await refetch(); // Wait for refetch to complete
            setLoading(false);
          }
           if(page > totalPages){
            setPage(1)
            refetch()

          }
      }
    } catch (error) {
      console.log(error);
    }
 };
  
 useEffect(()=>{
   
    window.addEventListener('scroll', handleInfiniteScroll);
    return ()=> window.removeEventListener('scroll',handleInfiniteScroll) 
    
 },[])
  
 return (
    <div>
       
      <div>
        <img src={bg} className='w-full h-full object-cover' alt="" />
      </div>
      <div className="my-20 max-w-screen-xl mx-auto p-5">
        <form
          className="flex flex-col justify-center md:flex-row gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="bg-black text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              Search
            </button>
          </div>
          <select
            id="category"
            name="category"
            className="h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            value={categoryValue}
            onChange={handleCategoryChange}
          >
            <option value=''>All Category</option>
            <option value="Cats">Cats</option>
            <option value="Dogs">Dogs</option>
            <option value="Birds">Birds</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </form>
      </div>
     { loading && isLoading? <div className='text-center flex justify-center items-center'>
                    <img src={loadingImage}/>
                </div>
                :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl mx-auto p-5 '>
                {
                    data?.map((item,idx)=><PetListCard key={idx} item={item}></PetListCard>
                    )
                }
              </div>
                
                
                }
                {isLoading && <div className='text-center flex justify-center items-center'>
                    <img src={loadingImage}/>
                </div> }
     
    </div>
 );
};

export default PetListing;