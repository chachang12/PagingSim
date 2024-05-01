// Author: Jeffrey Filiberto
// Created: 04/22/2024
// Last Modified: 04/22/2024
// Description: Functions for Vas.jsx

// TODO, RENAME STUFF TO WORK FOR PAS AND VAS

// Returns the value if it is a positive int, if not it returns the original number.
// If the flag is 0 the value cannot be larger then 16
export function checkValue(input, original) {
    let value = original;
    //let value = 0;
    if (!isNaN(input) && Number.isInteger(parseFloat(input)) && parseInt(input) >= 0) {
        value = parseInt(input);
    }
    if (input == "") {
        value = "";
    }
    return value;
}

export function calcValues(pn, offset, AL) {
    pn = Number(pn);
    offset = Number(offset);
    AL = Number(AL);
    // Calculate new VAL value
    if (AL == 0) {
        AL = pn + offset;
    } else if (pn == 0) { // Calculate new vpn value
        if (AL < offset) {
            alert("The Offset cannot be larger then your Address Length");
            return;
        }
        pn = AL - offset;
    } else if (offset == 0) { // Calculate new offset value
        if (AL < pn) {
            alert("The Page/Frame Number cannot be larger then your Address Length");
            return;
        }
        offset = AL - pn;
    } else {
        AL = pn + offset;
    }
    return [ pn, offset, AL ]
}
// Fix this so names work for VAS and PAS
export function calcSizes(vpn, offset, VAL) {
    let numPages = Math.pow(2, vpn);
    let pageSize = Math.pow(2, offset);
    let vasSize = Math.pow(2, VAL);
    console.log(numPages)
    return [ numPages, pageSize, vasSize ]
}

export function calcPTSizeAndPTE(vpn, pfn) {
    vpn = Number(vpn); // Convert vpn to a number
    pfn = Number(pfn); // Convert pfn to a number
    let pteNum = Math.pow(2, vpn);
    let byteNum = Math.ceil((pfn + 1) / 8); // Corrected operator precedence
    let ptSize = byteNum * pteNum;
    return [ptSize, pteNum];
}

export function calcFromPTE(VAL, PAL, pte) {
    let vpn = Math.ceil(Math.log2(pte));
    if (vpn > VAL) {
        alert("Virtual Address Length must be at least " + vpn + ".");
        return;
    }
    // Need to check with prof O
    let offset = VAL - vpn
    if (offset > PAL) {
        alert("Your offset (" + offset + ") cannot be larger then your Physical Address Length")
        return;
    }
    let pfn = PAL - offset
    let byteNum = Math.ceil((pfn + 1) / 8); // Corrected operator precedence
    let ptSize = byteNum * pte;

    return [vpn, offset, pfn, ptSize];
}

export function converter(size) {
    let finalSize = size + " bytes";
    if (size > 1024) {
        finalSize = (size / 1024) + " KiB";
    } 
    if (size > 1048576) {
        finalSize = (size / 1048576) + " MiB";
    }
    if (size > 1073741824) {
        finalSize = (size / 1073741824) + " GiB";
    }
    if (size > 1099511627776) {
        finalSize = (size / 1099511627776) + " TiB";
    }
    // You can continue adding more conditions for higher units as needed
    return finalSize;
}



export function test(vpn, offset, VAL) {
    console.log('test VPN:', vpn);
    console.log('test Offset:', offset);
    console.log('test VAL:', VAL);
}