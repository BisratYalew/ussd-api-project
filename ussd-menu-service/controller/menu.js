const EventEmitter = require('events').EventEmitter;

const redisClient = require('../db/redis');
const builder = require('../utils/menuBuilder').builder;



const start = (req, res, next) => {

    // save successful response to redis server
    // find the previous response and build the next response
    let taskflow = new EventEmitter();

    taskflow.on('checkStatus', (status) => {
        let selectedValue = req.body?.select;
        let nextValue;
        redisClient.get('previous', (err, data) => {
            if(err) console.log("Error: ", err);
            let previousSession = data;
            console.log("previous: ", previousSession);
            if(selectedValue !== '*') {
                let previousValue = builder(previousSession);
                let nextSession = previousValue[selectedValue] ? previousValue[selectedValue] : undefined;
                console.log("next session will be: ", nextSession?.value);
                if(nextSession?.value == undefined) {
                    if(isNaN(selectedValue)) taskflow.emit('response', previousSession, { value: 'start' });
                    else return res.status(400).json({ message: "You have selected invalid option" });
                }
                else taskflow.emit('response', { value: previousSession }, nextSession);
            } else {
                console.log("Back to home");
                taskflow.emit('response', { value: "start" }, { value: "start" });
            }
        });

    })

    taskflow.on('response', async (previousSession={ value: "start" }, nextSession={ value: "start" }) => {
        let state = nextSession?.value;
        let data = builder(state);
        redisClient.set('previous', data?.value);

        return res.status(200).json(data);
    })


    taskflow.emit('checkStatus');

}


module.exports = { start };