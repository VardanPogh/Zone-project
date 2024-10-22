const request = require('supertest');
const app = require('../index');
const {existsSync, writeFileSync, unlinkSync} = require("fs");
const zonesCsvFilePath = "../zones.csv";

describe('Zones API', () => {
    beforeAll(async () => {
        writeFileSync(zonesCsvFilePath, 'id,name,points\n');
    });

    afterAll(async () => {
        if (existsSync(zonesCsvFilePath)) {
            unlinkSync(zonesCsvFilePath);
        }
    });

    test('should fetch all zones', async () => {
        const response = await request(app).get('/zones');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    test('should create a new zone', async () => {
        const newZone = {
            name: 'Zone 3',
            points: [[10.5, 12.0], [15.3, 12.0], [15.3, 8.0], [10.4, 8.7]],
        };

        const response = await request(app).post('/zones').send(newZone);
        expect(response.statusCode).toBe(201); // Created
        expect(response.body.message).toBe('Zone created successfully');
    });

    test('should delete a zone', async () => {
        const response = await request(app).delete('/zones/2');
        expect(response.statusCode).toBe(200);

        const fetchResponse = await request(app).get('/zones');
        const deletedZone = fetchResponse.body.find(zone => zone.id === 1);
        expect(deletedZone).toBeUndefined();
    });
});
