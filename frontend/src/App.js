import { useEffect, useState } from 'react'
import React from 'react';
import AppLayout from './components/AppLayout';
import MobileLayout from './components/MobileLayout';
import authService from './services/authService';
import { Layout } from 'lucide-react';
import './index.css'
import PromptEnhancerApp from './components/PromptEnhancerApp'


function App () {
  const [isMobile,setIsMobile] = useState (false);

  // authentication

  useEffect (()=>{
    const initAuth = async () => {
      try {
        await authService.initializeAuth()
      } catch (error){
        console.error('auth intillize failed',error)
      }
    };

    initAuth();

    // func to check scrren size 
    const checkScreenSize = () => {
      setIsMobile (window.innerWidth <= 768)
    }
    checkScreenSize();

    // add event listenr 
    window.addEventListener('resize',checkScreenSize);

    // clean event listenr
    return () => window.removeEventListener('resize',checkScreenSize)
  },[])

  // choose layout based on scrren size 
  const layout = isMobile ? MobileLayout : AppLayout;

  return (
    <Layout>
      <PromptEnhancerApp/>
    </Layout>
  )
}


export default App