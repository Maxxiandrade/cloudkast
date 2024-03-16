
/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
      VITE_API_KEY: string;
      // Agrega otras variables de entorno según sea necesario
    }
  }
  interface ImportMetaEnv {
    VITE_API_KEY: string;
    // Add other environment variables as needed
  }