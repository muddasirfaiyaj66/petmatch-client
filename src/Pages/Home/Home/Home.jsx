import { useState } from "react";
import Banner from "../Banner/Banner";
import PetsCategoryCard from "../PetsCategoryCard/PetsCategoryCard";


const Home = () => {
    const [data,setData]= useState(null)
    fetch('category.json')
    .then(res=> res.json())
    .then(data=> {
        setData(data)

    })
    return (
        <div>

  <Banner></Banner>

  <div className="max-w-screen-xl mx-auto my-10">
    <h1 className="uppercase text-center text-5xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">Pets Category</h1>
    <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        {
            data?.map((item,idx)=> <PetsCategoryCard key={idx} item={item}></PetsCategoryCard>)
        }
    </div>

  </div>
        </div>
    );
};

export default Home;