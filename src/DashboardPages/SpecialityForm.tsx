import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Speciality } from '../types/Types';

interface SpecialityFormProps {
  speciality: Speciality | null;
  onSave: (speciality: Speciality) => void;
}

const SpecialityForm: React.FC<SpecialityFormProps> = ({ speciality, onSave }) => {
  const { control, handleSubmit, reset } = useForm<Speciality>({
    defaultValues: speciality || { id: 0, title: '', description: '', url_Image: '' },
  });

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
        <label className="mb-2 font-semibold">URL de Imagen</label>
        <Controller
          name="url_Image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese la URL de la imagen"
              required
            />
          )}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Guardar
      </button>
    </form>
  );
};

export default SpecialityForm;
