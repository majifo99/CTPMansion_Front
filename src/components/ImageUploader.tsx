import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ImageUploaderProps = {
  onImageUpload: (url: string) => void;
  initialImage?: string; // Nueva prop para imágenes existentes
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, initialImage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Utilizar la imagen inicial como vista previa si está disponible
  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('El archivo seleccionado no es una imagen.');
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file)); // Mostrar vista previa

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=bf79f82c0d0d19e2d9c15e6247dca5f7`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const imageUrl = response.data.data.url;
      onImageUpload(imageUrl);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error al subir la imagen. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-uploader flex flex-col items-center">
      <label className="block mb-2 font-semibold text-lg">Subir Imagen</label>

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="w-24 h-24 object-cover rounded-lg mb-3"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border border-gray-300 p-2 rounded-md"
        disabled={loading}
      />

      {loading && <p className="text-blue-500 mt-2">Subiendo imagen...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;