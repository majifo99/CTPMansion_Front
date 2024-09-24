import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCertificateRequest } from '../hooks/useCertificateRequest'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar el CSS para las notificaciones

const CertificatesPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { deliveryMethods, certificationNames, isSubmitting, error: submitError, success, submitRequest } = useCertificateRequest(); 
    const [captchaToken, setCaptchaToken] = useState(null); 

    // Manejo del cambio en CAPTCHA
    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    // Mostrar notificaciones de éxito o error
    const notifySuccess = () => toast.success('Solicitud realizada correctamente!');
    const notifyError = () => toast.error('Error al realizar la solicitud.');

    // Envío del formulario
    const onSubmit = (data) => {
        if (!captchaToken) {
            alert('Por favor completa el CAPTCHA');
            return;
        }

        // Datos que se enviarán al backend
        const requestData = {
            studentName: data.studentName,
            studentLastName1: data.studentLastName1,
            studentLastName2: data.studentLastName2,
            studentIdentification: data.studentId,
            guardianName: data.guardianName,
            guardianLastName1: data.guardianLastName1,
            guardianLastName2: data.guardianLastName2,
            guardianIdentification: data.EncargadoId,
            email: data.email,
            phoneNumber: data.phoneNumber,
            deliveryMethod: data.deliveryMethod,
            certificationName: data.certificationType,
        };

        // Llamada para enviar la solicitud
        submitRequest(requestData)
            .then(() => {
                reset();
                notifySuccess();  // Mostrar notificación de éxito
            })
            .catch(() => {
                notifyError();  // Mostrar notificación de error
            });
    };

    // Función para renderizar los campos del formulario
    const renderInputField = (id, label, placeholder, validation, type = 'text') => (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(id, validation)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
            />
            {errors[id] && <p className="text-red-600 text-sm">{errors[id].message}</p>}
        </div>
    );

    return (
        <>
            <Navbar />
            <main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-100">
                <section className="flex-grow flex items-center justify-center px-6 py-40">
                    <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                            Solicitud de Certificado
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Campos del Estudiante */}
                            <div className="grid grid-cols-2 gap-6">
                                {renderInputField('studentId', 'Cédula del Estudiante', '102340567', { required: 'La cédula del estudiante es requerida' })}
                                {renderInputField('studentName', 'Nombre del Estudiante', 'Juan', { required: 'El nombre del estudiante es requerido' })}
                                {renderInputField('studentLastName1', 'Primer Apellido del Estudiante', 'Pérez', { required: 'El primer apellido es requerido' })}
                                {renderInputField('studentLastName2', 'Segundo Apellido del Estudiante', 'Rodríguez', { required: 'El segundo apellido es requerido' })}
                            </div>

                            {/* Campos del Encargado */}
                            <div className="grid grid-cols-2 gap-6">
                                {renderInputField('EncargadoId', 'Cédula del Encargado', '102340567', { required: 'La cédula del encargado es requerida' })}
                                {renderInputField('guardianName', 'Nombre del Encargado', 'Luis', { required: 'El nombre del encargado es requerido' })}
                                {renderInputField('guardianLastName1', 'Primer Apellido del Encargado', 'Pérez', { required: 'El primer apellido es requerido' })}
                                {renderInputField('guardianLastName2', 'Segundo Apellido del Encargado', 'Rodríguez', { required: 'El segundo apellido es requerido' })}
                            </div>

                            {/* Email y Teléfono */}
                            {renderInputField('email', 'Email', 'name@gmail.com', { required: 'El e-mail es requerido' }, 'email')}
                            {renderInputField('phoneNumber', 'Teléfono', '123456789', { required: 'El teléfono es requerido' }, 'tel')}

                            {/* Método de Entrega */}
                            <div>
                                <label htmlFor="deliveryMethod" className="block mb-2 text-sm font-medium text-gray-900">
                                    Método de Entrega
                                </label>
                                {deliveryMethods.length === 0 ? (
                                    <p>Cargando métodos de entrega...</p>
                                ) : (
                                    <select
                                        id="deliveryMethod"
                                        {...register('deliveryMethod', { required: 'Método de entrega es requerido' })}
                                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                                    >
                                        <option value="">Selecciona el Método de Entrega</option>
                                        {deliveryMethods.map((method, index) => (
                                            <option key={index} value={method}>
                                                {method}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.deliveryMethod && <p className="text-red-600 text-sm">{errors.deliveryMethod.message}</p>}
                            </div>

                            {/* Tipo de Certificación */}
                            <div>
                                <label htmlFor="certificationType" className="block mb-2 text-sm font-medium text-gray-900">
                                    Tipo de Certificación
                                </label>
                                {certificationNames.length === 0 ? (
                                    <p>Cargando tipos de certificación...</p>
                                ) : (
                                    <select
                                        id="certificationType"
                                        {...register('certificationType', { required: 'El tipo de certificación es requerido' })}
                                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                                    >
                                        <option value="">Selecciona el Certificado</option>
                                        {certificationNames.map((cert) => (
                                            <option key={cert.id} value={cert.name}>
                                                {cert.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.certificationType && <p className="text-red-600 text-sm">{errors.certificationType.message}</p>}
                            </div>

                            {/* CAPTCHA */}
                            <div className="mt-6">
                                <ReCAPTCHA sitekey="6Le8YzwqAAAAACwDjRqrSHOh6vNwre9LH78Lj_Lw" onChange={onCaptchaChange} />
                            </div>

                     
                            {/* Botón de Envío */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer /> {/* Contenedor de las notificaciones */}
            <Footer />
        </>
    );
};

export default CertificatesPage;
