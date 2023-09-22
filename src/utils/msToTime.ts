function convertMsToTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60 < 1 ? '<1' : totalSeconds % 60

  let timeString = ""
  if (hours > 0) {
    timeString += `${hours} часов `
  }
  if (minutes > 0) {
    timeString += `${minutes} минут `
  }
  timeString += `${seconds} секунд`

  return timeString
}

export default convertMsToTime