'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const dateFormat = require('dateformat')
const path = require('path')
const chalk = require('chalk')

const now = new Date()
const datePrefix = dateFormat(now, 'yyyy-mm-dd')

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the Title'
  },
  {
    type: 'input',
    name: 'subtitle',
    message: 'Enter the Subtitle'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Enter the autor'
  }
]

inquirer.prompt(questions).then((answer) => {
  const { title, subtitle, author } = answer
  let normalizedTitle = title.toLowerCase()
  normalizedTitle = normalizedTitle.replace(/ä/g, 'ae')
  normalizedTitle = normalizedTitle.replace(/ö/g, 'oe')
  normalizedTitle = normalizedTitle.replace(/ü/g, 'ue')
  normalizedTitle = normalizedTitle.replace(/ß/g, 'ss')
  normalizedTitle = normalizedTitle.replace((/\s/g, '-'))
  const fileNameSlug = `${normalizedTitle}.md`
  const currentPath = path.resolve('./')
  const targetPath = `${currentPath}/_preview/${datePrefix}-${fileNameSlug}`
  const writeStream = fs.createWriteStream(targetPath)
  const fileContent = ['---',
    'layout: post',
    `title: '${title}'`,
    `subtitle: '${subtitle}'`,
    `author: '${author}'`,
    `header_image: 'URL'`,
    '---'].join('\n')

  writeStream.write(fileContent)
  writeStream.end()
  console.log(chalk.green(
    `Created ${chalk.underline.bold(fileNameSlug)} in \n${chalk.underline(targetPath)}`
  ))
})
