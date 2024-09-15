import Navbar from './Navbar'; 
import Footer from './Footer';
import { useSpecialities } from '../hooks/useSpecialities'; 


const CardSection = () => {
  const { specialities, loading, error } = useSpecialities();
  console.log(specialities)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
 

  return (
    <>
      <Navbar />
      
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Nuestras Especialidades</h2>
          <div className="flex flex-wrap -m-4">
            {specialities.map(speciality => (
              <div key={speciality.id} className="p-4 md:w-1/2 sm:w-full w-full"> {/* Aumenta el ancho del Card */}
                <div className="flex flex-col sm:flex-row sm:max-w-4xl max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg bg-softGreen p-4 mb-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="p-2 sm:w-1/2 flex items-center justify-center">
                    <img
                      className="object-cover w-full h-60 rounded"
                      src={speciality.url_Image}
                      alt={speciality.title}
                    
                    />
                  </div>
                  <div className="sm:p-4 p-4 sm:w-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className="block sm:mt-2 text-2xl font-semibold text-gray-50 dark:text-white hover:text-gray-600">
                        {speciality.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-200 dark:text-darkBlue">
                        {speciality.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CardSection;
