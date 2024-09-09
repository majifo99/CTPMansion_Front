
import { BiBookReader,BiBusSchool  } from "react-icons/bi";
import { TbBallFootball, TbBowlSpoon,TbUserHeart,TbUserQuestion,TbPigMoney,TbHome     } from "react-icons/tb";

const OurServices = () => {
  const stats = [
    {
      id: 1,
      icon: <BiBookReader className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
      title: 'Biblioteca',
     
    },
    {
      id: 2,
      icon: <BiBusSchool  className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
      title: 'Transporte',

    },
    {
      id: 3,
      icon: <TbBallFootball className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
      title: 'Deportes y Recreación',
  
    },
    {
      id: 4,
      icon: <TbBowlSpoon  className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
      title: 'Comedor',

    },
    {
        id: 5,
        icon: <TbUserHeart  className="text-[#4EA5D9] w-12 h-12 mb-3 inline-block" />,
        title: 'Educación Especial',
  
      },
      {
        id: 6,
        icon: <TbUserQuestion className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
        title: 'Orientación Vocacional',
  
      },
      {
        id: 7,
        icon: <TbPigMoney  className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
        title: 'Cooperativa Estudiantil',
  
      },
      {
        id: 8,
        icon: <TbHome  className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
        title: 'Club 4s',
  
      }
   
  
  ];

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Nuestros Servicios</h2>
        <div className="flex flex-wrap -m-4 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                {stat.icon}
                <h2 className="title-font font-medium text-2xl text-gray-900">{stat.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
