# ChrisSprehe.com


### Adding npm tasks

To add a node package, modify `package.json` and run 

`
npm install
`

## [Bower](http://bower.io/)

Modify `bower.json` and add dependencies.  All files will be installed under `<root>/bower_components`.  Make sure to add a corresponding entry in `Gruntfile.js`.

## [GruntFile.js](http://gruntjs.com/)

### Default

The default task will concat all javascript and CSS into a single file, convert .scss to .css, minify, convert .html.haml to .html, and compile all [Ember.js handlebars templates](http://handlebarsjs.com/)

To run: `grunt`

### Concat

Concats all javascript files into a single file.

To run: `grunt concat`

### CSS Min

Minifies `public/application.css`

To run: `grunt cssmin`

### Ember Handlebars

Compiles all handlebars templates located under `assets/templates` into `public/templates.js`

To run: `grunt ember_handlebars`

### Grunt Watch

Sets up a watcher on different folders to fire grunt tasks based on modified files to help with local development

To run: `grunt watch`

### Haml

Converts .haml to .html

To run: `grunt haml`

### Sass

Converts .scss to .css

To run: `grunt sass:dist`

### Uglify

Minifies javascript, `application.js` -> `application.min.js`

To run: 'grunt uglify'

### Copying files

Copies files into a relative folder structure both for local development and the `grunt deploy` task to push to S3 Bucket.  Namely fonts currently

To run: `grunt copy`

### Push to S3

Copies all files under `public` to configured S3 bucket.  To configure S3: 

```
{
  "access_key": "AWS Access Key",
  "access_secret": "AWS Access Secret",
  "bucket": "chrissprehe.com"
}

```


To run: `grunt s3`

### Deploying to S3

Runs the `default` grunt task, copies fonts into the public directory, and pushes files up to S3

To run: `grunt deploy`

## Optimizing Image

To convert to specific width but preserve the ratio using ImageMagick, where 2650 represents desired pixel width:

```
convert background.jpg -resize 2650 background-new.jpg
```

Then, can use jpegoptim to compress the file even further, 60% for instance of the original: 

```
jpegoptim -m 60 background-new.jpg
```