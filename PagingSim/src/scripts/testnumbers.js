export function handleInputValues(vpn, offset, VAL) {
    console.log('VPN:', vpn);
    console.log('Offset:', offset);
    console.log('VAL:', VAL)

    // Do something with the vpn and offset values...
  }


// This function 
export function vpnChange(vpn, offset, VAL) {
 vpn = Number(vpn);
 offset = Number(offset);
 VAL = Number(VAL);

 VAL = vpn + offset;

  return [vpn.toString(), offset.toString(), VAL.toString()];
}