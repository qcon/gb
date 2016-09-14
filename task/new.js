const fs = require('fs');
const dateFormat = require('dateformat');
const prompt = require('prompt');
const path = require('path');
const chalk = require('chalk');

const now = new Date();
const datePrefix = dateFormat(now, 'yyyy-mm-dd');

function writeFile(res) {
  const { title, subtitle, author } = res;
  const fileNameSlug = `${res.title.replace(/\s/g, '-').toLocaleLowerCase()}.md`;
  const currentPath = path.resolve('./');
  const targetPath = `${currentPath}/_preview/${datePrefix}-${fileNameSlug}`;
  const writeStream = fs.createWriteStream(targetPath);
  const fileContent = ['---',
  'layout: post',
  `title: '${title}'`,
  `subtitle: '${subtitle}'`,
  `author: '${author}'`,
  'header_image: URL',
  '---'].join('\n');

  writeStream.write(fileContent);
  writeStream.end();
  console.log(chalk.green(`Created ${chalk.underline.bold(fileNameSlug)} in \n${chalk.underline(targetPath)}`)); //eslint-disable-line
}
prompt.start();
prompt.get(['title', 'subtitle', 'author'], (err, res) => {
  writeFile(res);
});

