import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the form data type
interface VerificationFormData {
  email: string;
  verificationCode: string;
}

const VerificationForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<VerificationFormData>();
  const navigate = useNavigate();

  const handleVerification = async (data: VerificationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://localhost:7055/api/User/verify-email', data);

      if (response.status === 200) {
        console.log('Verification successful', response.data);
        navigate('/'); // Redirect to the home page or any other page
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage('La información de verificación no es válida. Por favor, revisa los datos ingresados.');
      } else {
        setErrorMessage('Ocurrió un error durante la verificación.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsSubmitting(true);
    try {
      const email = getValues('email'); // Usar React Hook Form para obtener el valor
      if (!email) throw new Error('Correo electrónico no proporcionado');

      const response = await axios.post('https://localhost:7055/api/User/resend-verification-code', { email });

      if (response.status === 200) {
        setSuccessMessage('Código de verificación reenviado exitosamente. Revisa tu correo electrónico.');
        setErrorMessage('');
      }
    } catch (error: any) {
      setErrorMessage('Error al reenviar el código. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Verificar Correo Electrónico
        </h1>
        <form onSubmit={handleSubmit(handleVerification)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="nombre@empresa.com"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Código de Verificación
            </label>
            <input
              type="text"
              {...register('verificationCode', {
                required: 'El código de verificación es requerido',
              })}
              id="verificationCode"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ingrese el código de verificación"
            />
            {errors.verificationCode && <span className="text-red-600 text-sm">{errors.verificationCode.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
          >
            Verificar
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={isSubmitting}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 focus:outline-none mt-4"
          >
            Reenviar Código de Verificación
          </button>

          {errorMessage && (
            <div className="mt-4 text-red-600 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 text-green-600 text-center">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
