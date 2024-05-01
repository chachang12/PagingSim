import React, { useState, useEffect } from 'react';
import { plus, equal } from '../assets';
import styles from '../style';
import { calcValues, checkValue, calcSizes, converter } from '../scripts/Functions';
import { Context } from './Context';
import PageTableEntry from '../scripts/classes/PageTableEntry';


/**
 * Vas is a component that displays a virtual address space.
 */
const Vas = () => {
  const { vpn, setVpn, pfn, setPfn, offset, setOffset, VAL, setVAL, pte, setPte, pageSize, setPageSize, vasSize, setVasSize, pagesV, setPagesV } = React.useContext(Context);
  const [resetFLag, setFlag] = useState(0);


  // After the user calculates, once a value if changed, all other values are set to 0 so a new value can be calculated.
  function checkReset() {
    if (resetFLag == 1) {
      setVpn(0);
      setOffset(0);
      setVAL(0);
      setFlag(0);
    }
  }

  // Updates VPN value on change
  const handleVpnChange = (event) => {
    checkReset();
    // Check if input is valid
    let value = checkValue(event.target.value, vpn);
    setVpn(value);
    console.log('VPN:', value);
  };

  // Updates Offset value on change
  const handleOffsetChange = (event) => {
    checkReset();
    let value = checkValue(event.target.value, offset);
    setOffset(value);
    console.log('Offset:', value);
  };

  // Updates VAL value on change
  const handleVALChange = (event) => {
    checkReset();
    let value = checkValue(event.target.value, VAL);
    setVAL(value);
    console.log('VAL:', value);
  }

  // Handles what happens on button press
  const handleClick = () => {
    // If any value is an empty string, set it to 0
    setVpn(vpn == '' ? 0 : vpn);
    setOffset(offset == '' ? 0 : offset);
    setVAL(VAL == '' ? 0 : VAL);

    if (vpn > 30) {
      alert("You can't set your VPN above 30 bits.")
      return
    }

    // the set functions are delayed, so these new variables are used when the values are instantly needed
    const valResults = calcValues(vpn, offset, VAL);

    setVpn(valResults[0]);
    setOffset(valResults[1]);
    setVAL(valResults[2]);
    // setFlag(1);

    // Call function to set page number, size, and VAS size
    const sizeResults = calcSizes(valResults[0], valResults[1], valResults[2]);
    // Prevent the pages from generating past 14 bit vpns
    if (valResults[0] > 14) {
      alert("Your VPN is to high for this program to visual the pages. The max is 14 bit VPNs. However all other values are correct.")
    } else {
      setPagesV(Array(sizeResults[0]).fill(null));
    }
    let pageSize = converter(sizeResults[1]);
    setPageSize(pageSize);

    let VasSize = converter(sizeResults[2]);
    setVasSize(VasSize);
  };

  return (
    <div className='bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500 to-red-800 justify-center w-[925px] h-[400px] rounded-md'>
      <div className='flex items-center justify-between '>       
        <span className="text-[24px] font-PierSans-Light text-white ml-5 ">Virtual Address Space</span>
        {/*Added button, needs formatting later*/}
        <div className='py-3 px-5'>
          <button id="calculate" onClick={handleClick} className="bg-gradient-to-r from-darkdarkBlue to-darkRed hover:from-red-500 hover:to--red-500 rounded text-white font-PierSans-Light w-[200px] h-[45px] leading-tight ">Calculate</button>
        </div>
      </div>
      {/* Calculation Row */}
      <div className="flex items-center ml-5">
        {/* VPN */}
        <div>
          <label htmlFor="vpn" className="block text-sm font-PierSans-Regular text-white mb-2">VPN:</label>
          <input id="vpn" type="text" value={vpn} onChange={handleVpnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={plus} alt="plus" className={`${styles.arithmetic}`} />
        {/* Offset */}
        <div>
          <label htmlFor="offset" className="block text-sm font-PierSans-Regular text-white mb-2">Offset:</label>
          <input id="offset" type="text" value={offset} onChange={handleOffsetChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={equal} alt="equal" className={`${styles.arithmetic}`} />
        {/* VA Length */}
        <div>
          <label htmlFor="valength" className="block text-sm font-PierSans-Regular text-white mb-2">VA Length:</label>
          <input id="valength" type="text" value={VAL} onChange={handleVALChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>


      
  

      {/* Display the virtual address space */}
      <div className='ml-3 w-[850px] overflow-x-auto pt-5'>
        <div className='flex flex-nowrap'>
          {/* TODO: Currently just displaying a set number of pages, 
          arithmetic needs to be added to calculate number of pages based on above fields. 
          Also we need to generate fake addresses for each instead of just 1...n.*/}
          {pagesV.map((page, index) => (
            <div key={index} className="flex justify-center mt-5 w-[75px] h-[100px] bg-gradient-to-r from-darkdarkBlue to-darkRed font-PierSans-Regular text-white p-10 m-1  rounded-md">
              Page {index + 1}
            </div>
          ))}
        </div>
        </div>
        <div className="flex justify-center pt-10">
          {/*NEW TEMP DIV FOR PAGE SIZE AND VAS SIZE*/}
          <div className="flex items-center ml-5">
            {/* Label for Page size */}
            <label className="font-PierSans-Regular text-white" htmlFor="page-size">Page size: {pageSize} </label>
          </div>
          <div className="flex items-center ml-5">
            {/* Label for Virtual Address Space size */}
            <label className="font-PierSans-Regular text-white" htmlFor="vas-size">Virtual Address Space size: {vasSize} </label>
          </div>
        

      </div>

    </div>

  )
}

export default Vas