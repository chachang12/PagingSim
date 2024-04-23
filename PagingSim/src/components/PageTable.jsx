import React, { useState } from 'react';
import PageTableEntry from '../scripts/classes/PageTableEntry';
import styles from '../style';

const PageTable = () => {

  // Initialize the pageTable array with 10 PageTableEntry objects
  // Changed the VPN and PFN to be in binary
  const [pageTable, setPageTable] = useState(Array(10).fill().map((_, i) => new PageTableEntry(i.toString(2), i.toString(2), true)));
  
  return (
    <div className='bg-seafoam rounded-lg flex flex-col items-start p-4'>
      <span className="text-[24px] font-inter mb-4">Page Table</span>
      {/* Size */}
      <div className="flex items-center mb-2">
        <label htmlFor="size" className="mr-2">Size:</label>
        <input id="size" type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* PTE */}
      <div className="flex items-center mb-3">
        <label htmlFor="pte" className="mr-2">PTE:</label>
        <input id="pte" type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      {/* Display the page table */}
      <div className="h-[520px] overflow-auto">
        {/* Labels */}
        <div className="ml-5 mr-5 flex justify-between font-bold mb-2 px-2">
          <div>VPN</div>
          <div>PFN</div>
          <div>Valid Bit</div>
        </div>
        {pageTable.map((pte, index) => (
          <div key={index} className="bg-teal flex justify-between w-full h-[50px] items-center mb-3 rounded-lg p-2">
            <div className={`${styles.ptevalue}`}>{pte.vpn}</div> 
            <div className={`${styles.ptevalue}`}>{pte.pfn}</div>
            <div className={`${styles.ptevalue}`}>{pte.validBit ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PageTable