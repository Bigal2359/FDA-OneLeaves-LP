Only One Leaves Landing Page
=============

Static website build for the Only One Leaves Landing Page.

## Project deets

**Job number**: 10823596

**GIT Repo**: [git@git.fcb.io:fcbhealth/fda-only-one-leaves-lp.git](git@git.fcb.io:fcbhealth/fda-only-one-leaves-lp.git)

## Repo and environment structure

There are 3 branches within this repo. All development work should primarily occur in the `development` branch.

* Dev: `localhost` development using `grunt serve`.

## Requirements

To build and run the site locally, you'll need:

* [Node.js](http://nodejs.org/) 4.2.2 (For Grunt; **Note**: This _must_ be version 4.2.2)
* The [Grunt](http://gruntjs.com/getting-started) command line interface
* A [LiveReload browser extension](http://livereload.com/extensions/)

## Installation

First, review the build requirements above and ensure everything is correctly installed on your system.

Next, simply clone this repo to the local directory of your choice.

_Note:_ The relevant Node modules have been included in the repo; you should not need to run `npm  install`.

## Building the site

To build the front-end files, run the following from the cloned repo root:

    grunt build

By default, the build will be in `dev` mode. To switch modes, pass either `dev`, `stage` or `prod` as a parameter to the `build` task. Note that all of the tasks listed below accept the environment as a parameter.

    grunt build:dev
    grunt build:prod

To build just the site HTML files, run:

    grunt buildHTML

To build just the site CSS files, run:

    grunt buildCSS

To build just the site image files, run:

    grunt buildImg

To "watch" the site and rebuild on file save, run:

    grunt watch

_Note:_ The watch task is currently configured to only work with HTML, JavaScript and Sass files.

## Running the site locally

From the repo root, run:

    grunt serve

This will build the site (`grunt build:dev`), launch a dev server on port 35730 and open the site web root in your default browser.

## Deploying the site to stage

The site can be deployed to stage by running the following:

    grunt deploy 

## Troubleshooting

* You might want to consider using Node.js v0.12.7 (there's some weirdness going on with the compilation of `node-gyp` in version greater than this) __as of 9 September 2015__.
* You might need to install Xcode's command line tools `xcode-select --install`
* If you get the following sass error:

  `Error: libsass bindings not found.

  Delete the existing `/node_modules` directory and run `npm update`.


