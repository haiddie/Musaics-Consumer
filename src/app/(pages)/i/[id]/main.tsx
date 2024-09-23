"use client"
import { Metadata, ResolvingMetadata } from "next";
import { useCallback, useEffect, useState } from "react";
import MuzicardDetails from "../../release/components/muzicardDetails";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { location_ob } from "./location_ob.model";
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}




const MainContainer = ({ params: { id } }: Props) => {
  const [ID, setID] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tokenID, setTokenID] = useState<string>("")
  const [deviceId, setDeviceId] = useState('');


  const [ipInfo, setIpInfo] = useState(null);




  useEffect(() => {
    async function fetchIpInfo(ip: string = '8.8.8.8') {
      try {
        const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN || 'b893909af1ddbe';
        const res = await fetch(
          `https://ipinfo.io?token=${token}`,
          { next: { revalidate: 3600 } }
        );
        const ipInfoRes = await res.json();
        console.log('ipInfoRes', ipInfoRes)
        setIpInfo(ipInfoRes)
        fetchDeviceId(ipInfoRes)
        return ipInfoRes;
      } catch (error) {
        console.log('ERROR: >>>', error);
      }
    }
    setID(id)
    if (id) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('secret_id', id);
      }
    }

    if (ID) {
      fetchIpInfo();


    }
  }, [ID])


  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const router = useRouter();
  const fetchDeviceId = async (location_obj: location_ob) => {
    try {
      // Get the cookie string from document.cookie


      const uniqueId = Cookies.get('device_id') || generateUniqueId();
      Cookies.set('device_id', uniqueId);
      setDeviceId(uniqueId);

      getToken(uniqueId, location_obj.ip, location_obj.city, location_obj.region, location_obj.country, location_obj.timezone, location_obj.postal)
    } catch (error) {
      // Handle errors here
    }
  };

  const getToken = useCallback(async (uniqueId: any, ip_address: string, city: string, region: string, country: string, timezone: string, postal_code: string) => {
    let formData = {
      card_id: ID,
      device_id: uniqueId,
      ip_address: ip_address,
      city: city,
      region: region,
      country: country,
      timezone: timezone,
      postal_code: postal_code,
      generate_ot_token: true
    }

    setIsLoading(true);

    if (formData.device_id) {

      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_MUSAICS_CONSUMER_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Token cannot be generated, Please provide with valid data!');
        } else {
          const data = await response.json();
          setTokenID(data.data);
          // window.location.href = `/muzicard-tappi/${data.data}`
          router.replace(`/release/${data.data}`);
          //router.replace('https://www.google.com/');



        }
      } catch (error) {
        console.error('Error generating token:', error);
        setIsLoading(false);
      }
    }

  }, [deviceId, ID]);



  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col min-h-[550px] justify-center items-center p-4">
          <div className="flex justify-center">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading"></div>
          </div>
        </div>
      ) : (

        <div className="flex min-h-[550px] justify-center items-center">No Tappi Card Found!</div>

      )}
    </div>
  );
}

export default MainContainer;
