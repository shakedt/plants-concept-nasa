const csvParse = require('csv-parse');
const fs = require('fs');

const results = [];

const isHabitablePlanet = (planet) => {
    const isConfirmed  = planet['koi_disposition'] === 'CONFIRMED';
    const isLow = planet['koi_insol'] > 0.36;
    const isHigh = planet['koi_insol'] < 1.11;
    const radius = planet['koi_prad'] < 1.6;

    return isConfirmed && isLow && isHigh && radius; 
}

const stream = fs.createReadStream('./kepler_data.csv')
    .pipe(csvParse({
        comment: '#',
        columns: true
    }));

stream.on('data', (data) => {
    if (isHabitablePlanet(data)) results.push(data);
});

stream.on('end', () => {
  console.log(results);
  console.log(`${results.length} is the amount of plants that where found`);
});

stream.on('error', (err) => {
  console.log(err);
});


