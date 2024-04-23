export function handleInputValues(vpn, offset, VAL) {
    console.log('VPN:', vpn);
    console.log('Offset:', offset);
    console.log('VAL:', VAL)

    // Do something with the vpn and offset values...
  }


// This function happens when the vpn or offset is change and calculates the VAL value.
export function vpnOrOffsetChange(vpn, offset, VAL) {
  // Each line checks if the value can be converted to an int, and if it can't sets the value to 0
  vpn = isNaN(parseInt(vpn)) ? 0 : parseInt(vpn);
  offset = isNaN(parseInt(offset)) ? 0 : parseInt(offset);
  VAL = isNaN(parseInt(VAL)) ? 0 : parseInt(VAL);

  VAL = vpn + offset;

  return [vpn.toString(), offset.toString(), VAL.toString()];
}

export function valChange(vpn, offset, VAL) {
  vpn = isNaN(parseInt(vpn)) ? 0 : parseInt(vpn);
  offset = isNaN(parseInt(offset)) ? 0 : parseInt(offset);
  VAL = isNaN(parseInt(VAL)) ? 0 : parseInt(VAL);
 
  newVPN = VAL - offset;
  if (newVPN >= 0) {
    vpn = newVPN;
  } 

  return [vpn.toString(), offset.toString(), VAL.toString()];
 }

 // Returns the value if it is a positive int, if not it returns 0
export function checkValue(input) {
  let value = 0;
  if (!isNaN(input) && Number.isInteger(parseFloat(input)) && parseInt(input) >= 0) {
    value = parseInt(input);
  }
  return value
}


 export function buttonPress(vpn, offset, VAL) {
  vpn = Number(vpn);
  offset = Number(offset);
  VAL = Number(VAL);
  if (VAL == 0) {
    VAL = vpn + offset;
  }
  
  return {vpn, offset, VAL}
 }