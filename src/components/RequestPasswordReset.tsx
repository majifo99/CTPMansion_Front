import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';


Modal.setAppElement('#root');

const RequestPasswordReset: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useTheme(); // Access theme state and toggle

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const response = await axios.post(
                'https://localhost:7055/api/User/send-password-reset-token',
                `"${email}"`,
                { headers: { 'Content-Type': 'application/json-patch+json' } }
            );

            if (response.status === 200) {
                setMessage('Se ha enviado un código de seguridad a su correo electrónico.');
                setError(null);
                setIsModalOpen(true);
            } else {
                setMessage(null);
                setError('No se pudo enviar el código. Verifique su correo e inténtelo de nuevo.');
            }
        } catch (error) {
            setMessage(null);
            setError('Ocurrió un error al enviar el código. Por favor, inténtelo de nuevo.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRedirect = () => {
        setIsModalOpen(false);
        navigate('/reset-password');
    };
    const handleGoBack = () => {
      navigate('/login');
  };

    return (
        <div className={`${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-gray-100 text-gray-800'} flex justify-center items-center h-full`}>
            <div className="hidden lg:block w-1/2 h-screen">
                <img
                    src="https://i.ibb.co/dKVCLB2/ctp-m.jpg"
                    alt="Imagen de fondo"
                    className={`object-cover w-full h-full ${isDarkMode ? 'opacity-60' : ''}`}
                />
            </div>

            <div className={`lg:p-36 md:p-52 sm:p-20 p-8 w-full  lg:w-1/2 h-full${isDarkMode ? 'bg-[#13152A]' : 'bg-white'} `}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Restablecer Contraseña</h1>
                    <div className="flex items-center">
                        <span className="text-sm mr-2">{isDarkMode ? 'Modo Noche' : 'Modo Día'}</span>
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                            <div className="w-11 h-6 bg-white rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 ${isProcessing ? 'bg-gray-400' : (isDarkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white')}`}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Procesando...' : 'Enviar'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <button onClick={handleGoBack} className="text-sm text-blue-500 hover:underline">
                        Volver al inicio de sesión
                    </button>
                </div>
                {message && <p className="text-green-600 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Código enviado"
                className="absolute inset-0 flex items-center justify-center z-[9999]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            >
                <div className={`p-6 rounded-lg shadow-lg z-[9999] ${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-white text-gray-800'}`}>
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-blue-600'}`}>Código enviado</h2>
                    <p className="mt-4">
                        Se ha enviado un código de seguridad a su correo electrónico. Por favor, revise su bandeja de entrada y, si es necesario, la bandeja de spam.
                    </p>
                    <button
                        onClick={handleRedirect}
                        className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        Restablecer mi contraseña
                    </button>
                </div>
                
            </Modal>
           
        </div>
        
    );
};

export default RequestPasswordReset;