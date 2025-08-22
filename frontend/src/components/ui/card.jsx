import React from 'react'

import { cn } from '../../utils/cn'

const card = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}>

    </div>
  )
})

Card.displayName = "card";

const CardHeader = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}>

    </div>
  )
})


CardHeader.displayName = "CardHeader";

const cardTitle = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}>

    </h3>
  )
})


cardTitle.displayName ="cardTitle";

const CardContent = React.forwardRef (({
  className,
  ...props
},ref) =>{
  return(
    <div 
    ref = {ref}
    className={cn("p-6 pt-0",className)}
    {...props}>

    </div>
  )
})

CardContent.displayName = "CardContent"


const CardFooter = React.forwardRef(({
  className,
  ...props
},ref ) =>{
  return (
    <div
    ref = {ref}
    className= {cn("flex items-center p-6 pt-0", className)}
    {...props}>
      
    </div>
  )
})

CardFooter.displayName = "CardFooter";


export {card,CardHeader,cardTitle,CardContent,CardFooter};

