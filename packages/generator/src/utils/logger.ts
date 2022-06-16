import chalk from 'chalk'

const tags = {
  error: chalk.red('prisma:error'),
  warn: chalk.yellow('prisma:warn'),
  info: chalk.cyan('prisma:info'),
  query: chalk.blue('prisma:query'),
}
const should = {
  warn: !process.env.PRISMA_DISABLE_WARNINGS,
}
function log(...data: any[]) {
  console.log(...data)
}
function warn(message: any, ...optionalParams: any[]) {
  if (should.warn) {
    console.warn(`${tags.warn} ${message}`, ...optionalParams)
  }
}
function info(message: any, ...optionalParams: any[]) {
  console.info(`${tags.info} ${message}`, ...optionalParams)
}
function error(message: any, ...optionalParams: any[]) {
  console.error(`${tags.error} ${message}`, ...optionalParams)
}
function query(message: any, ...optionalParams: any[]) {
  console.log(`${tags.query} ${message}`, ...optionalParams)
}

export const logger = { query, error, info, warn, log }
