// hooks/useGoogleAutocomplete.ts
import { useEffect, useRef } from "react";

const useGoogleAutocomplete = () => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initializeAutocomplete = (input: HTMLInputElement) => {
    if (!window.google) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(input, {
      types: ["(regions)"], // Restrict to regions (cities)
      componentRestrictions: { country: "us" }, // Restrict to a specific country if needed
    });
  };

  return { initializeAutocomplete, autocompleteRef };
};

export default useGoogleAutocomplete;
