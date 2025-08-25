import React, { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import ApiInsightsTooltip from './ApiInsightsTooltip'

const ApiInsightsBanner = () => {


  const [showTooltip,setShowTooltip] = useState(false);
  const timeoutRef = useRef(null)
  const containerRef = useRef(null);

  // longer dealy b4 hide tooltip

  const HOVER_DELAY = 1000;

  const handleMouseEnter  = () => {
    if (timeoutRef.current) clearTimeout (timeoutRef.current)
      setShowTooltip(true)
  };

  const handleMouseLeave = (e) =>{
    // check we leadine entri containerRef
    const relatedTarget = e.relatedTarget;
    const isSafeNode = relatedTarget instanceof Node;

    if (containerRef.current && (!isSafeNode || !containerRef.current.contains (relatedTarget))){
      timeoutRef.current = setTimeout (()=>{
        setShowTooltip(false);
      }, HOVER_DELAY)
    }
  };







  return (
    <div
      ref={containerRef }
      className='hover-card relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div className='hover-card_top rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-400 overflow-hidden'>
        <a href='https://apiinsights.io/reports/f0761065-71b2-4f1a-8313-e287c9623dc3'
          target='_blank'
          rel='noopener noreferrer'
          className=' inline-flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 transition-colors whitespace-nowrap px-3 py-1.5'
        >
          <div className='flex items-center'>
            <img src='/api-insights.svg'
              alt='API INSIGHTS'
              className='w-6 mr-1'>
            </img>
            <span className='text-blue-800 dark:text-blue-400 font-bold'> insights.io
            </span>
          </div>
          <span className='text-blue-800 dark:text-blue-300 text-[10px] font-bold'>
            Check API Governance Report
          </span>
          <ExternalLink  className='h-2 w-3 text-gray-600 dark:text-gray-400 flex-shrink-0'></ExternalLink>
        </a>
      </div>

      {/* animated border effect */}
      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600 bg-[length:200%_100%] animate-[gradient_3s_ease_in-out_infinite] z-10'>
        
      </div>

      {/* tooltip expand content */}
      <ApiInsightsTooltip
      visible={showTooltip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>

      </ApiInsightsTooltip>

    </div>
  )
}

export default ApiInsightsBanner
