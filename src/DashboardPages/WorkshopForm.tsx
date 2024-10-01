import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Workshop, Speciality } from '../types/Types';

interface WorkshopFormProps {
  workshop: Workshop | null;
  specialities: Speciality[];
  onSave: (workshop: Omit<Workshop, 'id'>) => void;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({ workshop, specialities, onSave }) => {
  const { control, handleSubmit, reset } = useForm<Omit<Workshop, 'id'>>({
    defaultValues: workshop || { title: '', description: '', especiality: '', url_Image: '' },
  });

  const onSubmit = (data: Omit<Workshop, 'id'>) => {
    onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Ingrese el título"
              required
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Ingrese la descripción"
              required
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Especialidad</label>
        <Controller
          name="especiality"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              required
            >
              <option value="">Seleccione una especialidad</option>
              {specialities.map((speciality) => (
                <option key={speciality.id} value={speciality.title}>
                  {speciality.title}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
        <Controller
          name="url_Image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Ingrese la URL de la imagen"
              required
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Guardar
      </button>
    </form>
  );
};

export default WorkshopForm;
