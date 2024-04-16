import React from 'react'
import {Pas, Vas, PageTable} from '../components';

const Feature = () => {
  return (
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
  )
}

export default Feature