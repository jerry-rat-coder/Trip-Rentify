'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/hooks/useRegisterModals'
import { useState, useCallback } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import Modal from './Modal'


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [ isLoading, setIsLoading ] = useState(false);

    const { 
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(res => {
            registerModal.onClose();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return ( 
        <Modal 
            isOpen={registerModal.isOpen}
            disabled={isLoading}
            actionLabel='Register'
            onSubmit={handleSubmit(onSubmit)}
            onClose={registerModal.onClose}
        />
    );
}
 
export default RegisterModal;