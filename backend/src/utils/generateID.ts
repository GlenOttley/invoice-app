const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers: string = '0123456789'
let id = ''

const generateID = () => {
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  for (let i = 0; i < 4; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  return id
}

export default generateID
