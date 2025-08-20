
import React, { useEffect, useState } from 'react'

const MobileLayout = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // effect to handle intial dark mmode state & perssite prefernce 

    useEffect(() => {

        const savedTheme = localStorage.getItem('theme');

        // set deafault to light mode 

        const intialMode = savedTheme === 'dark';
        setIsDarkMode(intialMode);

        if (intialMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }

    }, [])


    // toggle dark mode 

    const toggleDarkMode = () => {

        const newMode = !isDarkMode
        setIsDarkMode(newMode)

        if (newMode) {
            document.documentElement.classList.add('dark')
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark')
            document.body.classList.remove('dark')
            localStorage.getItem('theme', 'light')
        }
    }


    // mobile menu toggle 
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }


    return (
        <div className='mobile-layout min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-400'>
            {/* mobile header */}
            <header className='mobile-header sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm'>
                <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
                    {/* logo or app title */}
                    <div className='flex items-center'>

                        <img src='/logo.png'
                            alt='prompt ENhacer'
                            className='h-8 w-8 mr-2'>
                        </img>

                        <h1 className='text-lg font-bold text-indigo-800 dark:text-indigo-300'>
                            Prompt Enhancer
                        </h1>
                    </div>

                    {/* mobile menu toggle */}
                    <div className=' flex items-center space-x-3'>
                        {/*  theme toggle */}
                        <button onClick={toggleDarkMode}
                            className='p2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
                            aria-label="Toggle dark mode">
                            {isDarkMode ? (
                                <Sun className='h-5 w-5 text-yellow-500' />
                            ) : <Moon classname='h-5 w-5 text-indigo-800' />}
                        </button>

                        {/* MObile menu toggle */}

                        <button onClick={toggleMobileMenu}
                        className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover::bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        aria-label='Toggle mobile menu'>
                            {isMobileMenuOpen ? (
                                <x className = 'h-5  w-5'/>
                            ) : (
                                <Menu  className = 'h-5 w-5'/>
                            )}

                        </button>

                    </div>
                </div>
            </header>

        </div>
    )
}

export default MobileLayout
