import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pet-match-server-two.vercel.app/api/v1',
   
  });
const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;