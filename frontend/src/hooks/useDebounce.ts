import { useEffect, useState } from "react";

// debounce search
function useDebounce(searchTerm: string, delay: number = 2000) {
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    // CLEANUP: If the user types again before the delay finishes,
    // this cleanup function runs, clearing the old timer.
    return () => clearInterval(timer);
  }, [searchTerm, delay]);

  return debouncedTerm;
}

export default useDebounce;
