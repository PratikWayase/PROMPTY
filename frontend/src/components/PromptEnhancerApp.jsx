
import { Icon, Maximize2 } from 'lucide-react'
import React, { Children, useState } from 'react'


import React from 'react'

const MaximizeButton = ({ onClick, size = 'sm', label = "Maximize", className = '' }) => {


  const sizeClasses = {
    sm: 'h-3 w-3',
    md: "h-4 w-4",
    lg: 'h-5 w-5'
  }

  return (
    <button
      onClick={onclick}
      className={`maximize-btn p-1 rounded-md transition-all duration-300 bg-gray-200
    dark:bg-gray-700  text-gray-700 dark:text-gray-300
    hover:bg-indigo-500 hover:text-white
    hover:shadow-md active:shadow-inner group ${className}`}
      aria-label={label}
      title={label}
    >

      <Maximize2 className={`${sizeClasses[size]} transform transition-transform duration-300
      group-hover::rotate-90`} />

    </button>
  )
}


const ProviderButton = ({ onClick, icon: Icon, Children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`provider-btn action-btn text-xs flex items-center px-1.5 py-0.5 rounded transition-all duration-300
    bg-gradient-to-r from-blue-600 to-indigo-800 text-white
    hover:from-blue-700 hover:to-indigo-900
    hover::scale-105 active:scale-95 group ${className}`}>

      <Icon className=" h-3 w-3 mr-1.5 group-hover:rotate-6 transition-transform duration-300" />
      <span>{Children}</span>

    </button>
  )
}

const PromptEnhancerApp = () => {
  const [originalPrompt, setOriginalPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  // model state 
  const [inputModalOpen, setInputModalOpen] = useState(false)
  const [resultModalopen, setResultModalOpen] = useState(false)


  // copy to clipboard functionalty 

  const copytoClipBoard = () => {
    if (!enhancedPrompt) return

    navigator.clipboard.writeText(enhancedPrompt)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('failed to copy : ', err)
      })
  }


  // open claude in new window 

  const openClaude = () => {
    try {

      window.open('https://claude.ai', '_blank');

    } catch (error) {

      console.error('error open in claude:', err)

    }
  }

  // open gpt in new window 

  const openChatGPT = () => {
    try {

      window.open("https://chat.openai.com", '_blank');

    } catch (err) {
      console.error("error opening chatgpt:", err)
    }
  }

  // enhance prompt sung api 

  const enhancePrompt = async () => {

    if (!originalPrompt.trim()) {
      setError("please enter prompt to enhance")
      return
    }
    if (originalPrompt.length > 5000) {
      setError("your prompt is too long . please keep it under 5000 character")
      return
    }
    setIsLoading(true)
    setError('')

    try {


      console.log ("sending request with data:" , {text:originalPrompt, format : "structured"});

      // add timeout handling 

      const controller = new AbortController()
      const timeoutId = setTimeout(()=> controller.abort(),28000);

    } catch (err) {
      console.error("error enhance prompt :", err)

      // handle specific erros case 

      if (err.name === "AbortError" || err.message?.includes('timeout')) {
        setError("request time out. please try with a shorter prompt or try again later")

      } else if (err.status === 413) {
        setError("your promptt is too long . please use shorter text.")
      }
      else if (err.status === 503) {
        setError("enhace service is temporarirty unavailable . please try again later")

      } else if (err.status === 429) {
        setError("too many request. please wait monet beofore try again")
      } else {
        setError("erorr enahcing prompt . please try again")
      }
      setEnhancedPrompt('')
    } finally {
      setIsLoading(false)
    }

  }


}

export default PromptEnhancerApp
