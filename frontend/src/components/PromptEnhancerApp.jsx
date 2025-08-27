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

        </div>

      </div>

    )


  }