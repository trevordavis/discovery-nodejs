#Watson Book Catalogue
__Design paradigm based on ReactJS practices, codebase designed using ReactJS framework, Watson React components, and the Watson Discovery News Demo github repo.__

## Installation Instructions

Clone this repo to a local copy. Then, change into the directory and run `npm install`.
(If you do not have node.js installed, you may find it [here](https://nodejs.org/en/download/)  

## Usage instructions

Because of restrictions with the Watson Discovery API (which currently does not work with CORS), this product is demo only and must be run on the Chrome Web Broswer with CORS disabled.

First, from the command line (Mac), run `open -a Google\ Chrome --args --disable-web-security --user-data-dir`.

Then, run `npm start` to run the web app on localhost:3000 in Chrome. Note that this requires that no other processes be running on localhost:3000 at the time.