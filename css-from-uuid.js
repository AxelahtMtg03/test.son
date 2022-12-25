/**
 * Generate some random css effects on a specific item
 */

const uuid = getUuidFromUrl()

let counter = 0

const nextDigit = () => parseInt(uuid[counter++], 16)

const getColor = () => {
    const red = nextDigit() * 16 + nextDigit()
    const green = nextDigit() * 16 + nextDigit()
    const blue = nextDigit() * 16 + nextDigit()

    return `rgba(${red}, ${green}, ${blue})`
}

const generateShadow = () => `0 0 1em 1em inset ${getColor()}`

const prettify = (element) => {
    element.style.color = 'white'
    element.style.boxShadow = generateShadow()
    element.style.textShadow = '0 0 1em black'
    element.style.backgroundImage = `linear-gradient(${getColor()}, ${getColor()})`
}

Array.from(document.getElementsByClassName('hero'))
    .forEach(element => prettify(element))

// Utility method
const newUuid = () => {
    const temp_url = URL.createObjectURL(new Blob())
    const uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url)
    return uuid.substring(uuid.lastIndexOf('/') + 1) // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
}

document.getElementById('navigator').href = `index.html?${newUuid()}`