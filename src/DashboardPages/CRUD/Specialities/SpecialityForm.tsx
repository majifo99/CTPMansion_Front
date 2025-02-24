import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Speciality } from '../../../types/Types';
import ImageUploader from '../../../components/ImageUploader'; // Asegúrate de importar correctamente el componente

interface SpecialityFormProps {
  speciality: Speciality | null;
  onSave: (speciality: Speciality) => void;
  onCancel: () => void; // Añade onCancel como prop para cerrar el modal
}

const SpecialityForm: React.FC<SpecialityFormProps> = ({ speciality, onSave, onCancel }) => {
  const { control, handleSubmit, reset, setValue } = useForm<Speciality>({
    defaultValues: speciality || { id: 0, title: '', description: '', url_Image: '' },
  });

  // Maneja la carga de la imagen y actualiza el valor en el formulario
  const handleImageUpload = (url: string) => {
    setValue('url_Image', url); // Actualiza el valor de la URL de la imagen en el formulario
  };

  // Enviar el formulario y guardar la especialidad
  const onSubmit = (data: Speciality) => {
    onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Título</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese el título"
              required
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Descripción</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese la descripción"
              required
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <ImageUploader onImageUpload={handleImageUpload} />
        <Controller
          name="url_Image"
          control={control}
          render={({ field }) => (
            <input {...field} type="hidden" /> // Campo oculto para almacenar la URL de la imagen
          )}
        />
      </div>

      {/* Botones de Guardar y Cancelar alineados horizontalmente */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel(); // Llama a onCancel para cerrar el modal
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default SpecialityForm;
