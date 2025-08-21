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


    return (
        <div >

        </div>
    )
}

export default Modal
