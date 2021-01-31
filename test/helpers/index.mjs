import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export const fixture = (...paths) =>
  join(dirname(fileURLToPath(import.meta.url)), `../fixtures`, ...paths)
