import { useState } from 'react';

import Swal from 'sweetalert2';

// Define the interface for the form data
interface Contact_US {
    email: string,
    name: string,
    platform: string,
    phone_number: string,
    body: string,
    subject: string,
    url: string,
    contact_us: boolean
}

// Define the initial form state
const initialFormData: Contact_US = {
    email: '',
    name: '',
    platform: 'Musaics',
    body: '',
    phone_number: '',
    subject: '',
    url: '',
    contact_us: true
};

// Custom hook for form handling
const useForm = () => {
    const [formData, setFormData] = useState<Contact_US>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // const notify = (message: string) => toast(message);

    const showToast = (msg: string) => {
        Swal.fire({
            color: 'white',
            padding: '8px',
            background: 'green',
            titleText: 'Awesome!',
            text: msg,

            icon: 'success',
            iconColor: 'white',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 5000
        });
    };
    // Function to handle form submission
    const handleSubmit = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Check if the API call was successful
            if (!response.ok) {

                throw new Error('Failed to submit form');
            }
            showToast('Form Submitted Successfuly, We will get back to you soon!')

            // Reset form after successful submission
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);

        }
    };

    // Function to reset the form
    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
    };

    // Function to handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
        });
    };

    // Function to validate form fields
    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};


        // Email validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
            valid = false;
        }


        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        //   Phone validation
        // if (!formData.phone_number) {
        //     newErrors.phone_number = 'Phone Number is required';
        //     valid = false;
        // } else if (!isValidPhoneNumber(formData.phone_number)) {
        //     newErrors.phone_number = 'Invalid phone number format';
        //     valid = false;
        // }


        //   Subject validation
        if (!formData.subject) {
            newErrors.subject = 'Subject is required';
            valid = false;
        }


        // Message validation
        if (!formData.body) {
            newErrors.body = 'Message is required';
            valid = false;
        }


        // URL validation
        if (formData.url && !isValidUrl(formData.url)) {
            newErrors.url = 'Invalid URL format';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Function to check if email is valid
    const isValidEmail = (email: string) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to check if URL is valid
    const isValidUrl = (url: string) => {
        // Basic URL validation regex
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };


    const isValidPhoneNumber = (phoneNumber: string) => {
        // Basic phone number validation regex
        const phoneRegex = /^\d{11}$/; // Assumes a 10-digit phone number
        return phoneRegex.test(phoneNumber);
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        validateForm,
        resetForm
    };
};

export default useForm;