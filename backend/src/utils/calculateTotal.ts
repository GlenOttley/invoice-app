import IItem from '../interfaces/itemInterface'

const calculateTotal = (items: IItem[]): number => {
  let total: number = 0
  items.forEach((item) => {
    total += item.total
  })
  return total
}

export default calculateTotal
