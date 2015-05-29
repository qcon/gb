# gb

#How to build

###Dependencies

- jekyll
- Sass
- Autoprefixer
- uglifyJS
- s3cmd (only for aws s3 deployment)

To compile everything you habe 2 options

##1st option using a normal Server

run
```
$ rake dev
```
to compile all SCSS files, concate & uglify JavaScript and serve Jekyll
or
```
$ rake build
```
to just build all the files without starting the jekyll server

##2nd option to push it to a s3 bucket

run
```
$ rake s3_build
```
to build all files (same behaviour as :build task) gzip then and sync the s3 bucket


Speedindex (webpagetest.org) **567** first view. Repeat view **207**
