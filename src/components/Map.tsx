import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PiMapPinSimpleDuotone } from "react-icons/pi";

const LocationSection = () => {
  const position = [10.098611822058782, -85.3739927038014];

  return (
    <section className="bg-gray-100 mt-[60px] z-10"> {/* Ajuste del margen superior y z-index */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Visítanos</h2>
          <p className="mt-4 text-lg text-gray-500">Estamos ubicados en un lugar accesible y estratégico.</p>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden" style={{ zIndex: 20 }}> {/* Ajuste del z-index para el contenedor del mapa */}
              <div className="h-[480px] w-full"> {/* Contenedor del mapa */}
                <MapContainer 
                  center={position} 
                  zoom={19} 
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      100 metros sur de la Plaza de Fútbol, La Mansión, Nicoya, Provincia de Guanacaste.
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div>
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Nuestra Dirección</h3>
                  <p className="mt-1 text-gray-600">
                    <PiMapPinSimpleDuotone className="inline mr-1" />
                    100 metros sur de la Plaza de Fútbol, La Mansión, Nicoya, Provincia de Guanacaste.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Horario</h3>
                  <p className="mt-1 text-gray-600">Lunes - Viernes: 7:00am - 4:20pm</p>
                  <p className="mt-1 text-gray-600">Sábado - Domingo: Cerrado</p>
                  
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Contacto</h3>
                  <p className="mt-1 text-gray-600">Correo: ctp.demansion@mep.go.cr</p>
                  <p className="mt-1 text-gray-600">Teléfono: +506 2659-1472</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;