import { useForm } from 'react-hook-form';
import { useCertificateRequest } from '../hooks/useCertificateRequest';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

type FormData = {
    studentName: string;
    studentLastName1: string;
    studentLastName2: string;
    studentId: string;
    guardianName: string;
    guardianLastName1: string;
    guardianLastName2: string;
    EncargadoId: string;
    email: string;
    phoneNumber: string;
    deliveryMethod: number;
    certificationType: string;
};

type CertificationName = {
    id: number;
    name: string;
};

const CertificatesPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { deliveryMethods, certificationNames, isSubmitting, submitRequest } = useCertificateRequest();
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<number | null>(null);
    const [selectedCertificationType, setSelectedCertificationType] = useState<string>('');

    const notifySuccess = () => toast.success('Solicitud realizada correctamente!');
    const notifyError = () => toast.error('Error al realizar la solicitud.');

    const onSubmit = (data: FormData) => {
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

        submitRequest(requestData)
            .then(() => {
                reset();
                setSelectedDeliveryMethod(null);
                setSelectedCertificationType('');
                notifySuccess();
            })
            .catch(() => {
                notifyError();
            });
    };

    const renderInputField = (
        id: keyof FormData,
        label: string,
        placeholder: string,
        validation: object,
        type: string = 'text'
    ) => (
        <div>
            <label htmlFor={id} className="block mb-1 text-sm font-semibold text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(id, validation)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900 text-sm transition-all duration-200"
            />
            {errors[id]?.message && <p className="mt-1 text-xs text-red-500">{errors[id]?.message as string}</p>}
        </div>
    );

    const isDigitalDelivery = selectedDeliveryMethod === 1;
    const isTitleCertification = selectedCertificationType.toLowerCase().includes('título');
    const showWarning = isDigitalDelivery && isTitleCertification;

    return (
        <>
            <Navbar />
            <main className="flex flex-col min-h-screen mt-12 bg-gradient-to-b from-gray-50 to-gray-100">
                <section className="flex-grow flex items-center justify-center px-4 py-20">
                    <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            Solicitud de Certificado
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                    Información del Estudiante
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {renderInputField('studentId', 'Cédula del Estudiante', '102340567', { required: 'La cédula del estudiante es requerida' })}
                                    {renderInputField('studentName', 'Nombre del Estudiante', 'Juan', { required: 'El nombre del estudiante es requerido' })}
                                    {renderInputField('studentLastName1', 'Primer Apellido del Estudiante', 'Pérez', { required: 'El primer apellido es requerido' })}
                                    {renderInputField('studentLastName2', 'Segundo Apellido del Estudiante', 'Rodríguez', { required: 'El segundo apellido es requerido' })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Información del Encargado
                                    </h4>
                                    <p className="text-m text-gray-500 italic">*Opcional para estudiantes egresados</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {renderInputField('EncargadoId', 'Cédula del Encargado', '102340567', {})}
                                    {renderInputField('guardianName', 'Nombre del Encargado', 'Luis', {})}
                                    {renderInputField('guardianLastName1', 'Primer Apellido del Encargado', 'Pérez', {})}
                                    {renderInputField('guardianLastName2', 'Segundo Apellido del Encargado', 'Rodríguez', {})}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                    Información de Contacto
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {renderInputField('email', 'Email', 'name@gmail.com', { required: 'El e-mail es requerido' }, 'email')}
                                    {renderInputField('phoneNumber', 'Teléfono', '123456789', { required: 'El teléfono es requerido' }, 'tel')}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                    Detalles de la Solicitud
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="certificationType" className="block mb-1 text-sm font-semibold text-gray-700">
                                            Tipo de Certificación
                                        </label>
                                        {certificationNames.length === 0 ? (
                                            <p className="text-sm text-gray-500">Cargando tipos de certificación...</p>
                                        ) : (
                                            <select
                                                id="certificationType"
                                                {...register('certificationType', { required: 'El tipo de certificación es requerido' })}
                                                onChange={(e) => setSelectedCertificationType(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900 text-sm transition-all duration-200"
                                            >
                                                <option value="">Selecciona el Certificado</option>
                                                {certificationNames.map((cert: CertificationName) => (
                                                    <option key={cert.id} value={cert.name}>
                                                        {cert.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        {errors.certificationType && <p className="mt-1 text-xs text-red-500">{errors.certificationType.message as string}</p>}
                                        {showWarning && (
                                            <p className="mt-1 text-s text-yellow-600 bg-yellow-100 p-2 rounded">
                                                Advertencia: Los títulos solo pueden ser solicitados de manera física.
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="deliveryMethod" className="block mb-1 text-sm font-semibold text-gray-700">
                                            Método de Entrega
                                        </label>
                                        {deliveryMethods.length === 0 ? (
                                            <p className="text-sm text-gray-500">Cargando métodos de entrega...</p>
                                        ) : (
                                            <select
                                                id="deliveryMethod"
                                                {...register('deliveryMethod', { required: 'Método de entrega es requerido' })}
                                                onChange={(e) => setSelectedDeliveryMethod(Number(e.target.value))}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900 text-sm transition-all duration-200"
                                            >
                                                <option value="">Selecciona el Método de Entrega</option>
                                                {deliveryMethods.map((method, index) => (
                                                    <option key={index} value={method.id}>
                                                        {method.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        {errors.deliveryMethod && <p className="mt-1 text-xs text-red-500">{errors.deliveryMethod.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 py-3 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-semibold rounded-lg text-sm shadow-md transition-all duration-200 disabled:bg-green-400 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer />
            <Footer />
        </>
    );
};

export default CertificatesPage;