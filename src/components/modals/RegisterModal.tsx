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
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/hooks/useLoginModal'


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

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

    const toggleModal = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, []);
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(res => {
            registerModal.onClose();
        })
        .catch(error => {
            toast.error('Something Went Wrong!');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />
            <Input 
                id='email'
                type='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-3 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                onClick={() => {}}
                icon={FcGoogle}
            />
            <Button 
                outline
                label='Continue with Github'
                onClick={() => {}}
                icon={AiFillGithub}
            />
            <div className=' text-neutral-500 text-center mt-4 font-light'>
                <div className=' flex justify-center items-center gap-2'>
                    Already have an account?
                    <div 
                    onClick={() => {toggleModal()}}
                    className=' text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal 
            isOpen={registerModal.isOpen}
            disabled={isLoading}
            title='Register'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            onClose={registerModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
 
export default RegisterModal;