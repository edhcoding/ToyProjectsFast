import { RefObject, useEffect, useState } from "react";

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver; // 현재 브라우저가 Intersection Observer를 지원하는지

    if (!node || !hasIOSupport) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return entry;
}

export default useIntersectionObserver;
