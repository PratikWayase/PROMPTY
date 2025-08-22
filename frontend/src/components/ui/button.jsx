
import React, { Children } from 'react'

import { cn } from '../../utils/cn'

const button = React.forwardRef (({

    className,
    variant = 'default',
    chilfren ,
    ...props
},ref) => {

    const baseStyles = "inline-flex item-center justify-center rounded-md font-medium trasition-colors focus-visible:ouline-none focus:visible:ring-2 focus-visiting:ring-ring disabled:pointer-events-none disabled:opacity-50"

    const variantStyle = {
        default : "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive : " bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline :"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost : "hover :bg-accent hover:text-accent-foreground",
        link : 'text-primary underline-offset-4 hover:underline'
    }

    const sizesStyle = {
        default : "h-10 oy-2 px-4",
        sm:"h-9 rounded-md px-3",
        lg : "h-11 rounded-md px-8",
        icon :"h-10 w-10"
      
    };

    return (
        <button
        ref = {ref}
        className={cn(
            baseStyles,
            variantStyles[variant],
            sizesStyle[size],
            className
        )}
        {...props}>

            {Children}
        </button>
    )
});

Button.displayName = "Button";

export {Button};
