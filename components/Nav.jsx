"use client"

import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import PreviousMap from 'postcss/lib/previous-map';


const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
        const response = await getProviders();

        setProviders(response);
    }
  
  setProviders();
  }, [])

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/logo.svg"
                alt='Promptopia logo'
                width={30}
                height={30}
            />
            <p className='logo_text'>Promptopia</p>
        </Link>
        
        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image 
                            src="/assets/images/logo.svg"
                            alt="profile"
                            width={37}
                            height={37}
                            className='rounded-full'
                        />
                    </Link>
                
                </div>
            ): (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type='button'
                            key={providers.name}
                            onClick={() => signIn(providers.id)}
                            className='black_btn'
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>


        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {isUserLoggedIn ? (
                <div className='flex'>
                <Image 
                    src="/assets/images/logo.svg"
                    alt="profile"
                    width={37}
                    height={37}
                    className='rounded-full'
                    onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                    <div className='dropdown'>
                        <Link
                            href="/profile"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                        >
                        My Profile
                        </Link>
                        <Link 
                            href="/create-prompt"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                        >
                        Create Prompt
                        </Link>
                        <button
                            type="button"
                            className='w-full mt-5 black_btn'
                            onClick={() => {
                                setToggleDropdown(false)
                                signOut();
                                }
                            }
                        >
                        Sign Out
                        </button>
                    </div>
                )}
                </div>
            ) : (
                <div>
                {providers && Object.values(providers).map((provider) => (
                    <button
                        type='button'
                        key={providers.name}
                        onClick={() => signIn(providers.id)}
                        className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </div>
            )}
        </div>
    </nav>

  )
}

export default Nav