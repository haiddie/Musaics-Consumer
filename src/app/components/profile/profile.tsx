'use client'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Confirmationbox from '../ConfirmationBox/ConfirmationBox';
import { renderSkeletons } from "@/app/Util/skeleton";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import { refreshFirebaseToken } from '@/app/Util/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { debounce } from 'lodash';


export default function Profile({ onclose, onDelete, onUpdate }: any) {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    publicDisplayName: Yup.string()
      .min(2, 'Public Display Name must be at least 2 characters')
      .max(15, 'Public Display Name must be max 15 characters')
      .required('Public Display Name is required'),

    // displayPicture: Yup.mixed(),
  });

  const [cities, setCities] = useState<any>();
  const data = JSON.parse(localStorage.getItem('userInfo') as any);
  let firstName = '', lastName = '';
  if (data !== null && data?.name !== null) {
    [firstName, lastName] = data && data?.name.split(' ');
  }
  const [confirmationBox, setConfirmationBox] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false);






  // #region FUNCTIONS

  const notify = (message: string) => toast(message);

  const fetchCitiesData = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      let url = `${process.env.NEXT_PUBLIC_LOGIN_URL}?home_page=true&city=true&drop_down=true`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCities(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching cities:', error);
      setIsLoading(false)
    }
  };

  const deleteAccount = async () => {
    setConfirmationBox(false)
    setDeleteLoader(true);
    const token = localStorage.getItem('token');
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const body = {
        delete_permanently: true
      };
      const url = `${process.env.NEXT_PUBLIC_PROFILE_URL}/user`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to delete account permanently');
      }
      setDeleteLoader(false);
      onDelete();
      return response.json();
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteLoader(false);
      notify('Error occured while deleting the user');
      throw error;

    }
  };

  // #endregion


  // #region LIFECYCLE
  const [token, setToken] = useState(null)


  const getRefreshtoken = async () => {
    let tken: any = await refreshFirebaseToken()

    setToken(tken)
    fetchCitiesData()
  }

  useEffect(() => {

    getRefreshtoken()
  }, [])

  // #endregion

  const [isUsernameLoading, setIsUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameErrorBool, setUsernameErrorBool] = useState<boolean>(false);

  const handleUsernameChange = useCallback(
    debounce(async (username: string) => {
      const token = localStorage.getItem('token');
      if (username) {
        try {
          const result = await checkUsernameInDb(username, token);
          if (!result?.success) {
            setUsernameError('Username already exists');
            setUsernameErrorBool(true)
          } else {
            setUsernameError(null);
            setUsernameErrorBool(false)
          }
        } catch (error) {
          setUsernameError('Error checking username');
          setUsernameErrorBool(true)
        }
      }
    }, 500),
    [] // dependencies
  );

  useEffect(() => {
    return () => {
      handleUsernameChange.cancel();
    };
  }, [handleUsernameChange]);


  //Check USerName in DB
  const checkUsernameInDb = async (username: string, token: string | null): Promise<any> => {
    setIsUsernameLoading(true); // Assuming you have a state variable to track loading
    try {
      const url = `${process.env.NEXT_PUBLIC_PROFILE_URL}/consumer?register=true&username=${username}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setIsUsernameLoading(false);
      return data;
    } catch (error) {
      console.error('Error checking username:', error);
      setIsUsernameLoading(false);
      throw error;
    }
  };

  return (
    <div>
      <div className="pt-20 2xl:pt-0 m-3 flex justify-end">
        <button onClick={onclose} className="flex justify-end text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>



      {!deleteLoader ? <Formik
        initialValues={{
          firstName: firstName || '',
          lastName: lastName || '',
          email: data?.email ? data?.email : '',
          publicDisplayName: data?.username ? data?.username : '',
          homeCity: data?.city_id ? data?.city_id : '',
          status: data?.stasus ? data?.stasus : 'published'
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: any,
          { setSubmitting }: any
        ) => {
          setSubmitting(true);
          const token = localStorage.getItem('token');
          const userData = {
            email: values?.email,
            name: `${values?.firstName} ${values.lastName}`,
            city_id: values?.homeCity,
            username: values?.publicDisplayName,
            status: values?.status,
            id: data?.id,
            profile: true,
            role: data?.role
          }
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PROFILE_URL}/user`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(userData),
            });
            if (!response.ok) {
              throw new Error(`Failed to update user (status ${response.status})`);
            }
            const updatedUser = await response.json();
            localStorage.removeItem('userInfo');
            localStorage.setItem('userInfo', JSON.stringify(updatedUser?.data[0]));
            setSubmitting(false);
            onUpdate();
            onclose(true);
            return updatedUser;
          } catch (error) {
            console.error('Error updating user:', error);
            notify('Error occured while updating User')
            setSubmitting(false);
            throw error;
          }
        }}
      >
        {({ values, setFieldValue, isValid, isSubmitting }) => (
          <Form>
            <div className="p-3">
              <div>
                <h2 className="text-2xl text-primary-100 font-cabin font-bold">Tappi Member Account</h2>

                <div className="w-full mt-6 space-y-2 pb-12 sm:pb-0">
                  <div >
                    <label className="text-sm font-cabin text-white">
                      First name *
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="px-3 block w-full rounded-md border py-2 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-none"
                      />
                      <ErrorMessage name="firstName" component="div" className="error text-red-500 text-xs my-2" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-cabin text-white">
                      Last name *
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="px-3 block w-full rounded-md border py-2 text-black shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:border-none"
                      />
                      <ErrorMessage name="lastName" component="div" className="error text-red-500 text-xs my-2" />
                    </div>
                  </div>

                  <div >
                    <label className="text-sm font-cabin text-white">
                      Email *
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="px-3 block w-full rounded-md border py-2 text-black shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:border-none"
                      />
                      <ErrorMessage name="email" component="div" className="error text-red-500 text-xs my-2" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last-name" className="text-sm font-cabin text-white">
                      Public Display Name *
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <Field
                        type="text"
                        max
                        id="publicDisplayName"
                        name="publicDisplayName"
                        className="px-3 block w-full rounded-md border py-2 text-black shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:border-none"

                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          setFieldValue('publicDisplayName', value);
                          handleUsernameChange(value);
                        }}
                      />
                      {isUsernameLoading && <div className="text-xs text-gray-400 my-2">Checking username...</div>}
                      {usernameError && <div className="error text-red-500 text-xs my-2">{usernameError}</div>}
                      <ErrorMessage name="publicDisplayName" component="div" className="error text-red-500 text-xs my-2" />

                    </div>
                  </div>

                  <div >
                    <label htmlFor="last-name" className="text-sm font-cabin text-white">
                      Home City *
                    </label>
                    {!isLoading && cities ? <div>
                      <select onChange={(event) => {
                        setFieldValue("homeCity", event.target.value);
                      }}
                        className='w-full bg-white rounded-md py-2 px-3 text-black font-normal'
                        value={values.homeCity || ""}>
                        {
                          cities?.data?.map((city: any, index: number) => (
                            city?.id && (
                              <option key={index} className='text-black p-2' value={city.id}>
                                {city.name}
                              </option>
                            )
                          ))
                        }

                      </select>

                      <ErrorMessage name="homeCity" component="div" className="error text-red-500 text-xs my-2" />
                    </div> :
                      <div>{renderSkeletons(1, '40')}</div>}
                  </div>

                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6 mr-5">

              <div className='w-full flex gap-x-10 justify-start mx-5 text-xl'>

                <button onClick={() => { setConfirmationBox(true) }} type="button" className="px-4 sm:px-6 py-2 inline-flex items-center gap-x-2 text-sm sm:text-base font-semibold rounded-full border border-red-500 text-red-500 hover:border-red-500 hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600">
                  Delete Account

                </button>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting || usernameErrorBool}
                className={`w-full min-w-[150px] items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white ${!isValid || isSubmitting || usernameErrorBool ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-100'} sm:w-auto`}
              >
                {isSubmitting ? <div className='flex flex-row gap-x-2'>Saving ... <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center">
                    <div className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent  rounded-full text-white" role="status" aria-label="loading"></div>
                  </div>
                </div></div> : 'Save Profile'}
              </button>

            </div>


          </Form>)}
      </Formik> :
        <div className="flex flex-col min-h-[550px] justify-center items-center p-4">
          <div className="flex justify-center">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
            </div>
          </div>
        </div>
      }
      <Confirmationbox
        confirmationMessage="Are you sure you want to delete the Account?"
        toggleModal={() => { setConfirmationBox(false) }}
        showModal={confirmationBox}
        onDelete={deleteAccount}
      />
      <div>
        {/* <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                onClick={() => toast.dismiss()}
                rtl={false}
                draggable
                theme="dark"
                limit={1}
            /> */}
      </div>
    </div >
  )
}