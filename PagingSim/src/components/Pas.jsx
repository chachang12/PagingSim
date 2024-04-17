import React, { useState } from 'react';
import { plus, equal } from '../assets';
import styles from '../style';

const Pas = () => {
  // Create an array of 10 elements to represent the pages in the virtual address space
  const [pages, setPages] = useState(Array(20).fill(null));


  return (
    <div className='bg-seafoam w-[850] h-[400] rounded-lg'>
      {/* Display the title */}
      <span className="text-[24px] font-inter ml-5">Physical Address Space</span>
      {/* Calculation Row */} 
      <div className="flex items-center ml-5">
        {/* PFN */}
        <div>
          <label htmlFor="pfn" className="block text-sm font-bold mb-2">PFN:</label>
          <input id="pfn" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={plus} alt="plus" className={`${styles.arithmetic}`} />
        {/* Offset */}
        <div>
          <label htmlFor="offset" className="block text-sm font-bold mb-2">Offset:</label>
          <input id="offset" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <img src={equal} alt="equal" className={`${styles.arithmetic}`} />
        {/* VA Length */}
        <div>
          <label htmlFor="palength" className="block text-sm font-bold mb-2">PA Length:</label>
          <input id="palength" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>

      {/* Display the virtual address space */}
        <div className='flex flex-row ml-5 w-[850px] overflow-x-auto'>
          {/* TODO: Currently just displaying a set number of pages, 
          arithmetic needs to be added to caluclate number of pages based on above fields. 
          Also we need to generate fake addresses for each instead of just 1...n.*/}
          {pages.map((page, index) => (
            
            <div key={index} className="mt-5 w-[75px] bg-teal p-2 m-2 h-[200px] rounded-[10px]">
              Page Frame {index + 1}
            </div>
          ))}
        </div>

    </div>

  )
}

export default Pas