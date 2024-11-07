import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Event } from '../../../types/Types';

interface EventFormProps {
  event: Event | null;
  onSave: (event: Event) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const { control, handleSubmit, reset } = useForm<Omit<Event, 'date'> & { date: string }>({
    defaultValues: event
      ? {
          ...event,
          date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "", // Convert Date to string for input
        }
      : {
          id: 0,
          title: '',
          description: '',
          date: '', // Deja el campo en blanco
          url_Image: '',
        },
  });

  const onSubmit = (data: Omit<Event, 'date'> & { date: string }) => {
    const formattedData: Event = {
      ...data,
      date: data.date ? new Date(data.date) : new Date(), // Convert string back to Date for Event type
    };
    onSave(formattedData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-800">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Título</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md"
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
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Ingrese la descripción"
              required
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Fecha</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="datetime-local"
              className="border border-gray-300 p-2 rounded-md"
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
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Ingrese la URL de la imagen"
              required
            />
          )}
        />
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel();
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default EventForm;
