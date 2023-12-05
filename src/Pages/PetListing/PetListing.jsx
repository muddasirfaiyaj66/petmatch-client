import { useState } from 'react';
import bg from '../../../src/assets/breadcrumb_bg.jpg';
import { useInfiniteQuery} from '@tanstack/react-query';

import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../Components/Loading/Loading';
import PetListCard from './PetListCard';



const getArticles = async ({ pageParam = 0, categoryValue='',searchValue=''}) => {
  try {
    console.log('Request parameters:', { pageParam, categoryValue, searchValue });

    const res = await fetch(`https://pet-match-server-two.vercel.app/api/v1/pets?category=${categoryValue}&name=${searchValue}&adopted=false&sortOrder=dsc&sortField=date&page=${pageParam}&limit=9`);
    const data = await res.json();

    console.log('Response from server:', data);

    const articles = data || []; 

    return { data: articles, pageParams: [pageParam] };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], pageParams: [pageParam] };
  }
};

const PetListing = () => {
  
  const [searchValue, setSearchValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["articles", { categoryValue, searchValue }],
    queryFn: getArticles,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageParams[0] + 1;
      return nextPage; 
    },
  });
  console.log('DATA', data);
  
  const articles = data?.pages.reduce((acc, page) => {
    if (page.data && Array.isArray(page.data)) {
      // Check if page.data is an array and not empty
      return [...acc, ...page.data];
    } else if (page.data && typeof page.data === 'object') {
      // Handle the case where page.data is an object
      // You may need to transform the object into an array based on your requirements
      // For example, you can convert object values into an array using Object.values()
      return [...acc, ...Object.values(page.data)];
    } else {
      // Handle other cases or log an error
      console.error(`Invalid data type in page: ${typeof page.data}`);
      return acc;
    }
  }, []);
  
  
  console.log('Article', articles);
 
  
  const handleSearchChange = (event) => {
    setSearchValue((prevSearchValue) => event?.target?.value || prevSearchValue);
    refetch()
  };
  const handleCategoryChange = (event) => {
    console.log(event);
    setCategoryValue((prevCategoryValue) => event.target.value || prevCategoryValue);
    refetch()
   };
  
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const newSearchValue = event.target.elements.name.value;
    const newCategoryValue = event.target.elements.category.value || '';
   
    setSearchValue((prevSearchValue) => newSearchValue || prevSearchValue);
    setCategoryValue((prevCategoryValue) => newCategoryValue || prevCategoryValue);
    refetch()
    fetchNextPage({ pageParam: 0, categoryValue: newCategoryValue, searchValue: newSearchValue });
   };
   
  
 return (
    <div>

<div>
         <img src={bg} className='w-full h-full object-cover' alt="" />
       </div>
       <div className="my-20 max-w-screen-xl mx-auto p-5">
         <form onSubmit={handleSubmit}
           className="flex flex-col justify-center md:flex-row gap-3"
          
         >
           <div className="flex">
             <input
               type="text"
               name='name'
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
     <div>
     <InfiniteScroll
        dataLength={ articles ? articles.length : 0 }
        next={ () => fetchNextPage() }
        hasMore={ hasNextPage }
        loading= {<div>
          <Loading></Loading>
        </div>}

      >
       
      
     
                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl mx-auto p-5 '>
                 { articles&& 
                     articles?.map((item,idx)=><PetListCard key={idx} item={item}></PetListCard>
                     )
                 }
               </div>
                 
                 
                
                
      
     </InfiniteScroll>
     </div>
    </div>
 );
};

export default PetListing;