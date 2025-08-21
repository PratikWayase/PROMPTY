import React from 'react'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Modal = ({ isOpen, onClose, title, children, classname = '' }) => {

    const modelRef = useRef(null)
    const contentRef = useRef(null)
    const [animationState, setAnimationState] = useState('closed');


    // handle open & close animation


    useEffect(() => {
        if (isOpen) {
            setAnimationState('opening');
            setTimeout(() => setAnimationState('open'), 500)
        } else {
            setAnimationState('closing');
            setTimeout(() => setAnimationState('closed'), 300)
        }

    }, [isOpen])

    // handle escaple key to close modal

    useEffect (() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen){
                onclose();
            }
        };

        window.addEventListener('keydown',handleEscape);
        return () => window.removeEventListener('keydown',handleEscape)
    },[isOpen,onClose])


    // handlle click outside mode lto close 
    useEffect (() => {
        const handleOutsideClick = (e) => {
            if (ModalRef.current && !modelRef.current.contains (e.target) && isOpen){
                onclose();
            }
        };
        document.addEventListener('mousedown',handleOutsideClick);
        return () => document.removeEventListener ('mousedown',handleOutsideClick)

    },[isOpen,onClose])

    // focus on accesibilty - keep foucs with modal

    useEffect (() => {
        if (isOpen) {
            const focusableElements = modelRef.current ?.querySelectorAll(
                'button,[href],input, select,textarea,[tabindex]:not ([tabindex="-1])'
            )

            const firstElement = focusableElements?.[0];
            if (firstElement){
                firstElement.focus();
            }
        }

    },[isOpen]);


    // ensure proper overflow when modal opens 

    useEffect (() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

        } else {
            document.body.style.overflow = '';
        }

    },[isOpen])


    if (animationState === 'closed' && !isOpen) return null;


    return (
        <div className={` fixed inset-0 z-50 items-center justify-center transition-colors duration-300 ${animationState === 'opening' || animationState === 'open'
            ? 'bg-black bg-opacity-40 backdrop-blur-sm'
            : 'bg-black bg-opacity-0'
            }`}>

            <div
                ref={modelRef}
                style={{ maxHeight: '90vh' }}
                className={` bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 max-w-6xl onverflow-hidden flex flex-col transform transition-all duration-300 ${animationState === 'opening'
                    ? 'scale-95 opacity-0'
                    : animationState === 'open'
                        ? 'scale-100 opacity-100'
                        : 'scale-90 opacity-0'
                    } ${classname}`}>

                {/* Moal header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
                    <h3 className='text-lg font-medium text-gray-800 dark:text-gray-100'>{title}</h3>
                    <button
                        onClick={onclose}
                        className='p-1 rounded-full hover:bg-gay-200 dark:hover:bg-gray-700 transition-colors group'
                        aria-label='close'>
                        <X className='h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:rotate-90 transition-transform duration-300'></X>
                    </button>
                </div>

                {/* Model content */}
                <div 
                ref = {contentRef}
                className='flex-1 overflow-auto p-4 will-change-scroll overscroll-contain'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Modal
