const Card = ({ image, title, description }) => (
  <div className="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden  rounded-lg shadow-lg bg-softGreen p-2 mb-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    <div className="p-2 sm:w-1/2 flex items-center justify-center">
      <img
        className="object-cover w-full sm:h-80 h-60 rounded"
        src={image} // Aquí se usa la ruta de la imagen pasada como prop
        alt={title}
      />
    </div>
    <div className="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
      <div>
        <h3 className="block sm:mt-2 text-2xl font-semibold text-gray-50 dark:text-white hover:text-gray-600">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-200 dark:text-darkBlue">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default Card;
