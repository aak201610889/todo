import React, { useEffect } from 'react'
import './alert.css'
function Alert({ type, msg, removeAlert,list }) {

  useEffect(() => {
    const timer = setTimeout(() => { 
      removeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, [list])
  
  return <p className={type}>{msg}</p>;
}

export default Alert