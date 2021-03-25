const shopRequester = require('./shopRequester');
const mongoDbHandler = require('./mongoDBHandler');
const moment = require('moment'); // require

let findCrawlData = async () => {
    let urlList = await mongoDbHandler.getUrlCrawlData();
    let resultArray = [];

    for(let i = 0; i < urlList.length; i++){
        resultArray.push({productName:urlList[i].productName,vendor:"Alternate",price: await shopRequester.shopRequester('Alternate',urlList[i].urlAlternate),timestamp: moment().format()});
        resultArray.push({productName:urlList[i].productName,vendor:"Expert",price: await shopRequester.shopRequester('Expert',urlList[i].urlExpert),timestamp: moment().format()});

    }
    mongoDbHandler.insertOrUpdateData(resultArray);
}
console.log("Crawler started");

setTimeout(() => {
    console.log("Data Logged");
        findCrawlData();
    }

, 3600000);






