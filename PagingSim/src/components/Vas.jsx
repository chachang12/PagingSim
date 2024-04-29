import React, { useState, useEffect } from 'react';
import { plus, equal } from '../assets';
import styles from '../style';
import { calcValues, checkValue, calcSizes, converter } from '../scripts/Functions';
// import { pfn, pfsetPfnn } from './Pas';
import { Context } from './Context';
import PageTableEntry from '../scripts/classes/PageTableEntry';


/**
 * Vas is a component that displays a virtual address space.
 */
const Vas = () => {
  const { vpn, setVpn, pfn, setPfn, offset, setOffset, VAL, setVAL, pte, setPte, pageSize, setPageSize, vasSize, setVasSize, pagesV, setPagesV } = React.useContext(Context);
  // Create an array of 10 elements to represent the pages in the virtual address space
  // const [pages, setPages] = useState(Array(30).fill(null));
  // Flag to indicate if values need to be reset or not
  const [resetFLag, setFlag] = useState(0);
  // Values for Page size and VAS size
  // const [pageSize, setPageSize] = useState(0);
  // const [vasSize, setVasSize] = useState(0);

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

    // Function should stop and alert user if all three values are not 0
    // if (vpn != 0 && offset != 0 && VAL != 0) {
    //   alert("At leat one value must be 0.")
    //   return;
    // }

    // the set functions are delayed, so these new variables are used when the values are instantly needed
    // const { vpn: newVpn, offset: newOffset, VAL: newVAL } = calcValues(vpn, offset, VAL);
    const valResults = calcValues(vpn, offset, VAL);

    setVpn(valResults[0]);
    setOffset(valResults[1]);
    setVAL(valResults[2]);
    // setFlag(1);

    // Call function to set page number, size, and VAS size
    const sizeResults = calcSizes(valResults[0], valResults[1], valResults[2]);
    setPagesV(Array(sizeResults[0]).fill(null));
    let pageSize = converter(sizeResults[1]);
    setPageSize(pageSize);

    let VasSize = converter(sizeResults[2]);
    setVasSize(VasSize);
  };

  return (
    <div className='bg-seafoam w-[850] h-[400] rounded-lg'>
      {/* Display the title */}
      <span className="text-[24px] font-inter ml-5">Virtual Address Space</span>
      {/*Added button, needs formatting later*/}
      <button id="calculate" onClick={handleClick} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Calculate</button>

      {/* Calculation Row */}
      <div className="flex items-center ml-5">
        {/* VPN */}
        <div>
          <label htmlFor="vpn" className="block text-sm font-bold mb-2">VPN:</label>
          <input id="vpn" type="text" value={vpn} onChange={handleVpnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={plus} alt="plus" className={`${styles.arithmetic}`} />
        {/* Offset */}
        <div>
          <label htmlFor="offset" className="block text-sm font-bold mb-2">Offset:</label>
          <input id="offset" type="text" value={offset} onChange={handleOffsetChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={equal} alt="equal" className={`${styles.arithmetic}`} />
        {/* VA Length */}
        <div>
          <label htmlFor="valength" className="block text-sm font-bold mb-2">VA Length:</label>
          <input id="valength" type="text" value={VAL} onChange={handleVALChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>


      {/*NEW TEMP DIV FOR PAGE SIZE AND VAS SIZE*/}
      <div className="flex items-center ml-5">
        {/* Label for Page size */}
        <label htmlFor="page-size">Page size: {pageSize} </label>
      </div>
      <div className="flex items-center ml-5">
        {/* Label for Virtual Address Space size */}
        <label htmlFor="vas-size">Virtual Address Space size: {vasSize} </label>
      </div>
  

      {/* Display the virtual address space */}
      <div className='ml-3 w-[850px] overflow-x-auto'>
        <div className='flex flex-nowrap'>
          {/* TODO: Currently just displaying a set number of pages, 
          arithmetic needs to be added to calculate number of pages based on above fields. 
          Also we need to generate fake addresses for each instead of just 1...n.*/}
          {pagesV.map((page, index) => (
            <div key={index} className="mt-5 bg-teal p-2 m-2 h-[200px] rounded-[10px]">
              Page {index + 1}
            </div>
          ))}
        </div>
      </div>

    </div>

  )
}

export default Vas