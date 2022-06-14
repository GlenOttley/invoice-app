const addDays = (days: number): Date => {
  var result = new Date()
  result.setDate(result.getDate() + days)
  return result
}

export default addDays
