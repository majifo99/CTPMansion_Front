import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

Modal.setAppElement('#root');

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useTheme(); // Access theme state and toggle

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !token || !newPassword || !confirmPassword) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
            return;
        }

        try {
            const response = await axios.post('https://ctplamansion.onrender.com/api/User/reset-password', {
                email,
                token,
                newPassword
            }, {
                headers: { 'Content-Type': 'application/json-patch+json' }
            });

            if (response.status === 200) {
                setSuccessMessage('Su contraseña ha sido restablecida exitosamente.');
                setErrorMessage(null);
                setIsModalOpen(true);
            } else {
                setSuccessMessage(null);
                setErrorMessage('No se pudo restablecer la contraseña.');
            }
        } catch (error) {
            setSuccessMessage(null);
            setErrorMessage('Ocurrió un error. Por favor, inténtelo de nuevo.');
        }
    };

    const handleRedirectToLogin = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    return (
        <div className={`${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-gray-100 text-gray-800'} flex justify-center items-center h-screen`}>
            <div className="hidden lg:block w-1/2 h-screen">
                <img
                    src="https://i.ibb.co/dKVCLB2/ctp-m.jpg"
                    alt="Imagen de fondo"
                    className={`object-cover w-full h-full ${isDarkMode ? 'opacity-60' : ''}`}
                />
            </div>

            <div className={`lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 h-full ${isDarkMode ? 'bg-[#13152A]' : 'bg-white'} shadow-lg rounded-lg`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Restablecer Contraseña</h1>
                    <div className="flex items-center">
                        <span className="text-sm mr-2">{isDarkMode ? 'Modo Noche' : 'Modo Día'}</span>
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                            placeholder="Correo electrónico"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="token" className="block mb-2">Código de Verificación</label>
                        <input
                            type="text"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                            placeholder="Código de verificación"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block mb-2">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                            placeholder="Nueva contraseña"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                            placeholder="Confirmar contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        Restablecer Contraseña
                    </button>
                </form>

                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleRedirectToLogin}
                contentLabel="Contraseña restablecida"
                className="absolute inset-0 flex items-center justify-center z-[9999]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            >
                <div className={`p-6 rounded-lg shadow-lg z-[9999] ${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-white text-gray-800'}`}>
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-blue-600'}`}>¡Contraseña restablecida!</h2>
                    <p className="mt-4">Su contraseña ha sido restablecida correctamente.</p>
                    <button
                        onClick={handleRedirectToLogin}
                        className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ResetPasswordForm;
