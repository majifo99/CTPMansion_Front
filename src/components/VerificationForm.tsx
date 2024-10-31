import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';


const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const { isDarkMode, toggleDarkMode } = useTheme(); // Access theme state and toggle

  // Retrieve userId from sessionStorage
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  const handleVerification = async () => {
    if (!userId) {
      setError('Falta el ID del usuario.');
      return;
    }

    try {
      const response = await axios.post(`https://ctplamansion.onrender.com/api/User/verify-email?userId=${userId}&verificationCode=${verificationCode}`);

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        sessionStorage.removeItem('userId'); // Clear userId from sessionStorage after successful verification
      } else {
        setError('La verificación falló. Por favor, inténtalo de nuevo.');
        setSuccess(false);
      }
    } catch (error) {
      setError('Error al verificar el código. Por favor, inténtalo de nuevo.');
      setSuccess(false);
    }
  };

  const handleResendCode = async () => {
    if (!userId) {
      setError('Falta el ID del usuario.');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7055/api/User/resend-verification-code?userId=${userId}`);

      if (response.status === 200) {
        setResendMessage('El código de verificación ha sido reenviado a tu correo electrónico.');
        setError(null);
      } else {
        setResendMessage(null);
        setError('No se pudo reenviar el código. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setResendMessage(null);
      setError('Error al reenviar el código. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-gray-100 text-gray-800'} flex justify-center items-center h-screen`}>
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src="https://i.ibb.co/dKVCLB2/ctp-m.jpg"
          alt="Background"
          className={`object-cover w-full h-full ${isDarkMode ? 'opacity-60' : ''}`}
        />
      </div>

      <div className={`lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 h-full ${isDarkMode ? 'bg-[#13152A]' : 'bg-white'} shadow-lg rounded-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Verificación de Correo Electrónico</h1>
          <div className="flex items-center">
            <span className="text-sm mr-2">{isDarkMode ? 'Modo Noche' : 'Modo Día'}</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        {success ? (
          <>
            <p className="text-green-600">¡Verificación exitosa! Ahora puedes acceder a tu cuenta.</p>
            <button
              onClick={handleLoginRedirect}
              className={`mt-4 px-4 py-2 rounded-lg w-full ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Iniciar sesión
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">Por favor, introduce el código de verificación que fue enviado a tu correo electrónico.</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.trim())}
              placeholder="Ingresa el código de verificación"
              className={`w-full mb-4 p-2 border rounded ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'}`}
            />
            <button
              onClick={handleVerification}
              className={`px-4 py-2 rounded-lg w-full ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Verificar
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-4">
              <p>¿No recibiste el código?</p>
              <button
                onClick={handleResendCode}
                className={`mt-2 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Reenviar código
              </button>
              {resendMessage && <p className="text-green-600 mt-2">{resendMessage}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationForm;
