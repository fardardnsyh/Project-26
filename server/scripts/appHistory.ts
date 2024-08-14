require('dotenv').config();
const db = require('../config/connection');

const { App } = require('../models');

const updateAppHistory = async () => {
    const data = await App.find()
    let filtered = data.filter(n => !n.statusHistory.length)
    const lastUpdated = Date.now();
    const appliedObj = {
        dateChanged: lastUpdated,
        status: 'applied'
    }
    for(let i =0; i < filtered.length; i++) {
        const currApp = filtered[i];
        const { status, _id} = currApp;
        let history;
        const statusObj = {
            dateChanged: lastUpdated,
            status: status
        }

        if(status == 'preparing' || status == 'applied') {
            history = [statusObj]
        } else {
            history = [appliedObj, statusObj]
        }
        const singleApp = await App.findByIdAndUpdate(_id, { statusHistory: history}, { new: true });
    }
    console.log('done')
    process.exit(1)
};

updateAppHistory();
export { }