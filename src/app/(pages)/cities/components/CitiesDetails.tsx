'use client'

import { Fragment, useEffect, useState } from "react";
import MusaicsListing from "@/app/components/MusaicsListing/MusaicsListing";
import FeaturedArtists from "../../artists/components/Featured";
import ArtistNews from "@/app/components/News/News";
import LandmarksListing from "@/app/components/LandmarksListing/LandMarkListing";
import SearchableDropdown from "./SearchableDropdown";
import { renderSkeletons } from "@/app/Util/skeleton";
import { Coordinates } from "./model";
import { Box, Slider, Switch } from "@mui/material";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

import AutocompleteInput from './GoogleAutocomplete';


const CitiesDetails = () => {


    const [cityData, setCityData] = useState<any>();
    const [closestCity, setClosestData] = useState<any>();
    const [showClosestCity, setShowClosestCity] = useState<boolean>(false);
    const [value, setValue] = useState<any>();
    const [radius, setRadius] = useState<any>(60)
    const [zipcode, setZipcode] = useState<any>(null)
    const [showDefault, setShowDefault] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    // #region FUNCTION

    const getClosestCityData = async (lat: any | undefined = undefined, long: any | undefined = undefined) => {
        const cityData_ = await getCitiesData()

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_LOGIN_URL}?closest_city=true&lat=${lat !== undefined ? lat : 'null'}&long=${long !== undefined ? long : 'null'}&radius=${radius}`,
                { next: { revalidate: 3600 } }
            )
            const cityRes = await res.json();
            if (cityRes.data && cityRes.data.length > 0) {
                setShowDefault(false)
                setClosestData(cityRes.data);
                setValue({ id: cityRes.data[0].id, name: cityRes.data[0].name });
                //setCityData(cityRes);
            }
            else {
                setShowDefault(true)

                let loginData: any = localStorage.getItem('userInfo');
                loginData = JSON.parse(loginData);
                if (loginData && loginData?.city_id) {

                    setValue({ id: loginData?.city_id, name: loginData?.city_name });

                }
                else {

                    setValue({ id: cityData_?.data[0]?.id, name: cityData_?.data[0]?.name });
                }
            }

        } catch (error) {
            setShowDefault(false)
            console.log('ERROR: >>>', error);
        }
    }

    const getLatLong = (): Promise<Coordinates> => {
        let latitude = null;
        let longitude = null;
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;

                        let loginData: any = localStorage.getItem('userInfo');
                        if (!loginData) {
                            setShowClosestCity(true);
                        }

                        resolve({ lat: latitude, long: longitude });
                    },
                    async (error) => {
                        console.log('ERROR lat long: >>>', error);

                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };
    const getCitiesData = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_LOGIN_URL}?city=true&drop_down=true`;
            const response = await fetch(url,
                { next: { revalidate: 3600 } });
            const data = await response.json();
            setCityData(data);
            return data;
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    // #endregion

    // #region LIFECYCLE


    const searchParams = useSearchParams()

    const name = searchParams.get('name')
    const id = searchParams.get('id')

    const [invalid_location, setInvalidLocation] = useState<boolean>(false)

    useEffect(() => {
        (async () => {

            if (id && name) {
                setShowClosestCity(false);
                await getCitiesData();

                setValue({ id: id, name: name });
            }
            else {
                const data: any = await getCitiesData();
                let loginData: any = localStorage.getItem('userInfo');
                loginData = JSON.parse(loginData);
                if (loginData && loginData?.city_id) {

                    setValue({ id: loginData?.city_id, name: loginData?.city_name });
                    setShowClosestCity(false);

                    let coordinates = null;
                    let lat;
                    let long;

                    try {
                        coordinates = await getLatLong();
                        lat = coordinates.lat;
                        long = coordinates.long;

                    } catch (error) {




                        if (data && data.data.length > 0) {

                            if (loginData && loginData?.city_id) {

                                setValue({ id: loginData?.city_id, name: loginData?.city_name });
                            }
                            else {

                                setValue({ id: data.data[0]?.id, name: data.data[0]?.name });
                            }

                            setShowClosestCity(false)
                            setInvalidLocation(true);
                        }
                    }

                } else {


                    let coordinates = null;
                    let lat;
                    let long;

                    try {
                        coordinates = await getLatLong();
                        lat = coordinates.lat;
                        long = coordinates.long;
                        setShowClosestCity(true)

                        await getClosestCityData(lat, long);

                    } catch (error) {




                        if (data && data.data.length > 0) {

                            setValue({ id: data.data[0]?.id, name: data.data[0]?.name });
                            setShowClosestCity(false)
                            setInvalidLocation(true);
                        }

                    }





                }
            }


        })();
    }, []);

    useEffect(() => {
        if (closestCity) {

            setValue({ id: closestCity[0]?.id, name: closestCity[0]?.name });
        };
    }, [closestCity])


    const changeRadius = (event: any) => {
        setRadius(event.target.value)
    }


    useEffect(() => {
        (async () => {

            if (showClosestCity) {
                if (selectedPlace) {
                    const fetchData = async () => {
                        if (selectedPlace && selectedPlace.vicinity) {
                            // const matched = cityData.data.find((city: any) => city.name === selectedPlace.vicinity);
                            // if (matched) {

                            //  setValue({ id: matched.id, name: matched.name });


                            if (selectedPlace.geometry && selectedPlace.geometry.location) {
                                const latitude = selectedPlace.geometry.location.lat();
                                const longitude = selectedPlace.geometry.location.lng();


                                await getClosestCityData(latitude, longitude);
                                //    }
                                // } else {

                                //     // setValue(null);
                            }
                        }
                    };

                    fetchData();
                }
                else {
                    let coordinates = null;
                    let lat;
                    let long;
                    try {
                        coordinates = await getLatLong();
                        lat = coordinates.lat;
                        long = coordinates.long;
                        await getClosestCityData(lat, long);
                    } catch (error) {

                    }



                }

            }
            else {
                await getCitiesData();
            }
        })();
    }, [showClosestCity, radius, selectedPlace])



    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const handleSwitchChange = (event: any) => {
        setShowClosestCity(event.target.checked);
    };





    const handlePlaceSelected = (place: google.maps.places.PlaceResult | null) => {
        setSelectedPlace(place);
        if (place) {
            const zipcode = place.name
            setZipcode(
                zipcode
            )
        }

    };

    useEffect(() => {
        // Load the Google Maps script only once
        if (!document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places"]`)) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);




    const setcity = (id: any, name: any) => {
        setValue({ id: id, name: name });
    }

    // #endregion

    return (
        <div className="font-cabin pt-36 px-6 flex flex-col gap-y-7">
            {cityData && value ?
                <>
                    {showDefault && (<span>Default Cities Shown Because there is no closest city near your location.</span>)}

                    <div className="flex justify-start items-center gap-x-2">
                        <SearchableDropdown
                            options={cityData?.data}
                            label="name"
                            id="id"
                            selectedVal={value?.name}
                            handleChange={(val: any) => setValue(val)}
                        />
                        {showClosestCity && (<div className="blinkbox inline-block mr-2">
                            <div id="light" className="dot blink"></div>
                        </div>)}
                        <button type="button" className="border-white text-white border-[0.5px] p-2 rounded-lg" onClick={() => { setOpen(true) }}>
                            Filters
                        </button>
                        <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
                            <Dialog className="relative z-10" onClose={setOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="mx-auto sm:mx-[360px] w-full  mt-[180px] max-w-[350px] transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-gray-700 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                                            <Combobox>
                                                {({ activeOption }) => (
                                                    <>
                                                        <div className="grid grid-cols-12 p-4">
                                                            {invalid_location && <div className="col-span-12">
                                                                <p className="text-red-500 p-2">*Please allow location permission from your browser settings and then reload to start using this feature!</p>
                                                            </div>}


                                                            <div className="col-span-12">
                                                                <div className="flex items-center justify-start gap-x-2">
                                                                    <h1 className="text-white">Show Closest City</h1>
                                                                    <Switch disabled={invalid_location}
                                                                        className="text-violet-500"
                                                                        color="default"
                                                                        checked={showClosestCity}
                                                                        onChange={handleSwitchChange}
                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className="col-span-12">
                                                                <Box sx={{ width: 300 }}>
                                                                    Radius:{" "}
                                                                    <input
                                                                        min={10}
                                                                        disabled={
                                                                            invalid_location || !showClosestCity
                                                                        }
                                                                        pattern="\d*"
                                                                        max={500}
                                                                        className="text-white bg-transparent border border-gray-200 p-2 rounded-md"
                                                                        type="number"
                                                                        value={radius}
                                                                        onChange={changeRadius}
                                                                        onInput={(e: any) => {

                                                                            if (e.target.value > 500) {
                                                                                e.target.value = 500
                                                                            }
                                                                        }}
                                                                        onKeyDown={(e: any) => {


                                                                            // Prevent '+' and '-' keys from being pressed
                                                                            if (e.key === "+" || e.key === "-" || e.key === '.') {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Slider
                                                                        aria-label="Temperature"
                                                                        defaultValue={60}
                                                                        className="text-violet-500"
                                                                        onChange={changeRadius}
                                                                        valueLabelDisplay="auto"
                                                                        shiftStep={30}
                                                                        disabled={invalid_location || !showClosestCity}
                                                                        step={10}
                                                                        marks
                                                                        value={radius}
                                                                        min={10}
                                                                        max={500}
                                                                    />



                                                                    {showClosestCity && (
                                                                        <div className="flex gap-x-2 items-center justify-between">
                                                                            <AutocompleteInput onPlaceSelected={handlePlaceSelected} />
                                                                            {
                                                                                selectedPlace &&
                                                                                <button type="button" onClick={() => setSelectedPlace(null)} className="bg-red-600 text-white py-3 px-2 rounded-md text-xs">Clear Zip code</button>
                                                                            }

                                                                        </div>)}

                                                                    {showClosestCity && selectedPlace && (
                                                                        <div>
                                                                            <h2 className="text-sm p-2">Selected City By Zipcode:{" "}  {selectedPlace.vicinity} ({selectedPlace.name})</h2>

                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-wrap gap-2 py-2">
                                                                        {closestCity && showClosestCity &&
                                                                            <p className="w-full basis-[100%] text-sm">
                                                                                Close Cities
                                                                            </p>}
                                                                        {closestCity && showClosestCity && closestCity.map((city: any) => (
                                                                            <div className="border p-2 rounded-md break-words  border-gray-200 bg-transparent cursor-pointer"
                                                                                key={city.id}
                                                                                onClick={() => { setcity(city.id, city.name) }}>
                                                                                {city.name}
                                                                            </div>
                                                                        ))}

                                                                        {
                                                                            showClosestCity && selectedPlace && !closestCity &&
                                                                            <>
                                                                                <p className="p-2">No Cities Near </p>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </Box>
                                                            </div>



                                                        </div>






                                                    </>
                                                )}
                                            </Combobox>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                    </div>
                </>
                : <div className="flex gap-x-20 mt-3">
                    {renderSkeletons(1, '40')}
                </div>}
            {value ?
                <div className=" flex flex-col gap-y-7">
                    <LandmarksListing id={value?.id} />
                    <MusaicsListing query={`?article=true&type=content&city=${value?.id}`} />
                    <ArtistNews query={`?article=true&type=articles&city=${value?.id}`} />
                    <FeaturedArtists orientation="grid" title="Featured Artists" query={`?artist=true&featured=true&sort_by=created_at&sort_order=DESC&city=${value?.id}`} />
                </div> :
                <div className="flex gap-x-20 mt-3">
                    {renderSkeletons(1, '400')}
                </div>
            }
        </div>

    )
}

export default CitiesDetails;