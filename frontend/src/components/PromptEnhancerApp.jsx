import React, { useState } from 'react';
import { Sparkles, ExternalLink, Copy, Check, Maximize2 } from 'lucide-react';


const MaximizeButton = ({ onClick, size = 'sm', label = 'Maximize', className = '' }) => {
    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    return (
        <button
            onClick={onClick}
            className={`maximize-btn p-1 rounded-md transition-all duration-300 
                bg-gray-200 dark:bg-gray-700 
                text-gray-700 dark:text-gray-300 
                hover:bg-indigo-500 hover:text-white 
                hover:shadow-md active:shadow-inner group ${className}`}
            aria-label={label}
            title={label}
        >
            <Maximize2
                className={`${sizeClasses[size]} transform transition-transform duration-300 group-hover:rotate-90`}
            />
        </button>
    );
};

const ProviderButton = ({ onClick, icon: Icon, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`provider-btn action-btn text-xs flex items-center px-1.5 py-0.5 rounded transition-all duration-300 
                bg-gradient-to-r from-blue-600 to-indigo-800 text-white 
                hover:from-blue-700 hover:to-indigo-900 
                hover:scale-105 active:scale-95 group ${className}`}
        >
            <Icon className="h-3 w-3 mr-1.5 group-hover:rotate-6 transition-transform duration-300" />
            <span>{children}</span>
        </button>
    );
};

const PromptEnhancerApp = () => {
    const [originalPrompt, setOriginalPrompt] = useState('');
    const [enhancedPrompt, setEnhancedPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    // Modal states
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [resultModalOpen, setResultModalOpen] = useState(false);

    // Copy to clipboard functionality
    const copyToClipboard = () => {
        if (!enhancedPrompt) return;

        navigator.clipboard.writeText(enhancedPrompt)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    // Open Claude in new window
    const openClaude = () => {
        try {
            window.open('https://claude.ai', '_blank');
        } catch (err) {
            console.error('Error opening Claude:', err);
        }
    };

    // Open ChatGPT in new window
    const openChatGPT = () => {
        try {
            window.open('https://chat.openai.com', '_blank');
        } catch (err) {
            console.error('Error opening ChatGPT:', err);
        }
    };

    // Enhance the prompt using the API
    const enhancePrompt = async () => {
        if (!originalPrompt.trim()) {
            setError('Please enter a prompt to enhance');
            return;
        }

        if (originalPrompt.length > 5000) {
            setError('Your prompt is too long. Please keep it under 5000 characters for better performance.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            console.log('Sending request with data:', { text: originalPrompt, format: 'structured' });

            // Add timeout handling
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 28000); // 28 second timeout

            // Call the API to enhance the prompt with timeout
            const response = await apiService.enhancePrompt({
                text: originalPrompt,
                format: 'structured'
            }, controller.signal);

            clearTimeout(timeoutId);

            console.log('API Response:', response);

            // Safely extract data from the response
            if (response && typeof response.enhancedText === 'string') {
                // Decode any HTML entities before setting the state
                let decodedText = response.enhancedText
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")
                    .replace(/&apos;/g, "'")
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&');

                setEnhancedPrompt(decodedText);
            } else {
                console.error('Unexpected API response format:', response);
                setEnhancedPrompt('API returned an unexpected response format.');
                setError('Received an unexpected response from the server.');
            }
        } catch (err) {
            console.error('Error enhancing prompt:', err);

            // Handle specific error cases
            if (err.name === 'AbortError' || err.message?.includes('timeout')) {
                setError('Request timed out. Please try with a shorter prompt or try again later.');
            } else if (err.status === 413) {
                setError('Your prompt is too long. Please use a shorter text.');
            } else if (err.status === 503) {
                setError('Enhancement service is temporarily unavailable. Please try again later.');
            } else if (err.status === 429) {
                setError('Too many requests. Please wait a moment before trying again.');
            } else {
                setError('Error enhancing prompt. Please try again.');
            }

            setEnhancedPrompt('');
        } finally {
            setIsLoading(false);
        }
    };

    // Render the enhanced prompt result
    const renderEnhancedPrompt = () => {
        if (!enhancedPrompt) {
            return (
                <div className="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <p className="text-center px-4">
                        Enhanced prompt will appear here after clicking the "Enhance Prompt" button
                    </p>
                </div>
            );
        }

        return enhancedPrompt;
    };


    return (

      <div className='flex justify-center items-start bg-white dark::bg-gray-950 p-2 pt-4'>
        <div className='w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden'>

          {/* header */}

          <div className='bg-gradient-to-r from-blue-600 to-indigo-800 px-4 sm:px-6 py-2 sm:py-3 relative'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl sm:text-2xl font-bold text-white'>  AI prompt ENhacer </h1>
              <Sparkles  className=' text-yellow-300 h-5 w-5 sm:h-6 sm:w-6'/>
            </div>
            <h2 className=''> Transform basic prompt into optimized instructions for better AI response</h2>
          </div>

          {/* Main content */}

          <div className='p-2 sm:p-4 flex flex-col'>
            {/* originalPrompt */}
            <div className='mb-2'>
              <div className='flex items-center justify-between mb-1'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Orignal Prompt</label>
                <MaximizeButton  onClick={()=> setInputModalOpen(true)} 
                  label='Maximize input'/>
              </div>
              <textarea 
              value={originalPrompt}
              onChange={(e)=> setOriginalPrompt (e.target.value)}
              className='w-full h-[70px] sm:h-[80px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-600 focus:border-gray-500 dark:focus:border-gray-600
              resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm'
              placeholder='write a blog post about AI -> Detailes , structured guidance for creating an engaging article'/>
            </div>

            {/* ENhace Button */}

            <div className=' flex justify-center mb-2'>
              <button 
              onClick={enhancePrompt}
              disabled={isLoading}
              className='px-3 sm:px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm
              hover:scale-105 active:scale-95 group'>

                {isLoading ? (

                  <>
                  <svg className='animate-spin -ml-1 mr-2 h-3 w-3 text-white'
                  xmlns='http://www.w3.org/2000/svg' fill='none' viewBox=' 0 0 24 24 '>
                    <circle className='opacity-20' cx="12" cy="12"  r= "10" stroke='currentColor' strokeWidth="4" />
                    <path className='opacity-74' fill='currentColor' d = 'M4 12a8 8 0 018-8v0c5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'/>
                  </svg>
                  Enhancing...
                  </>

                ): (
                  <>
                  <Sparkles  className='mr-1.5 h-3 w-3 sm:h-4 sm:w-4 group-hover:rotate-6 transition-transform duration-300' />
                  Enhance Prompt 
                  </>
                )}
              </button>
            </div>

            {/* ///////////////////////////////////////// */}

          </div>

        </div>

      </div>

    )


  }