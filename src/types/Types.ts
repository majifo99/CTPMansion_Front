export interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    urlImage: string;
  }

  export interface AboutUsContent {
    id: number;
    title: string;
    description: string;
    urlImage: string;
  }

  export interface Location {
    Id_Location: number;
    Address: string;
    Schedule: string;
    Contact_Info: string;
  }

  export interface OurService {
    id: number;
    title: string;
    icon: string; // Representaremos el icono como un string y luego lo mapearemos a un componente React.
  }


  export interface Mission {
    id: number;
    title: string;
    description: string;
  }
  
  export interface Vision {
    id: number;
    title: string;
    description: string;
  }
  
  export interface Value {
    id: number;
    title: string;
    description: string;
    icon: string; 
  }


  export interface Workshop {
    id: number;
    title: string;
    description: string;
    url_image: string;
    especialidad: string;
  }

  export interface Speciality {
    id: number;
    title: string;
    description: string;
    url_Image: string;
  }