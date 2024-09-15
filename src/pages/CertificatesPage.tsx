import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';

const CertificatesPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form Data Submitted:', data);
    };

    // Reutilizamos esta función para los campos que comparten características comunes
    const renderInputField = (id, label, placeholder, validation, type = "text") => (
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

    // Campos con configuraciones similares
    const fields = [
        { id: 'studentId', label: 'Cédula del Estudiante', placeholder: '102340567', validation: { required: 'La cédula del estudiante es requerida' } },
        { id: 'studentName', label: 'Nombre del Estudiante', placeholder: 'Juan', validation: { required: 'El nombre del estudiante es requerido' } },
        { id: 'firstSurnameEst', label: 'Primer Apellido', placeholder: 'Pérez', validation: { required: 'El primer apellido es requerido' } },
        { id: 'secondSurnameEst', label: 'Segundo Apellido', placeholder: 'Rodríguez', validation: { required: 'El segundo apellido es requerido' } },
        { id: 'EncargadoId', label: 'Cédula del Encargado', placeholder: '102340567', validation: { required: 'La cédula del encargado es requerida' } },
        { id: 'guardianName', label: 'Nombre del Encargado', placeholder: 'Luis', validation: { required: 'El nombre del encargado es requerido' } },
        { id: 'firstSurname', label: 'Primer Apellido del Encargado', placeholder: 'Pérez', validation: { required: 'El primer apellido es requerido' } },
        { id: 'secondSurnameEnc', label: 'Segundo Apellido del Encargado', placeholder: 'Rodríguez', validation: { required: 'El segundo apellido es requerido' } },
    ];

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
                                {fields.slice(0, 4).map(field => renderInputField(field.id, field.label, field.placeholder, field.validation))}
                            </div>

                            {/* Campos del Encargado */}
                            <div className="grid grid-cols-2 gap-6">
                                {fields.slice(4).map(field => renderInputField(field.id, field.label, field.placeholder, field.validation))}
                            </div>

                            {/* Email */}
                            {renderInputField(
                                'email',
                                'Email',
                                'name@gmail.com',
                                { required: 'El e-mail es requerido' },
                                'email'
                            )}

                            {/* Tipo de Certificación */}
                            <div>
                                <label htmlFor="certificationType" className="block mb-2 text-sm font-medium text-gray-900">
                                    Tipo de Certificación
                                </label>
                                <select
                                    id="certificationType"
                                    {...register('certificationType', { required: 'El tipo de certificación es requerido' })}
                                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                                >
                                    <option value="">Selecciona el Certificado</option>
                                    <option value="transcript">Transcript</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="attendance">Certificado de Asistencia</option>
                                </select>
                                {errors.certificationType && <p className="text-red-600 text-sm">{errors.certificationType.message}</p>}
                            </div>

                            {/* Método de Entrega */}
                            <div>
                                <label htmlFor="deliveryMethod" className="block mb-2 text-sm font-medium text-gray-900">
                                    Método de Entrega
                                </label>
                                <select
                                    id="deliveryMethod"
                                    {...register('deliveryMethod', { required: 'Método de entrega es requerido' })}
                                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                                >
                                    <option value="">Selecciona el Método de Entrega</option>
                                    <option value="physical">Físico</option>
                                    <option value="digital">Digital</option>
                                </select>
                                {errors.deliveryMethod && <p className="text-red-600 text-sm">{errors.deliveryMethod.message}</p>}
                            </div>

                            {/* CAPTCHA */}
                            <div className="mt-6">
                                <ReCAPTCHA sitekey="6Le8YzwqAAAAACwDjRqrSHOh6vNwre9LH78Lj_Lw" />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                                >
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CertificatesPage;
