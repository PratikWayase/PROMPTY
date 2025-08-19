import React, { Children, useEffect, useState } from 'react'



const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    // effect to handle intial dark mode state 

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        // set default to light mode istanted check system prefercen
        const intialMode = savedTheme === 'dark';
        setIsDarkMode(intialMode)

        if (intialMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark')
        }
    }, []);

    // toggle dark mode 
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode)

        if (newMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <div className='flex items-center'>
            <div className='bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 shadow-sm'>
                <input type='checkbox'
                    id="theme-toggle"
                    className='hidden-checkbox'
                    checked={isDarkMode}
                    onChange={toggleDarkMode}></input>

                <label htmlFor='theme-toggle' className='flex items-center cursor-pointer'>
                    <div className='icon-wrapper relative h-4 w-4'>
                        <svg className='icon sun absolute inset-0' viewBox=' 0 0 24 24 ' fill='none' stroke='currentColor' strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1='1' x2='12' y2='3'></line>
                            <line x1="12" y1='21' x2='12' y2='23'></line>
                            <line x1="4.22" y1='4.22' x2='5.64' y2='5.64'></line>
                            <line x1="18.36" y1='18.36' x2='19.78' y2='19.78'></line>
                            <line x1="1" y1='12' x2='3' y2='12'></line>
                            <line x1="21" y1='12' x2='23' y2='12'></line>
                            <line x1="4.22" y1='19.78' x2='5.64' y2='18.36'></line>
                            <line x1="18.36" y1='5.64' x2='19.78' y2='4.22'></line>
                        </svg>
                        <svg className='icon moon absolute inset-0' viewBox='0 0 24 24' fill=' none' stroke="currentColor" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
                        </svg>

                    </div>
                </label>

            </div>
        </div>
    )
}


const AppLayout = ({ Children }) => {

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gray-800 text-gray-500 dark'>
            <header className='bg-gray-100 dark:bg-gray-800 py-1 px-4 flex items-center shadow-sm z-30 relative'>
                <div className='flex-1'></div>

                {/*center banner */}

                <div className='flex-1 flex-justify-center items-center px-4 py-0.5'>

                </div>

                {/* right button */}
                <div className='flex-1 flex justify-end gap-3'>
                    <ThemeToggle />
                </div>
            </header>

            {/* main content area */}
            <main className='flex-1 flex-col py-3 md:py-6 relative'>
                {Children}
            </main>

        </div>
    )
}

export default AppLayout;
