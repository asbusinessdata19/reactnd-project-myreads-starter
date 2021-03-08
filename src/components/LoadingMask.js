import React from 'react';
import loadingLogo from '../images/loading.gif';

function LoadingMask() {
    return (<div style={{top:window.scrollY}} className='mask'>
        <img alt='loading' style={{width:150, height:150}} src={loadingLogo}/>
    </div>)
}

export default LoadingMask;