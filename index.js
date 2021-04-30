const csvParse = require('csv-parse');
const fs = require('fs');

const results = [];

const stream = fs.createReadStream('./kepler_data.csv')
    .pipe(csvParse({
        comment: '#',
        columns: true
    }));

stream.on('data', (data) => {
  results.push(data);
});

stream.on('end', () => {
  console.log('so done wow');
  console.log(results);
});

stream.on('error', (err) => {
  console.log(err);
});

// const data = parse();