import { useEffect, useState } from 'react';

const getViewport = () => ({
  width: typeof window === 'undefined' ? 1440 : window.innerWidth,
});

export const useResponsive = () => {
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewport());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const width = viewport.width;

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1100,
    isDesktop: width >= 1100,
  };
};
