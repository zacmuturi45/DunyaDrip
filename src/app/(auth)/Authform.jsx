'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabase';

export default function AuthForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [mode, setMode] = useState('login');

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');

        const { email, password, firstName, lastName } = data;
        let response;

        if (mode === 'login') {
            response = await supabase.auth.signInWithPassword({ email, password });
        } else {
            response = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        firstName,
                        lastName
                    },
                    emailRedirectTo: `${location.origin}/api/auth/callback`
                }
            });
        }

        if (response.error) {
            setServerError(response.error.message);
        } else {
            mode === 'login' ? router.push('/') : router.push('/login')
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>{mode === 'login' ? 'Login to Dunya Drip' : 'Sign up for Dunya Drip'}</h2>

                {mode === 'signup' && (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register('firstName', { required: 'First name is required' })}
                        />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register('lastName', { required: 'Last name is required' })}
                        />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                {serverError && <p className="error">{serverError}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
                </button>

                <p className="toggle-text">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <span className="link" onClick={() => setMode('signup')}>
                                Sign up
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <span className="link" onClick={() => setMode('login')}>
                                Login
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}
