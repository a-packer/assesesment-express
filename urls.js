const axios = require('axios');
const fs = require('fs');
const lineReader = require('line-reader')


// get file from command line
file = process.argv[2]


// read contents of the file, return data (urls)
function readURLs(file) {
    let data = fs.readFileSync(file, 'utf8', function(err, data) {
        if (err) {
            console.log("Problem with reading file");
            process.exit(1)
        }
    })
    return data
}

function getHost(line) {
    // gets hostname from url
    let arr = line.split("/")
    fullHost = arr[2]
    let host = fullHost.split(".")[0]
    return host
}

function doSomething(resp, line) {
    
    filename = getHost(line) + ".txt"
    content = resp.data

    try {
        fs.writeFileSync(filename, content);
        console.log(`Successfully wrote to file ${filename}!`);
      } catch (error) {
        console.error(`File write failed: ${error}`)
        process.exit(1);
      }
}


// for each line, send a get request to url
function getURLs(urls) {
    // split the contents by new line
    const lines = urls.split(/\r?\n/);

    lines.forEach((line) => {
        axios.get(line).then(function(resp) {
            doSomething(resp, line);
        })
        .catch(err => {
            console.log(`Error with url in file`)
        })
    });
}

getURLs(readURLs(file))


