// Author: Jeffrey Filiberto
// Created: 04/22/2024
// Last Modified: 04/22/2024
// Description: Functions for Vas.jsx

// TODO, RENAME STUFF TO WORK FOR PAS AND VAS

// Returns the value if it is a positive int, if not it returns 0
export function checkValue(input, original) {
    console.log("original: ", original);
    console.log("input:", input)
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



export function calcValues(vpn, offset, VAL) {
    // Might need to change where i check if vpn or offset are larger then VAL
    vpn = Number(vpn);
    offset = Number(offset);
    VAL = Number(VAL);

    // Calculate new VAL value
    if (VAL == 0) {
        VAL = vpn + offset;
    }
    // Check offset and VPN aren't larger then VAL
    if (offset > VAL) {
        alert("Offset cannot be larger then Virtual Address Length");
    }
    if (vpn > VAL) {
        alert("Virtual Page Number cannot be larger then Virtual Address Length");
    }
    // Calculate new vpn value
    if (vpn == 0) {
        vpn = VAL - offset;
    }
    // Calculate new offset value
    if (offset == 0) {
        offset = VAL - vpn;
    }

    return { vpn, offset, VAL }
}

export function calcSizes(vpn, offset, VAL) {
    let numPages = Math.pow(2, vpn);
    let pageSize = Math.pow(2, offset);
    let vasSize = Math.pow(2, VAL);

    // return { numPages, pageSize, vasSize }
    return [ numPages, pageSize, vasSize ]
}



export function test(vpn, offset, VAL) {
    console.log('test VPN:', vpn);
    console.log('test Offset:', offset);
    console.log('test VAL:', VAL);
}