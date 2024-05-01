import React, { useState } from 'react';
import PageTableEntry from '../scripts/classes/PageTableEntry';
import styles from '../style';
import {checkValue, calcPTSizeAndPTE, calcFromPTE, calcSizes, converter} from '../scripts/Functions';
import { Context } from '../components/Context';

const PageTable = () => {
  const { vpn, setVpn, pfn, setPfn, offset, setOffset, VAL, setVAL, PAL, setPAL, pte, setPte, pageTable, setPageTable, Size, setSize, setPagesV, setPageSize, setVasSize, setPagesP, setFrameSize, setPasSize} = React.useContext(Context);
  const [percentTrue, setPercentTrue] = useState(50); // Initial percentage

  // Initialize the pageTable array with 10 PageTableEntry objects 
  // Changed the VPN and PFN to be in binary, TODO, have all binary numbers be the same length
  // const [pageTable, setPageTable] = useState(Array(10).fill().map((_, i) => new PageTableEntry(i, i, true)));

  const handleClick = () => {
    // I need to set up logic to determine which path is taken
    if (pte !=0) {
      let results = calcFromPTE(VAL, PAL, pte)
      // VAS stuff
      setVpn(results[0]);
      setOffset(results[1]);
      const vasSizeResults = calcSizes(results[0], results[1], VAL);
      // Prevent the pages from generating past 14 bit vpns
      if (results[0] > 14) {
        alert("Your VPN was to high for this program to visual the pages. The max is 14 bit VPNs. However all other values are correct.")
      } else {
        setPagesV(Array(vasSizeResults[0]).fill(null));
      }
      let pageSize = converter(vasSizeResults[1]);
      setPageSize(pageSize);
      let VasSize = converter(vasSizeResults[2]);
      setVasSize(VasSize);

      // PAS stuff
      setPfn(results[2]);
      const pasSizeResults = calcSizes(results[2], results[1], PAL)
      // Prevent the pages from generating past 14 bit pfns
      if (results[2] > 14) {
        alert("Your PFN was to high for this program to visual the page frames. The max is 14 bit PFNs. However all other values are correct.")
      } else {
        setPagesP(Array(pasSizeResults[0]).fill(null))
      }
      let frameSize = converter(pasSizeResults[1]);
      setFrameSize(frameSize);
      let PasSize = converter(pasSizeResults[2]);
      setPasSize(PasSize);
      
      // PT stuff
      setSize(converter(results[3]));

    } else {
      let results = calcPTSizeAndPTE(vpn, pfn);
      setSize(converter(results[0]));
      if (results[0] > 4096) {
        alert("This program cannot visualize more then 4092 PTEs, but non-visualized values will still be calculated")
      } else {
        setPageTable(Array(results[0]).fill(null).map((_, i) => new PageTableEntry(i, i, true)));
      }
      setPte(results[1]);
    }
  }

  const handlePteChange = (event) => {
    let value = checkValue(event.target.value, pte);
    setPte(value);
    // Sets the PTEs to be the same as the PTE number
    if (value > 4096) {
      alert("This program cannot visualize more then 4092 PTEs, but non-visualized values will still be calculated")
    } else {
      setPageTable(Array(value).fill(null).map((_, i) => new PageTableEntry(i, i, true)));
    }
  }

  return (
    <div className='bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500 to-red-800 rounded-md flex flex-col items-start p-4 w-[475px] h-[840px]'>
      <div className='flex items-center justify-between w-[425px]'>       
        <span className="text-[24px] font-PierSans-Light text-white pl-5">Page Table</span>
        {/*Added button, needs formatting later*/}
        <div className='py-3 px-5'>
          <button id="calculate" onClick={handleClick} className="bg-gradient-to-r from-darkdarkBlue to-darkRed hover:from-red-500 hover:to--red-500 rounded text-white font-PierSans-Light w-[150px] h-[45px] leading-tight">Calculate</button>
        </div>
      </div>
      {/* PT Size */}
      <div className="flex items-center mb-2">
        {/* I dont think size should be an input field */}
        <label htmlFor="size" className="mr-2 font-PierSans-Regular text-white">PT Size: {Size}</label>
        
      </div>
      {/* PTE */}
      <div className="flex items-center mb-3 pt-3">
        <label htmlFor="pte" className="mr-2 font-PierSans-Regular text-white">PTE Number:</label>
        <input id="pte" type="text" value={pte} onChange={handlePteChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>



      {/* Display the page table */}
      <div className="h-[800px] overflow-auto">
        {/* Labels */}
        <div className="ml-5 mr-5 flex justify-between font-bold mb-2 px-2 font-PierSans-Light text-white">
          <div>VPN</div>
          <div>PFN</div>
          <div>Valid Bit</div>
        </div>
        {pageTable.map((pte, index) => (
          <div key={index} className="bg-gradient-to-r from-darkdarkBlue to-darkRed flex justify-between w-full h-[50px] font-PierSans-Light text-white items-center mb-3 rounded-md p-2">
            <div className='flex'> 
              <div className={`${styles.ptevalue}`}>{pte.vpn}</div> 
              <div className='flex pl-10'>
                <div className={`${styles.ptevalue}`}>{pte.pfn}</div>
                <div className={`${styles.ptevalue}`}>{pte.validBit ? 'Yes' : 'No'}</div>
              </div>
            </div>
            
            
          </div>
          
        ))}
      </div>

    </div>
  )
}

export default PageTable