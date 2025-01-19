const fs = require('fs');
const csv = require('csv-parser');


const inputFilePath = './input_countries.csv';
try{
    if(fs.existsSync(inputFilePath)){
        console.log(`File CSV Exists `)
    }
}catch(error){
    console.error(`File does not exist : ${error.message}`)

}
const canadaFilePath= './canada.txt';
const usaFilePath= './usa.txt'



if (fs.existsSync(canadaFilePath)){
    fs.unlinkSync(canadaFilePath);
    console.log("Deleted canada.txt")
}

if(fs.existsSync(usaFilePath)){
    fs.unlinkSync(usaFilePath);
    console.log("Deleted usa.txt")
}

fs.createReadStream(inputFilePath).pipe(csv()).on('data', (row) =>{
    const {country , year , population } = row;


if (country.toLowerCase() === 'canada'){
    const canadaData = `${country},${year},${population}\n`;
    fs.appendFileSync(canadaFilePath, canadaData);
}

if(country.toLowerCase() === 'united states'){
    const usaData = `${country},${year},${population}\n`;
    fs.appendFileSync(usaFilePath, usaData)
}

})
.on('end', ()=>{
    console.log('Data processing complete.')
})