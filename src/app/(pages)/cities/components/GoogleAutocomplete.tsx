// components/AutocompleteInput.tsx
import { useRef, useEffect } from 'react';
import useGoogleAutocomplete from './hooks/useGoogleAutoComplete';

interface AutocompleteInputProps {
    onPlaceSelected: (place: google.maps.places.PlaceResult | null) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onPlaceSelected }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { initializeAutocomplete, autocompleteRef } = useGoogleAutocomplete();

    useEffect(() => {
        if (inputRef.current) {
            initializeAutocomplete(inputRef.current);

            if (autocompleteRef.current) {
                autocompleteRef.current.addListener('place_changed', () => {
                    if (autocompleteRef.current) {
                        const place = autocompleteRef.current.getPlace();
                        onPlaceSelected(place);
                    }
                });
            }
        }
    }, [initializeAutocomplete, autocompleteRef, onPlaceSelected]);

    return <input type="number" ref={inputRef} placeholder="Enter the zipcode here" className='p-2 rounded-md bg-transparent border border-gray-200' />;
};

export default AutocompleteInput;
