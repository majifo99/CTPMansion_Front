import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Laboratory } from '../types/LaboratoryType';


interface LaboratoryFormProps {
  laboratory: Laboratory | null;
  onSave: (laboratory: Laboratory) => void;
}

const LaboratoryForm: React.FC<LaboratoryFormProps> = ({ laboratory, onSave }) => {
  const { control, handleSubmit, reset } = useForm<Laboratory>({
    defaultValues: laboratory || { id_Laboratory: 0, name: '', description: '', capacity: 0, url_Image: '' },
  });

  const onSubmit = (data: Laboratory) => {
    onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-6 rounded-md shadow-md text-gray-800">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Nombre</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese el nombre"
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
        <label className="mb-2 font-semibold">Capacidad</label>
        <Controller
          name="capacity"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese la capacidad"
              required
            />
          )}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Imagen URL</label>
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Guardar
      </button>
    </form>
  );
};

export default LaboratoryForm;