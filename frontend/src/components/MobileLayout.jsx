
import React, { useEffect, useState } from 'react'

const MobileLayout = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState (false);
    const [isMobileMenuOpen, setMobileMenuOpen]  = useState (false);

    // effect to handle intial dark mmode state & perssite prefernce 

    useEffect (() => {

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

    },[])


    // toggle dark mode 

    const toggleDarkMode = () => {

        const newMode = !isDarkMode
        setIsDarkMode(newMode)

        if (newMode) {
            document.documentElement.classList.add('dark')
            document.body.classList.add('dark');
            localStorage.setItem ('theme','dark');
        } else {
            document.documentElement.classList.remove('dark')
            document.body.classList.remove('dark')
            localStorage.getItem('theme','light')
        }
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
            </div>
        </header>
      
    </div>
  )
}

export default MobileLayout
