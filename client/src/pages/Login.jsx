import React from 'react';
import { supabase } from '../services/supabaseClient';
import logo from '../assets/voxel.png'

const Login = () => {
    const handleSignIn = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
        });

        console.log(error);

        if (error) console.error('Error logging in with Google:', error.message);
    };

    return (
        <div className='max-w-md mx-auto my-10 mt-[7.5rem] bg-gray-800 text-white p-6 rounded-lg shadow-md' >
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto rounded-full w-[85px] h-[80px]" src={logo} alt="Voxel Busters" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight white">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <button onClick={() => handleSignIn('google')} className="flex items-center justify-center w-full rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <i className='bx bxl-google text-xl mr-2'></i>
                            Sign in with Google
                        </button>

                        <button onClick={() => handleSignIn('gitHub')} className="flex items-center justify-center w-full rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
                            <i className='bx bxl-github text-xl mr-2'></i>
                            Sign in with GitHub
                        </button>

                        <button onClick={() => handleSignIn('twitter')} className="flex items-center justify-center w-full rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                            <i className='bx bxl-twitter text-xl mr-2'></i>
                            Sign in with Twitter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
