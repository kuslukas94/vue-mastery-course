let UUID = 1

export default function myUUID() {
  const getID = () => {
    UUID++
    return UUID
  }

  return {
    getID
  }
}
