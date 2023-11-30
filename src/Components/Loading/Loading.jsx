
import loadingImg from '../../assets/preloader.gif'
const Loading = () => {
    return (
        <div className='flex justify-center items-center p-5'>
            <img src={loadingImg} alt="" />
        </div>
    );
};

export default Loading;