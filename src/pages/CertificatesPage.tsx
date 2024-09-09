import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CertificatesPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form Data Submitted:', data);
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col min-h-screen">
                <section className="flex-grow flex items-center justify-center px-6 py-40 bg-gray-50 dark:bg-gray-900">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Solicitud de Certificado
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {/* Student Name */}
                                <div>
                                    <label htmlFor="studentName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nombre del Estudiante
                                    </label>
                                    <input
                                        type="text"
                                        id="studentName"
                                        {...register('studentName', { required: 'Student name is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.studentName && <p className="text-red-600 text-sm">{errors.studentName.message}</p>}
                                </div>
                                
                                {/* Student Identification */}
                                <div>
                                    <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Cédula del Estudiante
                                    </label>
                                    <input
                                        type="text"
                                        id="studentId"
                                        {...register('studentId', { required: 'Student identification is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.studentId && <p className="text-red-600 text-sm">{errors.studentId.message}</p>}
                                </div>

                                {/* Guardian Name */}
                                <div>
                                    <label htmlFor="guardianName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nombre del Encargado
                                    </label>
                                    <input
                                        type="text"
                                        id="guardianName"
                                        {...register('guardianName', { required: 'Guardian name is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.guardianName && <p className="text-red-600 text-sm">{errors.guardianName.message}</p>}
                                </div>

                                {/* Guardian Identification */}
                                <div>
                                    <label htmlFor="guardianId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Cédula del Encargado
                                    </label>
                                    <input
                                        type="text"
                                        id="guardianId"
                                        {...register('guardianId', { required: 'Guardian identification is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.guardianId && <p className="text-red-600 text-sm">{errors.guardianId.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', { required: 'Email is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Número de Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        {...register('phoneNumber', { required: 'Phone number is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber.message}</p>}
                                </div>

                                {/* Certification Type (Dropdown) */}
                                <div>
                                    <label htmlFor="certificationType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Tipo de Certificación
                                    </label>
                                    <select
                                        id="certificationType"
                                        {...register('certificationType', { required: 'Certification type is required' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Selecciona el Certificado</option>
                                        <option value="transcript">Transcript</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="attendance">Attendance Certificate</option>
                                    </select>
                                    {errors.certificationType && <p className="text-red-600 text-sm">{errors.certificationType.message}</p>}
                                </div>

                                {/* Delivery Method (Radio Button) */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Metodo de Envío</label>
                                    <div className="flex items-center mb-4">
                                        <input
                                            id="deliveryEmail"
                                            type="radio"
                                            value="email"
                                            {...register('deliveryMethod', { required: 'Delivery method is required' })}
                                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="deliveryEmail" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo Electrónico</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="deliveryPost"
                                            type="radio"
                                            value="post"
                                            {...register('deliveryMethod', { required: 'Delivery method is required' })}
                                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="deliveryPost" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Retiro en la Institución</label>
                                    </div>
                                    {errors.deliveryMethod && <p className="text-red-600 text-sm">{errors.deliveryMethod.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Enviar Solicitud
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
};

export default CertificatesPage;
