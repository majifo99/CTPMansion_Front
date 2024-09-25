export interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    url_Image: string;
  }

  export interface AboutUsContent {
    id: number;
    title: string;
    description: string;
    urlImage: string;
  }
  export interface Location {
    id: number;
    id_Location: number;
    addres: string;
    schedule: string;
    email: string;
    phoneNumber: string;
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
    url_Image:string;
  }
  
  export interface Vision {
    id: number;
    title: string;
    description: string;
    url_Image:string;
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
    especiality: string;
    url_Image: string;
  
  }

  export interface Speciality {
    id: number;
    title: string;
    description: string;
    url_Image: string;
  }