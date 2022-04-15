import fs from 'fs'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import path from 'path'
import { fileURLToPath } from 'url'

const cwd = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(cwd, '..')

const mode = process.env.NODE_ENV || 'production'
const dotenvFiles = [`.env.${mode}.local`, mode !== 'test' && `.env.local`, `.env.${mode}`, '.env']
const dotenvPaths = dotenvFiles.map((file) => path.join(rootDir, file))
let allParsed = {}

for (const envFile of dotenvPaths) {
  try {
    const stats = fs.statSync(envFile)
    if (stats.isFile()) {
      const contents = fs.readFileSync(envFile, 'utf8')
      const parsed = dotenv.parse(contents)
      for (const key of Object.keys(parsed || {})) {
        allParsed[key] = parsed?.[key]
      }
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(e)
    }
  }
}

const allExpanded = dotenvExpand.expand({ parsed: allParsed }).parsed
Object.assign(process.env, allExpanded)
