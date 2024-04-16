import { useState } from "react";
import { reset, jclogo } from '../assets';

const NavigationBar = () => {
    const handleResetClick = () => {
        // TODO: Reset the paging simulation, keep the log though.
        console.log("Reset button clicked");
    }
    return (
        <nav className="h-[75px] flex flex-row justify-between py-6 px-10 items-center bg-seafoam rounded-[10px]">
            <span className="text-[50px] font-inter">Paging Simulation</span>
            <button onClick={handleResetClick} className="bg-gold w-[55px] h-[55px] flex justify-center items-center rounded-[10px]">
                <img src={reset} alt="reset" className="w-[35px] h-[35px]"/>
            </button>
        </nav>
    )
}

export default NavigationBar;