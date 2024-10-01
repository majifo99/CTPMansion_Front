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
    icon: string; 
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


  export interface Room {
    id_Room: number;      // Este es el identificador de la sala
    name: string;
    description: string;
    capacity: number;
    url_Image?: string;   // URL opcional para la imagen de la sala
    isConferenceRoom: boolean;
  }


  export interface CertificationRequest {
    id: number;
    status: number;
    requestDate: string;
    studentName: string;
    studentLastName1: string;
    studentLastName2: string;
    studentIdentification: string;
    guardianName: string;
    guardianLastName1: string;
    guardianLastName2: string;
    guardianIdentification: string;
    email: string;
    phoneNumber: string;
    deliveryMethod: number | string;
    certificationName: string;
  }
  

