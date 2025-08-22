import React from 'react'

import { cn } from '../../utils/cn'


export function Input ({className, type , ...props}){
    return (
        <input
        type= {type || 'text'}
        className= {cn(
            "flex h-10 w-full rounded-md border border-input bg-backgrounf px-3 py-2 text-sm ring-offset-emerald-50 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:visible:ouline-none focus:visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-cell",
            className

        )}
        {...props}>
        </input>
    )
}