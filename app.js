// let freq = 440

const tons = [264, 275, 297, 316.8, 330, 352, 371.25, 396, 412.5, 440, 475.2, 495]
// const tons = [396, 417, 528. 639, 741, 852, 963]

/*
 * Play one note
 */
note = (context, freq, counter) => {
  console.log("Note n°", counter, freq)

  const oscil = context.createOscillator()
  oscil.type = 'triangle'
  oscil.frequency.value = freq

  const gainNode = context.createGain()
  oscil.connect(gainNode)
  gainNode.connect(context.destination)

  const notesPerSecond = 5 // In Hertz
  // All are in seconds
  const start = counter / notesPerSecond
  const duration = 1.2 / notesPerSecond
  const ramp = .2 / notesPerSecond / 3 // Exponential increase

  // Increase volume
  gainNode.gain.setTargetAtTime(1, start, ramp)
  // Decrease volume
  gainNode.gain.setTargetAtTime(0, start + duration - ramp * 3, ramp)

  oscil.start(start)
  oscil.stop(start + duration)
}

/*
 * From the current URL generate an UUID
 */
getUuidFromUrl = () =>
  document.location.href
    .split('')
    .reverse()
    .filter(l => l.match(/[0-9a-f]/))
    .join('')
    .slice(0, 31)

/*
 * Launch notes based on the current URL
 */
launchNotes = (event, counter = 0, uuid = getUuidFromUrl()) => {
  if (counter >= uuid.length || counter >= 5) return

  const context = new AudioContext()

  const freq = tons[parseInt(uuid[counter], 16) % tons.length]
  // freq *= Math.max(1, parseInt(uuid[counter], 16)) / Math.max(1, parseInt(uuid[counter + 1], 16))
  // freq = Math.min(2000, Math.round(freq))

  note(context, freq, counter)

  launchNotes(event, counter + 1, uuid)
  console.log(event)
}

pageTransition = (event) => {
  event.preventDefault()

  document.body.classList.remove('js')

  setTimeout(() => document.location.replace(event.target.href), 1000)

  launchNotes(event)
}


Array.from(document.getElementsByClassName("proto")).forEach(element => element.onclick = launchNotes)
Array.from(document.getElementsByTagName("a")).forEach(element => element.onclick = pageTransition)

document.body.classList.add('js');