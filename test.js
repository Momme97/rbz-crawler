const axios = require('axios');
const cheerio = require('cheerio');


let shopRequester = async () => {
    try{
        const data = await axios.get("https://www.expert.de/shop/unsere-produkte/computer-zubehor/tablets/tablets/17061470537-ipad-pro-11-wi-fi-256-gb-space-grau-mxdc2fd-a.html");
        return crawlData(data.data);
    }catch(e){
        console.log(e);
    }

}
let crawlData = (html) => {

    let $ = cheerio.load(html);
    let test = $('.widget-ArticlePrice-price').contents();
    console.log(test[7].data);
    /*
    for(let i = 0; i < test.length; i++){
        console.log("NR." + i + ":" + test[i].data);

    }
    */



}
shopRequester();
