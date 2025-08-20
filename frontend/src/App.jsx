import { useState } from 'react'
import React from 'react';
import AppLayout from './components/AppLayout';
import MobileLayout from './components/MobileLayout';

const App = () => {

  return ( 
    <div>
      <AppLayout/>  
      <MobileLayout/>
    </div>
  ) 

}


export default App