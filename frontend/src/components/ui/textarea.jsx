import React from 'react'

import { cn } from '../../utils/cn'

const textarea = React.forwardRef (({
    className ,
    ...props
},ref) =>{
    return (
        <textarea
        ref={ref}
        className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-emerald-50 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}>

        </textarea>
    )
})

Textarea.displayName = "Textarea"

export {Textarea}
