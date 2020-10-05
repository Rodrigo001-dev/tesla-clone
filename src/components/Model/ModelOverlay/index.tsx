import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useTransform } from 'framer-motion';

import { CarModel } from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll';

import { Container } from './styles';

interface Props {
  model: CarModel;
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>

const ModelOverlay: React.FC<Props> = ({ model, children }) => {

  // Dimensões para calcular os valores
  const getSectionDimensions = useCallback(() => {
    return {
      // retornando o offsetTop e o offsetHeight de dentro do sectionRef
      // de dentro do model na página
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    } as SectionDimensions
  }, [model.sectionRef]);

  const [dimensions, setDimensions]  = useState<SectionDimensions>(
    // por padrão de início irá fazer um cálculo com base nas dimensões 
    getSectionDimensions()
  );

  // o useLayoutEffect é disparado com base no Layout, 
  // ele é disparado de forma assíncrona após uma mutação na DOM(arvore de elementos), 
  // ele é um Hook que trabalha muito melhor com responsividade do que o useEffect
  useLayoutEffect(() => {
    function onResize() {
      // pedir para o navegador criar um quadro de animação e
      // quando o usuário mudar o tamanho da tela, eu quero que você
      // atualize as minhas dimensões(setDimensions) do meu Overlay
      // passando a função que obtém o tamanho das dimensões
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()));
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [getSectionDimensions]); 

  const { scrollY } = useWrapperScroll();

  // calcular o progresso do scroll dentro da div
  const sectionScrollProgress = useTransform(
    scrollY, 
    y => (y - dimensions.offsetTop) / dimensions.offsetHeight
  );

  // momento de entrada
  const opacity = useTransform(
    sectionScrollProgress, 
    // quando o scroll estiver em
    // -0.42(um pouco antes de chegar no próximo elemento) ele já começa a aparecer
    // vai até o -0.05
    [-0.42, -0.05, 0.05, 0.42], // negativo(-0.42, -0.05) para aprarecer
    // positivo(0.05, 0.42) para sumir e aparecer o proximo
    [0, 1, 1, 0] // a opacidade vai de 0 a 1 para aparecer e de 1 a 0 para sumir
  );

  // quando a opacidade for maior que 0 então os pointerEvents vão funcionar
  // normalmente, caso contrario eles vão ser desabilitados e não vai
  // posibilitar que o usuário clicino item
  const pointerEvents = useTransform(opacity, value => 
    value > 0 ? 'auto' : 'none'
  )

  return (
    <Container style={{ opacity, pointerEvents }}>
      {children}
    </Container>
  );
};

export default ModelOverlay;
