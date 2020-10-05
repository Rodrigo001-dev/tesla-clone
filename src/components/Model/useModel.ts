import { useCallback, useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useModel(modelName: string) {
  const { registerModel, unregisterModel, getModelByName } = useContext(
    ModelsContext
  );

  useEffect(() => () => unregisterModel(modelName), [
    modelName, 
    unregisterModel
  ]);

  // Retornar o model que o usuário/desenvolvedor já especificou o nome quando
  // ele chamou o Hook
  const getModel = useCallback(() => getModelByName(modelName), [
    getModelByName,
    modelName
  ]);

  return { registerModel, getModel };
}