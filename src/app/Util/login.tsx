import {
    signOut,
    sendSignInLinkToEmail
} from 'firebase/auth';

export const logout = async (auth: any) => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error during logout:', error);
    }
};


export const isUserRegisteredInDb = async (user: any) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOGIN_URL}`;
        const params = new URLSearchParams({
            register: 'true',
            email: user?.email,
        });

        const response = await fetch(`${url}?${params.toString()}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error:', error);
    }
};


export const getCreatorToken = async (token: string) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_PROFILE_URL}/user?generate_custom_token=true`;
        const headers = new Headers({
            Authorization: `Bearer ${token}`,
        });
        const response = await fetch(url, { headers });
        const responseData = await response.json();
        return responseData;
    }
    catch (error) {
        console.error("An error occured: ", error)
    }
}


export const getUserData = async (token: any, auth: any) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOGIN_URL}?profile=true`;
        const headers = new Headers({
            Authorization: `Bearer ${token}`,
        });

        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error:', error);
        logout(auth);
    }
};

export const registerUserInDb = async (user: any, role: string[] = ['consumer']) => {
    try {
        let user_info = {
            name: user.displayName ? user.displayName : '',
            email: user.email,
            username: user?.username,
            phone_number: user.phone_number ? user.phone_number : '',
            uid: user.uid,
            display_picture: user.display_picture ? user.display_picture : '',
            register: true,
            sign_up_page: window.origin + window.location.pathname,
            role: role,
            "platform": "musaics"
        };

        if (user.displayName || user.name) {
            const nameArray = (user.displayName || user.name).split(' ');
            const firstName = nameArray[0];
            let lastName;
            let lastNameInitial;
            if (nameArray.length > 1) {
                lastName = nameArray[nameArray.length - 1];
                lastNameInitial = lastName.charAt(0);
            }
            user_info.username = firstName + (lastNameInitial || '');
        }

        if (!user.username && !user.displayName && !user.name) {
            user_info.username = user.email.substring(0, user.email.indexOf('@'));
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_info),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
};


export const registerUserwithEmail = async (createUserReq: any) => {
    const url = `${process.env.NEXT_PUBLIC_LOGIN_URL}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createUserReq),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


export const sendEmailLink = async (email: string, auth: any) => {
    const isNativePlatform = false;
    // const actionCodeSettings = {
    //     url: !isNativePlatform
    //         ? `${window.origin}${location.pathname}?email=${email}`
    //         : `${window.origin}${location.pathname}?email=${email}`,
    //     handleCodeInApp: true,
    // };

    // sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //     .then(() => {
    //         if (isNativePlatform) {
    //             localStorage.setItem('emailForSignIn', email);
    //             localStorage.setItem('url', `${window.origin}${location.pathname}`);
    //         } else {
    //             window.localStorage.setItem('emailForSignIn', email);
    //             localStorage.setItem('url', `${window.origin}${location.pathname}`);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error sending email link:', error);
    //     });

    let generate_email_link: any = {
        platform: 'Musaics',
        email: email,
        url: `${window.origin}${location.pathname}`,
        generate_email_link: true
    }



    const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(generate_email_link),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    if (isNativePlatform) {
        localStorage.setItem('emailForSignIn', email);
        localStorage.setItem('url', `${window.origin}${location.pathname}`);
    } else {
        window.localStorage.setItem('emailForSignIn', email);
        localStorage.setItem('url', `${window.origin}${location.pathname}`);
    }
    return responseData;
};