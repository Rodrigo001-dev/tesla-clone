import React from 'react';

export interface CarModel { // Modelo do carro
  modelName: string;
  overlayNode: React.ReactNode;
  sectionRef: React.RefObject<HTMLElement>;
}

interface  ModelsContext {
  wrapperRef: React.RefObject<HTMLElement>;
  registeredModels: CarModel[];
  registerModel: (model: CarModel) => void; // não vai retornar nada só adicionar dentro do array
  unregisterModel: (modelName: string) => void; // pegar o modelo de carros e deletar ele 
  getModelByName: (modelName: string) => CarModel | null;
}

export default React.createContext<ModelsContext>({} as ModelsContext)