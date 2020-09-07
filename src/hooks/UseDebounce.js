import { useState, useEffect } from "react";

export default function useDebounce(terms, delay) {
  const [debouncedTerms, setDebouncedTerms] = useState(terms);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerms(terms);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [terms, delay]);

  return debouncedTerms;
}
