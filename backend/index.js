const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const app = express();
const PORT = 3000;
const CSV_FILE = path.join(__dirname, 'zones.csv');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Fetch all zones
app.get('/zones', (req, res) => {
    const zones = [];
    fs.createReadStream(CSV_FILE)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
            row.points = JSON.parse(row.points);
            zones.push(row);
        })
        .on('end', () => {
            res.json(zones);
        });
});

// Create a zone
app.post('/zones', (req, res) => {
    const { name, points } = req.body;
    const id = Date.now();
    const newZone = { id, name, points: '"' + JSON.stringify(points) + '"' };

    fs.appendFile(CSV_FILE, `${id},${name},${newZone.points}\n`, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save the zone' });
        } else {
            res.status(201).json({ message: 'Zone created successfully' });
        }
    });
});

// Delete a zone
app.delete('/zones/:id', (req, res) => {
    const zoneId = req.params.id;
    const zones = [];

    fs.createReadStream(CSV_FILE)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
            if (row.id !== zoneId) {
                zones.push(row);
            }
        })
        .on('end', () => {
            const ws = fs.createWriteStream(CSV_FILE);
            ws.write('id,name,points\n');
            zones.forEach((zone) => {
                ws.write(`${zone.id},${zone.name},${'"' + zone.points + '"'}\n`);
            });
            res.json({ message: 'Zone deleted successfully' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
