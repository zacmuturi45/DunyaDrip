'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading(mode === 'login' ? 'Logging in...' : 'Signing up...');

    try {
      const res = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      toast.success(mode === 'login' ? 'Login successful' : 'Signup successful', { id: toastId });
      if (mode === "login") {
        router.push('/')
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        router.push('/verify')
      }
    } catch (err) {
      toast.error(err.message, { id: toastId });
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
              className={errors.firstName ? 'error-input' : ''}
            />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}

            <input
              type="text"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
              className={errors.lastName ? 'error-input' : ''}
            />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          className={errors.password ? 'error-input' : ''}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {serverError && <p className="error">{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>

        <p className="toggle-text">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
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




























