const calculateDueDate = (days: number, createdAt?: Date): Date => {
  const dateCreated = createdAt || new Date()
  const dueDate = new Date(dateCreated.setDate(dateCreated.getDate() + days))
  return dueDate
}

export default calculateDueDate
