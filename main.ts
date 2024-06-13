import words from "./words.json" with { type: "json"}

function buildPhrase(q: number) {
  return Array.from({ length: q * 2 }).map((_, index) => {
    if (index % 2 !== 0) {
      return " "
    } else {
      return words[Math.floor(Math.random() * words.length)]
    }
  })
}

function calcWPM(words: string[], time: number) {
  return words.length / (time / 60)
}

function calcAccuracy(words: string[], entry: string[]) {
  let ok = 0
  words.forEach((word, i) => {
    if (word === entry[i]) ok++
  })

  return (ok * 100) / words.length
}

function main() {
  console.log("Welcome to")
  console.log(`
  __           _   _                       
 / _| __ _ ___| |_| | _____ _   ___      __
| |_ / _\` |_  / __| |/ / _ \\ | | \\ \\ /\\ / /
|  _| (_| |/ /| |_|   <  __/ |_| |\\ V  V / 
|_|  \\__,_/___|\\__|_|\\_\\___|\\__, | \\_/\\_/  
                             |___/          
`)
  const q = prompt("Enter the number of words:", "60")

  const phrase = buildPhrase(parseInt(q || "60"))
  console.log(`This is your phrase: \n ${phrase.join("")}`)

  prompt("Press any key and start typing.")

  const startTime = new Date()
  const rawEntry = prompt(">")

  const finishTime = new Date()

  const yourTime = (finishTime.valueOf() - startTime.valueOf()) / 1000

  if (rawEntry) {
    const entry = rawEntry.split(" ")
    const words = phrase.filter(word => word !== " ")

    const wpm = calcWPM(words, yourTime)
    const accuracy = calcAccuracy(words, entry)
    console.log(`WPM: ${wpm.toFixed(1)} \nAccuracy (correct words): ${accuracy}%`)
  }
}

main()
