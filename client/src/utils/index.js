import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPromt = surpriseMePrompts[randomIndex]

  if (randomPromt === prompt) return getRandomPrompt(prompt)

  return randomPromt
}

export const downloadImage = async (_id, image) => {
  FileSaver.saveAs(image, `download-${_id}.png`)
}
