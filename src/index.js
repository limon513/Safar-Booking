const {server_config,Logger} = require('./config');
const express = require('express');
const bookingRoutes = require('./routes');
const CronJobs = require('./utils/crons/cron-jobs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',bookingRoutes);

CronJobs.scheduleCrons();

app.listen(server_config.PORT, ()=>{
    console.log(`Server Started at ${server_config.PORT}`);
    Logger.log({
        level:'info',
        message:'Server Up and Running!',
        label:__filename,
        errors:{msg:'something'}
    });
});
