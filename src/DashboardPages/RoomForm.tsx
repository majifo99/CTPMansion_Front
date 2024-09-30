import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Room } from '../types/Types';

interface RoomFormProps {
  room: Room | null;
  onSave: (room: Room) => Promise<void>; // Asume que onSave es una promesa
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSave }) => {
  const { control, handleSubmit, reset } = useForm<Room>({
    defaultValues: room || { id_Room: 0, name: '', capacity: 0, description: '', url_Image: '', isConferenceRoom: false },
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío

  const onSubmit = async (data: Room) => {
    setIsSubmitting(true); // Cambia el estado a "Procesando..."
    try {
      await onSave(data); // Asume que onSave es una promesa
      reset(); // Limpia el formulario
    } catch (error) {
      console.error("Error al guardar la sala:", error);
    } finally {
      setIsSubmitting(false); // Vuelve el estado a "Guardar"
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre de la Sala */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Nombre de la sala</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese el nombre de la sala"
              required
            />
          )}
        />
      </div>

      {/* Capacidad */}
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

      {/* Descripción */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Descripción</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese una descripción"
              required
            />
          )}
        />
      </div>

      {/* URL de la Imagen */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">URL de la Imagen</label>
        <Controller
          name="url_Image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="url"
              className="border border-gray-300 p-2 rounded-md text-gray-800"
              placeholder="Ingrese la URL de la imagen"
              required
            />
          )}
        />
      </div>

      {/* ¿Es Sala de Conferencias? */}
      <div className="flex items-center space-x-4">
        <label htmlFor="isConferenceRoom" className="font-semibold">¿Es Sala de Conferencias?</label>
        <Controller
          name="isConferenceRoom"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="checkbox"
              checked={field.value}
              className="h-5 w-5"
            />
          )}
        />
      </div>

      {/* Botón de Guardar */}
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Procesando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default RoomForm;
