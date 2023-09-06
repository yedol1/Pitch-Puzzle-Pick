// useHandleIntersection.ts
import { useEffect, RefObject } from 'react';

type HandleIntersection = () => void;

const useHandleIntersection = (fetchNextPage: HandleIntersection, targetRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, targetRef]);
};

export default useHandleIntersection;
