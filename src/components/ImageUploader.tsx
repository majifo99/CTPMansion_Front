import React, { useState } from 'react';
import axios from 'axios';

type ImageUploaderProps = {
  onImageUpload: (url: string) => void; // Callback to send the uploaded image URL to the parent
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=bf79f82c0d0d19e2d9c15e6247dca5f7`,
        formData
      );

      const imageUrl = response.data.data.url; // Extract the direct URL from the response
      onImageUpload(imageUrl); // Pass the URL back to the parent
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-uploader">
      <label className="block mb-2 font-semibold">Subir Imagen</label>
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
