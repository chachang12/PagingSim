// import { useState } from "react";
import { reset, jclogo, info } from '../assets';
// import { Context } from '../components/Context';

import React, { useState } from 'react';
// import { reset, jclogo } from '../assets';
import { Context } from './Context';


const NavigationBar = () => {
    const { vpn, setVpn, pfn, setPfn, offset, setOffset, PAL, setPAL, VAL, setVAL, pte, setPte, pageTable, setPageTable, Size, setSize, frameSize, setFrameSize, pasSize, setPasSize, pagesP, setPagesP, pageSize, setPageSize, vasSize, setVasSize, pagesV, setPagesV} = React.useContext(Context);

    const message = "HOW THIS THING WORKS: For VAS and PAS, when you hit calculate, if PAL/VAL is 0, it will calculate it. If pfn/vpn is 0, it will calculate it. If offset is 0 it will calculate it. If both offset and vpn/pfn are 0, pfn/vpn will get set to VAL/PAL. If all values are not 0, it will calculate a new VAL/PAL For PT if PTE is not 0, it will use that to calculate values, including overwriting VAS/PAS values to  fit the PTE. If the PTE is 0 it will use the info from VAS and PAS to find the values for the PT."


    const handleResetClick = () => {
        setVpn('0');
        setPfn('0');
        setOffset('0');
        setVAL('0');
        setPAL('0');
        setPte('0');
        setPageTable('0');
        setSize('0');
        setFrameSize('0');
        setPasSize('0');
        setPagesP('0');
        setPageSize('0');
        setVasSize('0');
        setPagesV('0');
        console.log("Reset button clicked");
    }

    const handleInfoClick = () => {
        alert(message);
    }

    return (
        <nav className="h-[75px] flex justify-between py-6 px-1 items-center">
            <span className="text-[35px] font-PierSans-Regular text-white">PAGING SIMULATOR</span>
                <div className='flex'>
                    <div className='flex '>
                        <button onClick={handleResetClick} className="bg-red-500 w-[55px] h-[55px] flex justify-center items-center rounded-[10px] mr-2">
                            <img src={reset} alt="reset" className="w-[35px] h-[35px]"/>
                        </button>
                        {/* THIS IS THE BUTTON I MADE TO SHOW INFO ABOUT HOW THIS THING WORKS, TWEEK MESSAGE AND BUTTON STYLE */}
                        <button onClick={handleInfoClick} className="bg-red-500 w-[55px] h-[55px] flex justify-center items-center rounded-[10px] mr-2">
                            <img src={info} alt="info" className="w-[35px] h-[35px]"/>
                        </button>
                    </div>
                    
                </div>
        </nav>
    )
}

export default NavigationBar;