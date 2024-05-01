import { reset, jclogo, info } from '../assets';
import React, { useState } from 'react';
import { Context } from './Context';
import PageTableEntry from '../scripts/classes/PageTableEntry';


const NavigationBar = () => {
    const { vpn, setVpn, pfn, setPfn, offset, setOffset, PAL, setPAL, VAL, setVAL, pte, setPte, pageTable, setPageTable, Size, setSize, frameSize, setFrameSize, pasSize, setPasSize, pagesP, setPagesP, pageSize, setPageSize, vasSize, setVasSize, pagesV, setPagesV} = React.useContext(Context);

    const message = "Users of this project will need to have an understand of the parts needed for calculations, meaning that setting random values and hitting calculate will probably exhibit unintentional behavior.\nHere are how calculations are performed: \nVAS and PAS calculations: \n1. If VAL/PAL are set to 0, it will attempt to calculate them first. \n2. If VPN/PFN are set to 0, it will attempt to calculate the Offset. \n3. If all values for the VAS/PAS are not 0, a new VAL/PAL will be calculated based on the VPN/PFN and Offset. \nPTE calculations: \n1. In order to calculate VAS and PAS values based on the PTE, you need to set the VAL, PAL, and PTE. \n2. If the PTE is not 0, new VAS and PAS values will be calculated based on the VAL, PAL, and PTE. \n3. In order to calculate the PTE number, you need to have the VAS and PAS values set and the PTE set to 0.";

    const handleResetClick = () => {
        setVpn('0');
        setPfn('0');
        setOffset('0');
        setVAL('0');
        setPAL('0');
        setPte('0');
        setPageTable(Array(1).fill(null).map((_, i) => new PageTableEntry(i, i, true)));
        setSize('0');
        setFrameSize('0');
        setPasSize('0');
        setPagesP(Array(1).fill(null));
        setPageSize('0');
        setVasSize('0');
        setPagesV(Array(1).fill(null));
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