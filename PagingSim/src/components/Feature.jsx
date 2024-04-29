import { useState } from 'react';
import {Pas, Vas, PageTable} from '../components';
import { Context } from '../components/Context';
import PageTableEntry from '../scripts/classes/PageTableEntry';

const Feature = () => {
  // declare new vars and set functions here
  // PAS Vars
  const [pfn, setPfn] = useState('0');
  const [offset, setOffset] = useState('0');
  const [PAL, setPAL] = useState('0');
  const [frameSize, setFrameSize] = useState(0);
  const [pasSize, setPasSize] = useState(0);
  const [pagesP, setPagesP] = useState(Array(20).fill(null));
  // VAS Vars
  const [vpn, setVpn] = useState('0');
  const [VAL, setVAL] = useState('0');
  const [pageSize, setPageSize] = useState(0);
  const [vasSize, setVasSize] = useState(0);
  const [pagesV, setPagesV] = useState(Array(30).fill(null));
  // Page Table Vars
  const [Size, setSize] = useState('0');
  const [pte, setPte] = useState('0');
  const [pageTable, setPageTable] = useState(Array(pte).fill().map((_, i) => new PageTableEntry(i, i, true)));



  return (
    // Adding new varialbe, add var and set function here
    <Context.Provider value={{ vpn, setVpn, pfn, setPfn, offset, setOffset, PAL, setPAL, VAL, setVAL, pte, setPte, pageTable, setPageTable, Size, setSize,
                              frameSize, setFrameSize, pasSize, setPasSize, pagesP, setPagesP, pageSize, setPageSize, vasSize, setVasSize, pagesV, setPagesV }}>
      <div className="flex">
        <div>
          {/* VAS */}
          <div className='mb-10 ml-[65px] w-[925px]'>
            <Vas />
          </div>

          {/* PAS */}
          <div className='mb-10 ml-[65px] w-[925px]'>
            <Pas />
          </div>
        </div>
        {/* Page Table */}
        <div className='ml-10 w-[425px] h-[850px]'>
          <PageTable />
        </div>
      </div>
    </Context.Provider> 
  )
}

export default Feature