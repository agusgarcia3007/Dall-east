import { surpriseMePrompts } from '../constants'

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPromt = surpriseMePrompts[randomIndex]

  if (randomPromt === prompt) return getRandomPrompt(prompt)

  return randomPromt
}
