import React, { useRef, useState, useCallback } from 'react';

import ModelsContext, { CarModel } from '../ModelsContext';
import ModelOverlay from '../ModelOverlay';

import { Container, OverlaysRoot } from './styles';

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  // Só registra o modelo dentro do array não retorna nada(void)
  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels(state => [...state, model]);
  }, []);

  // remover do estado
  const unregisterModel = useCallback((modelName: string) => {
    // Pegar o estado, vou fazer um filtro nele dizendo que, eu não quero
    // nenhum modelo que tenha o nome igual do modelo que eu passei como parâmetro
    // da função. Se o modelo tiver o nome diferente do modelo que eu quero
    // destruir descadastrar aí vai deixar esse modelo
    // persistir dentro do array.
    setRegisteredModels(state => state.filter(model => model.modelName !== modelName))
  }, []);

  // Pegar o modelo pelo o nome e retornar o modelo ou nulo
  const getModelByName = useCallback((modelName: string) => {
    // Vai pegar o modelo de dentro do registeredModels que tenha o nome
    // igual o nome que o usuário ou desenvolvedor passou.(passou no parâmetro da função)
    return registeredModels.find(item => item.modelName === modelName) || null;
  }, [registeredModels]);
  // Esse componente nada mais é do que um Container que pega os dados de
  // dentro dele e mantém, ele é um Wrapper, ele vai envolver os dados
  return (
    <ModelsContext.Provider value={{
      wrapperRef,
      registeredModels,
      registerModel,
      unregisterModel,
      getModelByName,
    }}>
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
