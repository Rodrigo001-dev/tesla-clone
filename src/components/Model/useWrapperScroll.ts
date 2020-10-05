import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
  const { wrapperRef } = useContext(ModelsContext);

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const element = wrapperRef.current;

    // Se a referência do Wrapper existir
    if (element) {
      // vai fazer uma função de update do Scroll
      const  updateScrollValue = () => {
        const { scrollTop, scrollHeight, offsetHeight } = element;

        // para descobrir o scroll total é o tamanho da 
        // página inteira(scrollHeight) - o tamanho de cada uma das sections
        // (offsetHeight)
        const fullScroll = scrollHeight - offsetHeight;

        scrollY.set(scrollTop); // px (number)
        scrollYProgress.set(scrollTop / fullScroll); // de 0 a 1 (%)
        
      };

      element.addEventListener('scroll', updateScrollValue);

      // desfazer a sujeira
      return () => 
        element.removeEventListener('scroll', updateScrollValue);
    }
  }, [scrollY, scrollYProgress, wrapperRef]);

  return { scrollY, scrollYProgress };
}