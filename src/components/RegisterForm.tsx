import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  name: string;
  LastName: string;
  LastName2: string;
  PhoneNumber: string;  // Cambiado de "phone" a "PhoneNumber"
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();  // Hook para redirección

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('https://localhost:7055/api/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registro exitoso', result);

        // Redirigir a la página de verificación del correo electrónico
        navigate('/verify-email', { state: { email: data.email } });
      } else {
        const errorData = await response.json();
        console.error('Error en el registro', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  return (
    <section
      className="bg-cover bg-center min-h-screen relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/dKVCLB2/ctp-m.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg dark:border dark:bg-opacity-20 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center sm:text-3xl">
              Regístrate
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                    Nombre
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "El nombre es requerido" })}
                    id="name"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                    placeholder="Juan"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                  <label htmlFor="LastName" className="block mb-2 text-sm font-medium text-white">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    {...register("LastName", { required: "El primer apellido es requerido" })}
                    id="LastName"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                    placeholder="Pérez"
                  />
                  {errors.LastName && <span className="text-red-500 text-sm">{errors.LastName.message}</span>}
                </div>

                <div>
                  <label htmlFor="LastName2" className="block mb-2 text-sm font-medium text-white">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    {...register("LastName2", { required: "El segundo apellido es requerido" })}
                    id="LastName2"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                    placeholder="Gómez"
                  />
                  {errors.LastName2 && <span className="text-red-500 text-sm">{errors.LastName2.message}</span>}
                </div>

                <div>
                  <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-white">
                    Número de Teléfono
                  </label>
                  <input
                    type="text"
                    {...register("PhoneNumber", { required: "El número de teléfono es requerido" })}
                    id="PhoneNumber"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                    placeholder="8888-8888"
                  />
                  {errors.PhoneNumber && <span className="text-red-500 text-sm">{errors.PhoneNumber.message}</span>}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "El correo electrónico es requerido",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Correo electrónico inválido",
                      },
                    })}
                    id="email"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                    placeholder="nombre@empresa.com"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
