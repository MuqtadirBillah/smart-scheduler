const cron = require('node-cron');
const Task = require('../models/task');

// Cron Job
cron.schedule('*/60 * * * * *', () => {
    Task.find({}).exec((err, data) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(`You have following pending tasks`);
            console.log(data)
        }
    })
});
// Cron Job