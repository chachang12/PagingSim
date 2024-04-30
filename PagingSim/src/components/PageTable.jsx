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
      setPagesV(Array(vasSizeResults[0]).fill(null));
      let pageSize = converter(vasSizeResults[1]);
      setPageSize(pageSize);
      let VasSize = converter(vasSizeResults[2]);
      setVasSize(VasSize);

      // PAS stuff
      setPfn(results[2]);
      const pasSizeResults = calcSizes(results[2], results[1], PAL)
      setPagesP(Array(pasSizeResults[0]).fill(null))
      let frameSize = converter(pasSizeResults[1]);
      setFrameSize(frameSize);
      let PasSize = converter(pasSizeResults[2]);
      setPasSize(PasSize);
      
      // PT stuff
      setSize(results[3]);

    } else {
      let results = calcPTSizeAndPTE(vpn, pfn);
      setSize(results[0]);
      setPageTable(Array(results[0]).fill(null).map((_, i) => new PageTableEntry(i, i, true)));
      setPte(results[1]);
    }
  }

  const handlePteChange = (event) => {
    let value = checkValue(event.target.value, pte, 2);
    setPte(value);
    // Sets the PTEs to be the same as the PTE number
    setPageTable(Array(value).fill(null).map((_, i) => new PageTableEntry(i, i, true)));
  }
  // THIS FUNCTION NEEDS TO BE DELETED AS SIZA SHOULD NOT BE AN INPUT
  const handleSizeChange = (event) => {
    let value = checkValue(event.target.value, pte, 1);
    setSize(value);
  }

  // TESTING STUFF
  const setRandomPageTable = () => {
    const newPageTable = pageTable.map(entry => Math.random() < percentTrue / 100);
    setPageTable(newPageTable);
  };

  const handleSliderChange = (e) => {
    setPercentTrue(parseInt(e.target.value));
  }

  // END OF TESTING
  return (
    <div className='bg-seafoam rounded-lg flex flex-col items-start p-4'>
      <span className="text-[24px] font-inter mb-4">Page Table</span>
      {/*button needs styling */}
      <button id="calculate" onClick={handleClick} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Calculate</button>
      {/* PT Size */}
      <div className="flex items-center mb-2">
        {/* I dont think size should be an input field */}
        <label htmlFor="size" className="mr-2">PT Size btyes:</label>
        <input id="size" type="text" value={Size} onChange={handleSizeChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* PTE */}
      <div className="flex items-center mb-3">
        <label htmlFor="pte" className="mr-2">PTE Number:</label>
        <input id="pte" type="text" value={pte} onChange={handlePteChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      {/* TESTING STUFF */}
      <div>
      <input type="range" min="0" max="100" value={percentTrue} onChange={handleSliderChange} />
      <button onClick={setRandomPageTable}>Set Page Table</button>
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