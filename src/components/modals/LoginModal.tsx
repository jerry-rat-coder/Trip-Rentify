'use client'


import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useLoginModal from '@/hooks/useLoginModal'
import { useState, useCallback } from 'react'
import { signIn } from 'next-auth/react'
import  {useRouter} from 'next/navigation'
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
import useRegisterModal from '@/hooks/useRegisterModals'


const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [ isLoading, setIsLoading ] = useState(false);

    const router = useRouter();

    const { 
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [LoginModal]);
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        }).then(res => {
            setIsLoading(false);

            if(res?.ok && !res?.error) {
                toast.success('Logged in!');
                router.refresh();
                loginModal.onClose();
            }

            if(res?.error) {
                toast.error(res.error);
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome back'
                subtitle='Login to your account!'
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
                    First time using Airbnb?
                    <div 
                    onClick={toggleModal}
                    className=' text-neutral-800 cursor-pointer hover:underline'>
                        Create an account.
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal 
            isOpen={loginModal.isOpen}
            disabled={isLoading}
            title='Login'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            onClose={loginModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
 
export default LoginModal;