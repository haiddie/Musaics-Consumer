import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      callback();
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null, // Use the viewport as the container
      threshold: 0.1, // Trigger callback when 10% of the target is visible
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const observe = (element: HTMLElement) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };

  return { observe };
};

export default useIntersectionObserver;
