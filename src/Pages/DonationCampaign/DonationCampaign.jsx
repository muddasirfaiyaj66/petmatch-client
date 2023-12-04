
import { useInfiniteQuery} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../Components/Loading/Loading';
import banner from '../../assets/support-donations-welfare-charity-icon.jpg'
import DonationCampaignCard from './DonationCampaignCard';


const getArticles = async ({ pageParam = 0}) => {
  try {
   

    const res = await fetch(`https://pet-match-server-two.vercel.app/api/v1/donationCampaigns?sortOrder=dsc&sortField=lastDate&page=${pageParam}&limit=9`);
    const data = await res.json();

    console.log('Response from server:', data);

    const articles = data || []; 

    return { data: articles, pageParams: [pageParam] };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], pageParams: [pageParam] };
  }
};

const DonationCampaign = () => {


    const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ["donations"],
        queryFn: getArticles,
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.pageParams[0] + 1;
          return nextPage; 
        },
      });
 
      
    
    
      const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
      }, []);
      
    return (
        <div >
            <div className='mb-10'>
                <img src={banner} className='w-full object-cover' alt="" />
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
                     articles?.map((item,idx)=><DonationCampaignCard key={idx} item={item}></DonationCampaignCard>
                     )
                 }
               </div>
                 
                 
                
                
      
     </InfiniteScroll>
     </div>
        </div>
    );
};

export default DonationCampaign;