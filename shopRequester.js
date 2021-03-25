const axios = require('axios');
const cheerio = require('cheerio');

let shopRequester = async (vendor, url) => {
    const data = await axios.get(url);

    return crawlData(vendor, data.data);
}
let crawlData = (vendor, html) => {
    let $ = cheerio.load(html);

    if(vendor === 'Alternate'){
        let priceString = $('.price span').contents();
            if(priceString.length > 0){
                return priceString[0].data;
            }
    }
    else if(vendor === 'Expert'){
        let priceString = $('.widget-ArticlePrice-price').contents();
        return priceString[7].data;
    }

}
exports.shopRequester = shopRequester;


