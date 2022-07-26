const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors')
require('dotenv').config()
const { convertJsonToCsv } = require('./convert-json-to-csv');

app.use(bodyParser.urlencoded({ extended: true }))

const whitelist = JSON.parse(process.env.ALLOWED_CORS_ORIGINS)
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
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
        if (!err && data.length !== 0) {
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

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
