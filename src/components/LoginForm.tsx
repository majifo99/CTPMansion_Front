import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// Establece el elemento raíz para el modal si aún no lo has hecho en tu proyecto
Modal.setAppElement('#root');

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7055/api/User/login', null, {
                params: {
                    email: email,
                    password: password,
                },
            });

            if (response.status === 200) {
                console.log('Login successful', response.data);
                // Redirigir al usuario a la página de inicio
                navigate('/');
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrorMessage('La información de usuario no corresponde a ningún usuario en nuestro sistema');
                setIsModalOpen(true);
            } else {
                setErrorMessage('An error occurred during login');
                setIsModalOpen(true);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
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
                    <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg dark:border dark:bg-opacity-20 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-8 space-y-6">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center sm:text-3xl">
                                Iniciar Sesión
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="nombre@empresa.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-white placeholder-opacity-75"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Iniciar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Error"
                className="absolute inset-0 flex items-center justify-center z-[9999]" // Asegúrate de que el z-index es alto
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]" // Asegúrate de que el z-index del overlay es menor que el del modal
            >
                <div className="bg-white p-4 rounded-lg shadow-lg z-[9999]"> {/* Asegúrate de que el z-index del contenido es alto */}
                    <h2 className="text-xl font-semibold">Error</h2>
                    <p className="mt-2">{errorMessage}</p>
                    <button
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default LoginForm;
