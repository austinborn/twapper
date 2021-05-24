export const formatShortAddress = (address = '') => `${address.slice(0, 5)}..${address.slice(-3)}`

const utils = {
  formatShortAddress
}

export default utils