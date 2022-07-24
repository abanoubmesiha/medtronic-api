const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors')
const { convertJsonToCsv } = require('./convert-json-to-csv');

app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/export', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.send({status: 400, message: err.message})
        } else {
            const json = JSON.parse(data);
            const csv = convertJsonToCsv(json)
            fs.writeFile("data.csv", csv, (err) => {
                if (err) {
                    res.send({status: 400, message: err.message})
                } else {
                    res.download('data.csv');
                }
            })
        }
    });
});

app.post('/data', (req, res) => {
    const newData = req.body;

    fs.readFile("data.json", function (err, data) {
        let json = [newData];
        if (!err) {
            json = JSON.parse(data)
            json.push(newData)
        }

        fs.writeFile("data.json", JSON.stringify(json), (err) => {
            if (err) {
                res.send({status: 400, message: err.message})
            } else {
                res.send({status: 200, message: "File written successfully"})
            }
          })
    })
});

let PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


