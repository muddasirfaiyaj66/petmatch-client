import { Link } from "react-router-dom";


const About = () => {
  return (
    <div>
     
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to petMatch: Where Hearts and Paws Unite
          </h2>
          <p className="text-gray-600">
            At petMatch, we are dedicated to creating a world where every pet finds a loving home. Our mission is to connect compassionate individuals with pets in need, offering a platform for adoption, support, and community.
          </p>
          <p className="text-gray-600 mt-4">
            Explore our platform to discover a diverse range of pets seeking their forever families. Whether you're looking to adopt a new companion or contribute to the well-being of pets in need, petMatch is your go-to destination.
          </p>
        </div>
      </section>

      {/* Donate Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            Support petMatch: A Lifeline for Pets in Need
          </h2>
          <p className="text-blue-600">
            Your generosity can make a world of difference in the lives of pets awaiting their forever homes. At petMatch, we believe that every pet deserves a chance at a happy and healthy life, and your donation can be the catalyst for positive change.
          </p>
          <p className="text-blue-600 mt-4">
            When you contribute to petMatch, you're not just donating; you're becoming a vital part of our mission to rescue, rehabilitate, and rehome pets in need. Your support enables us to provide essential veterinary care, nourishing meals, and a safe environment for our furry friends.
          </p>
          <p className="text-blue-600 mt-4">
            Whether it's a one-time donation or a recurring contribution, every gift, big or small, contributes to creating brighter futures for pets. Our transparent donation process ensures that your funds directly impact the well-being of our animals.
          </p>
          <p className="text-blue-600 mt-4">
            As a token of our gratitude, we keep you connected with the impact of your donation. Receive updates on the pets you've helped, success stories of adoptions, and the overall positive change your support brings to the petMatch community.
          </p>
          <p className="text-blue-600 mt-4">
            Join us in making a lasting impact. Your donation is not just a gift; it's a lifeline for pets, bringing hope, joy, and the promise of a brighter tomorrow. Together, let's continue to build a world where every pet finds the love and care they deserve.
          </p>
          <Link to='/donation-campaigns'>


          <button className="bg-blue-500 text-white px-6 py-3 mt-8 rounded-full hover:bg-blue-700">
            Donate Now
          </button>
          </Link>
          
        </div>
      </section>
    </div>
  );
};

export default About;
