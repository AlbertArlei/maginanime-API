const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const databaseSync = require('./api/models/db/dbSync');
const sequelize = require('./database/db');
const redis = require('./api/models/redis/redis');
const routeUser = require('./api/routes/userRouter');
const routeManga = require('./api/routes/mangaRouter');
const routeGender = require('./api/routes/genderRouter');
const databaseSyncInstance = new databaseSync(sequelize);
const routeUserInstance = new routeUser();
const routeMangaInstance = new routeManga();
const routeGenderInstance = new routeGender();
databaseSyncInstance.syncTables();
const sync = require('./api/models/manga/cache/cacheSyncModel');
app.use(express.json());
app.use(cors({
    origin: [`${dotenv.parsed.host}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
}));

app.use('/manga', routeMangaInstance.main());
app.use('/user', routeUserInstance.main());
app.use('/gender', routeGenderInstance.main());

new redis().main();
app.listen(8181, '127.0.0.1');