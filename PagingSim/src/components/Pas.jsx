import React, { useState } from 'react';
import { plus, equal } from '../assets';
import styles from '../style';
import { calcValues, checkValue, calcSizes, converter } from '../scripts/Functions';
import { Context } from './Context';

const Pas = () => {

  const { vpn, setVpn, pfn, setPfn, offset, setOffset, PAL, setPAL, frameSize, setFrameSize, pasSize, setPasSize, pagesP, setPagesP } = React.useContext(Context);   // Include new vars and set funcitons here
  // Flag to indicate if values need to be reset or not
  const [resetPFLag, setPFlag] = useState(0);

  // After the user calculates, once a value if changed, all other values are set to 0 so a new value can be calculated.
  function checkReset() {
    if (resetPFLag == 1) {
      setPfn(0);
      setOffset(0);
      setPAL(0);
      setPFlag(0);
    }
  }

  // Updates PFN value on change
  const handlePfnChange = (event) => {
    checkReset();
    // Check if input is valid
    let value = checkValue(event.target.value, pfn, 0);
    setPfn(value);
    console.log('PFN:', value);

  };

  // Updates Offset value on change
  const handleOffsetChange = (event) => {
    checkReset();
    let value = checkValue(event.target.value, offset, 1);
    setOffset(value);
    console.log('Offset:', value);
  };

  // Updates PAL value on change
  const handlePALChange = (event) => {
    checkReset();
    let value = checkValue(event.target.value, PAL, 1);
    setPAL(value);
    console.log('PAL:', value);
  }

  // Handles what happens on button press
  const handleClick = () => {
    // If any value is an empty string, set it to 0
    setPfn(pfn == '' ? 0 : pfn);
    setOffset(offset == '' ? 0 : offset);
    setPAL(PAL == '' ? 0 : PAL);


    // Function should stop and alert user if all three values are not 0
    // if (pfn != 0 && offset != 0 && PAL != 0) {
    //   alert("At leat one value must be 0.")
    //   return;
    // }
    // the set functions are delayed, so these new variables are used when the values are instantly needed
    const valResults = calcValues(pfn, offset, PAL);
    setPfn(valResults[0]);
    setOffset(valResults[1]);
    setPAL(valResults[2]);
    // setPFlag(1);

    const sizeResults = calcSizes(valResults[0], valResults[1], valResults[2]);
    setPagesP(Array(sizeResults[0]).fill(null));
    let pageFrame = converter(sizeResults[1]);
    setFrameSize(pageFrame);
    let PasSize = converter(sizeResults[2]);
    setPasSize(PasSize);
  };

  return (
    <div className='bg-seafoam w-[850] h-[400] rounded-lg'>
      {/* Display the title */}
      <span className="text-[24px] font-inter ml-5">Physical Address Space</span>
      {/*Added button, needs formatting later*/}
      <button id="calculate" onClick={handleClick} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Calculate</button>

      {/* Calculation Row */}
      <div className="flex items-center ml-5">
        {/* PFN */}
        <div>
          <label htmlFor="pfn" className="block text-sm font-bold mb-2">PFN:</label>
          <input id="pfn" type="text" value={pfn} onChange={handlePfnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
          <label htmlFor="palength" className="block text-sm font-bold mb-2">PA Length:</label>
          <input id="palength" type="text" value={PAL} onChange={handlePALChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>

      {/*NEW TEMP DIV FOR PAGE SIZE AND VAS SIZE*/}
      <div className="flex items-center ml-5">
        {/* Label for Page size */}
        <label htmlFor="page-size">Page frame size (bytes): {frameSize} </label>
      </div>
      <div className="flex items-center ml-5">
        {/* Label for Virtual Address Space size */}
        <label htmlFor="vas-size">Physical Address Space size (bytes): {pasSize} </label>
      </div>

      {/* Display the virtual address space */}
      <div className='flex flex-row ml-5 w-[850px] overflow-x-auto'>
        {/* TODO: Currently just displaying a set number of pages, 
          arithmetic needs to be added to caluclate number of pages based on above fields. 
          Also we need to generate fake addresses for each instead of just 1...n.*/}
        {pagesP.map((page, index) => (

          <div key={index} className="mt-5 w-[75px] bg-teal p-2 m-2 h-[200px] rounded-[10px]">
            Page Frame {index + 1}
          </div>
        ))}
      </div>

    </div>

  )
}

export default Pas