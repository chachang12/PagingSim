import React, { useState, useEffect} from 'react';
import { plus, equal } from '../assets';
import styles from '../style';
import {handleInputValues, vpnChange} from '../scripts/testnumbers';

/**
 * Vas is a component that displays a virtual address space.
 */
const Vas = () => {

  // Create an array of 10 elements to represent the pages in the virtual address space
  const [pages, setPages] = useState(Array(30).fill(null));
  const [vpn, setVpn] = useState('');
  const [offset, setOffset] = useState('');
  const [VAL, setVAL] = useState('');

  // All three functions are updating the graphics with user input
  // and passing them to another function 


  const handleVpnChange = (event) => {
    console.log("test:",event.target.value);
    const [x, y, z] = vpnChange(event.target.value, offset, VAL);

    setVpn(x);
    setOffset(y);
    setVAL(z);

    console.log('VPN:', vpn);
    console.log('Offset:', offset);
    console.log('VAL:', VAL);
  };
  // const handleVpnChange = (event) => {
  //   setVpn(event.target.value);
  //   console.log('VPN:', vpn);
  //   console.log('Offset:', offset);
  //   console.log('VAL:', VAL);
  // };

  
  const handleOffsetChange = (event) => {
    setOffset(event.target.value);
    console.log('VPN:', vpn);
    console.log('Offset:', offset);
    console.log('VAL:', VAL)
    // handleInputValues(vpn, event.target.value, VAL);
  };

  const handleVALChange = (event) => {
    setVAL(event.target.value)
    setOffset(event.target.value);
    console.log('VPN:', vpn);
    console.log('Offset:', offset);
    console.log('VAL:', VAL)
    // handleInputValues(vpn, offset, event.target.value)
  }
  

  return (
    <div className='bg-seafoam w-[850] h-[400] rounded-lg'>
      {/* Display the title */}
      <span className="text-[24px] font-inter ml-5">Virtual Address Space</span>
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

      {/* Display the virtual address space */}
      <div className='ml-3 w-[850px] overflow-x-auto'>
        <div className='flex flex-nowrap'>
          {/* TODO: Currently just displaying a set number of pages, 
          arithmetic needs to be added to calculate number of pages based on above fields. 
          Also we need to generate fake addresses for each instead of just 1...n.*/}
          {pages.map((page, index) => (
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