// Author: Carson Chang
// Created: 04/15/2024
// Last Modified: 04/15/2024
// Description: PageTableEntry class for PageTable.js

class PageTableEntry {
  constructor(vpn, pfn, validBit) {
    this.vpn = vpn;
    this.pfn = pfn;
    this.validBit = validBit;
  }
}

export default PageTableEntry;