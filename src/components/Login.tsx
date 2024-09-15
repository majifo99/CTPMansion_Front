import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data); // Handle form submission (e.g., send data to server)
    };

    return (
        <section
            className="bg-cover bg-center h-screen relative"
            style={{ backgroundImage: "url('https://i.ibb.co/dKVCLB2/ctp-m.jpg')" }}
        >
            {/* Filtro oscuro sobre la imagen */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
           
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 mx-auto h-full lg:py-0">
                {/* Contenedor del formulario con estilo de vidrio esmerilado */}
                <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg dark:border dark:bg-opacity-20 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center sm:text-3xl">
                            Inicia sesión en tu cuenta
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Tu correo electrónico
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
                                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-200"
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
                                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-200"
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-300 text-center">
                                ¿No tienes una cuenta? <a href="/register" className="font-medium text-blue-500 hover:underline">Regístrate aquí</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
