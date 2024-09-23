// modalUtils.ts
import { useState } from 'react';

import GenericModal from '../components/modal/modal';
import Login from '../components/login/login';
import { initializeApp } from 'firebase/app';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { getCreatorToken, getUserData, isUserRegisteredInDb, registerUserInDb } from './login';
import { usePathname, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export function useOpenSignupModal() {
    const notify = (message: string) => toast(message);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    const openSignupModal = (typ: string) => {
        setType(typ);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const signInFromLink = async () => {
        setIsLoading(true);
        let token = '';
        const firebaseConfig = {
            apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
            projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
            messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
            appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
        };

        try {
            const firebaseApp = initializeApp(firebaseConfig);
            const auth = getAuth(firebaseApp);

            const url = `${window?.origin}/?email=${searchParams.get(
                'email'
            )}&apiKey=${searchParams.get('apiKey')}&oobCode=${searchParams.get(
                'oobCode'
            )}&mode=${searchParams.get('mode')}&lang=${searchParams.get('lang')}`;

            let email = searchParams.get('email');

            if (isSignInWithEmailLink(auth, url)) {
                if (email === null) {
                    email = localStorage.getItem('emailForSignIn');
                }

                signInWithEmailLink(auth, email as string, url)
                    .then(async (result: any) => {
                        const user = result.user;
                        const resp = await isUserRegisteredInDb(user);
                        if (resp.success === true) {
                            await registerUserInDb(user);
                        }
                        token = user.stsTokenManager.accessToken;
                        const data = await getUserData(token, auth);
                        const userObject = data.data[0];
                        const creatorToken: any = await getCreatorToken(token);
                        localStorage.setItem('creatorToken', creatorToken?.data);
                        setIsLoading(false);
                        localStorage.setItem('token', token);
                        localStorage.setItem('userInfo', JSON.stringify(userObject));
                        checkIsLoggedIn();
                        notify('User Logged in Successfully!');
                    })
                    .catch((error) => {
                        console.error('Error signing in:', error);
                        setIsLoading(false);
                    });
            }
        } catch (error) {
            console.error('Firebase initialization error:', error);
            setIsLoading(false);
        }
    };

    const checkIsLoggedIn = () => {
        setIsLoading(true);
        const userDataFromStorage = localStorage.getItem('userInfo');
        const parsedUserData = userDataFromStorage ? JSON.parse(userDataFromStorage) : null;
        if (userDataFromStorage) {
            setIsLoading(false);
            setIsOpen(false);
            setUserData(parsedUserData);
        } else {
            setIsLoading(false);
        }
    };

    return { isOpen, openSignupModal, closeModal };
}
