import React, { useEffect, useRef } from 'react';

import useModel from '../useModel';

import { Container } from './styles';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  modelName: string;
  overlayNode: React.ReactNode; // Elemento React que vai ser renderizado na tela
}

const ModelSection: React.FC<Props> = ({ 
  modelName, 
  overlayNode, 
  children, 
  ...props 
}) => {
  const { registerModel } = useModel(modelName);

  const sectionRef = useRef<HTMLDivElement>(null); // sempre iniciar a ref como nulo

  useEffect(() => {
    // Se o sectionRef existir
    if (sectionRef.current) {
      // eu crio um modelo
      registerModel({
        modelName,
        overlayNode,
        sectionRef
      })
    }
  }, [modelName, overlayNode, registerModel]);

  return (
    <Container ref={sectionRef} {...props}>
      {children}
    </Container>
  );
};

export default ModelSection;
