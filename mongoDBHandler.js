const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://mongoschlongo:rbzkielissexy%21%21%21@85.214.248.101:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

let getUrlCrawlData = async () => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db("products");

        let collection = db.collection('productList');

        let res = await collection.find().toArray();
        return res;

    } catch (err) {

        //console.log(err);
    } finally {

        client.close();
    }
}

let insertOrUpdateData = async (resultArray) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db("products");

        let collection = db.collection('productList');

        for(let i = 0; i < resultArray.length; i++){
            if(resultArray[i].vendor === 'Expert'){
                let res = await collection.updateOne({productName:resultArray[i].productName},{$addToSet:{expertPriceList:{price:resultArray[i].price,timestamp:resultArray[i].timestamp}}});
            }else if(resultArray[i].vendor === 'Alternate'){
                let res = await collection.updateOne({productName:resultArray[i].productName},{$addToSet:{alternatePriceList:{price:resultArray[i].price,timestamp:resultArray[i].timestamp}}});
            }

        }
        return res;

    } catch (err) {

        //console.log(err);
    } finally {

        client.close();
    }



    //console.log(resultArray);
}

exports.getUrlCrawlData = getUrlCrawlData;
exports.insertOrUpdateData = insertOrUpdateData;
