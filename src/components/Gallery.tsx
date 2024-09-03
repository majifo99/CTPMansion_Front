import { Carousel } from "flowbite-react";
import heroImage1 from '../assets/images/Gallery1.jpg';
import heroImage2 from '../assets/images/Gallery2.jpg';
import heroImage3 from '../assets/images/Gallery3.jpg';
import heroImage4 from '../assets/images/Gallery4.jpg';
import heroImage5 from '../assets/images/Gallery5.jpg';

export function Gallery() {
  return (
    <div className="my-10 mx-auto max-w-4xl">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        ¡Explora Nuestra Galería del Colegio!
      </h2>
      <div className="h-64 sm:h-80 xl:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <Carousel>
          <img src={heroImage1} alt="Galería del Colegio 1" className="object-cover w-full h-full" />
          <img src={heroImage2} alt="Galería del Colegio 2" className="object-cover w-full h-full" />
          <img src={heroImage3} alt="Galería del Colegio 3" className="object-cover w-full h-full" />
          <img src={heroImage4} alt="Galería del Colegio 4" className="object-cover w-full h-full" />
          <img src={heroImage5} alt="Galería del Colegio 5" className="object-cover w-full h-full" />
        </Carousel>
      </div>
    </div>
  );
}
