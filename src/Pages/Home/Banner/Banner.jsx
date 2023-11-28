import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel className="text-center">
            <div>
                <img src="https://i.ibb.co/qpWYGFP/adorable-kitten-sitting-green-grass-park.jpg" />

            </div>
            <div>
                <img src="https://i.ibb.co/BfMnqXG/medium-shot-woman-working-with-dog.jpg" />

            </div>
            <div>
                <img src="https://i.ibb.co/nBZ4m4H/full-shot-woman-cute-dog.jpg" />

            </div>
            <div>
                <img src="https://i.ibb.co/k295npZ/young-lady-with-her-pet-outdoors.jpg" />

            </div>
            <div>
                <img src="https://i.ibb.co/4YT05G5/cat-christmas-lights-cute-ginger-cat-lying-near-window-play-with-lights.jpg" />

            </div>
            <div>
                <img src="https://i.ibb.co/jJMw2bW/girl-with-dog.jpg" />


            </div>
        </Carousel>
    );
};

export default Banner;