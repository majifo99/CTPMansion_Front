import { useState, useRef, useEffect, useCallback } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import heroImage1 from '../assets/images/Gallery1.jpg';
import heroImage2 from '../assets/images/Gallery2.jpg';
import heroImage3 from '../assets/images/Gallery3.jpg';
import heroImage4 from '../assets/images/Gallery4.jpg';
import heroImage5 from '../assets/images/Gallery5.jpg';

const images = [
  { src: heroImage1, alt: "Galería del Colegio 1" },
  { src: heroImage2, alt: "Galería del Colegio 2" },
  { src: heroImage3, alt: "Galería del Colegio 3" },
  { src: heroImage4, alt: "Galería del Colegio 4" },
  { src: heroImage5, alt: "Galería del Colegio 5" },
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Update the width of the container dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Debounced scrolling for performance
  const handleScroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = containerWidth * 0.8;
        const newPosition =
          direction === 'left'
            ? Math.max(0, scrollPosition - scrollAmount)
            : Math.min(scrollRef.current.scrollWidth - containerWidth, scrollPosition + scrollAmount);

        scrollRef.current.scrollTo({
          left: newPosition,
          behavior: 'smooth',
        });
        setScrollPosition(newPosition);
      }
    },
    [scrollPosition, containerWidth]
  );

  // Open modal with selected image
  const openModal = useCallback((imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  }, []);

  // Close modal handler
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  // Keydown handler for accessibility in the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="my-10 mx-auto max-w-4xl">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        ¡Explora Nuestra Galería del Colegio!
      </h2>
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div ref={scrollRef} className="flex overflow-x-hidden space-x-4 p-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer hover:opacity-75 transition-opacity duration-300"
              onClick={() => openModal(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-96 xl:h-96 rounded-lg"
                loading="lazy" // Add lazy loading for performance
              />
            </div>
          ))}
        </div>
        <button
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 ${scrollPosition === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
          disabled={scrollPosition === 0}
        >
          <SlArrowLeft className="text-5xl" />
        </button>
        <button
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 ${scrollRef.current && scrollPosition >= scrollRef.current.scrollWidth - containerWidth ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
          disabled={!!(scrollRef.current && scrollPosition >= scrollRef.current.scrollWidth - containerWidth)}
        >
          <SlArrowRight className="text-5xl" />
        </button>
      </div>

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
