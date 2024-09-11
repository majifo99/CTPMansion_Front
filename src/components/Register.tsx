import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <section
            className="bg-cover bg-center h-screen relative"
            style={{ backgroundImage: "url('https://i.ibb.co/dKVCLB2/ctp-m.jpg')" }}
        >
            {/* Filtro oscuro sobre la imagen */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
           
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 mx-auto h-full lg:py-0">
                {/* Contenedor del formulario ajustado */}
                <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg dark:border dark:bg-opacity-20 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-8 space-y-6">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center sm:text-3xl">
                            Regístrate
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Inputs en columnas, adaptadas para pantallas pequeñas */}
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
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
                                </div>

                                <div>
                                    <label htmlFor="firstLastName" className="block mb-2 text-sm font-medium text-white">
                                        Primer Apellido
                                    </label>
                                    <input
                                        type="text"
                                        {...register("firstLastName", { required: "El primer apellido es requerido" })}
                                        id="firstLastName"
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="Pérez"
                                    />
                                    {errors.firstLastName && <span className="text-red-500 text-sm">{errors.firstLastName.message as string}</span>}
                                </div>

                                <div>
                                    <label htmlFor="secondLastName" className="block mb-2 text-sm font-medium text-white">
                                        Segundo Apellido
                                    </label>
                                    <input
                                        type="text"
                                        {...register("secondLastName", { required: "El segundo apellido es requerido" })}
                                        id="secondLastName"
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="Gómez"
                                    />
                                    {errors.secondLastName && <span className="text-red-500 text-sm">{errors.secondLastName.message as string}</span>}
                                </div>

                                <div>
                                    <label htmlFor="id" className="block mb-2 text-sm font-medium text-white">
                                        Cédula
                                    </label>
                                    <input
                                        type="text"
                                        {...register("id", { required: "La cédula es requerida" })}
                                        id="id"
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="123456789"
                                    />
                                    {errors.id && <span className="text-red-500 text-sm">{errors.id.message as string}</span>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
                                        Número de Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        {...register("phone", { required: "El número de teléfono es requerido" })}
                                        id="phone"
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="8888-8888"
                                    />
                                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message as string}</span>}
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
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
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
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
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

export default Register;
