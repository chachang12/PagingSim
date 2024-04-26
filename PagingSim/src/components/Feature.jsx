import { useState } from 'react';
import {Pas, Vas, PageTable} from '../components';
import { Context } from '../components/Context';

const Feature = () => {
  // declare new vars and set functions here
  const [vpn, setVpn] = useState('0');
  const [pfn, setPfn] = useState('0');
  const [offset, setOffset] = useState('0');
  const [PAL, setPAL] = useState('0');
  const [VAL, setVAL] = useState('0');
  const [pte, setPte] = useState('0');


  return (
    // Adding new varialbe, add var and set function here
    <Context.Provider value={{ vpn, setVpn, pfn, setPfn, offset, setOffset, PAL, setPAL, VAL, setVAL, pte, setPte }}>
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