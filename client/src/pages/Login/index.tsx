import { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import { LOGIN, SIGNUP } from '../../utils/mutations';
import Auth from '../../utils/auth'

import ContentContainer from '../../components/ContentContainer';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import './assets/style.css';

const LoginPage = () => {
    const notify = (text: string) => toast.error(`${text}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'colored'
    });
    if (Auth.loggedIn()) window.location.assign('/applied');

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ''
    })
    const [signupForm, setSignupForm] = useState({
        username: "",
        password: '',
        email: ''
    })
    const [login] = useMutation(LOGIN);
    const [addUser] = useMutation(SIGNUP);

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    };

    const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    };

    const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: { login: loginData } } = await login({
                variables: { ...loginForm }
            })
            Auth.login(loginData.token);
            window.location.assign('/tracker')
        } catch (e) {
            console.error(e);
            notify(`${e} Please try again!`);
        }

    };

    const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: { addUser: signupData } } = await addUser({
                variables: { ...signupForm }
            })
            Auth.login(signupData.token);
            window.location.assign('/tracker')
        } catch (e) {
            console.error(e);
            notify(`${e} Please try again!`);
        }
    };

    return (
        <ContentContainer className='gray-bg'>
            <div className="flex flex-col items-center md:items-start md:justify-around md:flex-row">
                <div className="login p-5">
                    <h2 className='text-center'>Login</h2>
                    <form action="#" className="flex flex-col" onSubmit={handleLogin}>
                        <TextInput onChange={handleLoginChange} name='username' />
                        <TextInput onChange={handleLoginChange} name='password' />
                        <Button text="login" type="submit" classes="blue mx-auto mt-4" />
                    </form>
                </div>
                <div className="signup p-5">
                    <h2 className='text-center'>Signup</h2>
                    <form action="#" className="flex flex-col" onSubmit={handleSignup}>
                        <TextInput name='email' onChange={handleSignupChange} />
                        <TextInput name='username' onChange={handleSignupChange} />
                        <TextInput name='password' onChange={handleSignupChange} />
                        <Button text="signup" type="submit" classes="blue mx-auto mt-4" />
                    </form>
                </div>
            </div>
        </ContentContainer>
    )
};

export default LoginPage;