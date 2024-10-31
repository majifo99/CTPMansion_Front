// src/types/AuthServiceTypes.ts

// Define la estructura esperada del usuario decodificado desde el JWT
export interface DecodedUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
  }
  
  // Define el tipo de retorno para la función `login`
  // Puede devolver un `DecodedUser` en caso de éxito o `null` en caso de fallo
  export type LoginResponse = DecodedUser | null;
  