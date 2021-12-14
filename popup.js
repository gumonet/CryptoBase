
/*function getQuote(){
  fetch("https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd")
  .then( ( response ) => {
    if( response.ok ) {
      return response.json();
    } 
    return response.text().then( ( error ) => { console.log(error); throw error } );
  })
  .then (( response ) =>  {
     //quote.textContent = ( typeof response[0] !== 'unfdefined' ) ?  response[0] :  "Doesn't exist quote to show" ;
     console.log( response );
  })
  .catch ( ( error ) => { 
      console.warn( error );
  })
}*/

async function getDataApi() {
  let response = await fetch("https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd");

  try{
    if ( ! response.ok ){
      throw response.statusText;
      return false;
    }

    let cripto_data = await response.json();
    return cripto_data;

  } catch( error ){
      console.warn( error );
      return false;
  }
  
}


async function init() {

  let cripto_data = await getDataApi();

  if( cripto_data !== false ) {
    
    if( cripto_data.data.length >  0 ){
      const mainContent = document.getElementById("main-content");
      cripto_data.data.forEach((coin) => {
        let content = document.createElement("div");
        content.classList.add('item-cripto');
        //let icon = document.createElement("img");
        let name_content = document.createElement("span");
        let price_content = document.createElement("span");
        name_content.classList.add('cripto-price');
        
        name_content.textContent = `${coin.symbol}`;
        price_content.textContent = `$ ${coin.metrics.market_data.price_usd} usd`;
        content.appendChild(name_content);
        content.appendChild(price_content);
        mainContent.appendChild(content);
      });
    }

  }

}

init();

/*const baseCoinAPI = "https://pro-api.coinmarketcap.com/";
const apiVersion = "v1";
const apiKey = `&CMC_PRO_API_KEY=ac654499-0e7f-4dc6-8945-809d7707a78e`;
//Function to get the top 25 coins.
const getCoins = async (endPoint) => {
  let path = `${baseCoinAPI}${apiVersion}${endPoint}${apiKey}`;
  const fetchResult = await fetch(path);
  const result = await fetchResult.json();

  if (fetchResult.ok) {
    return result;
  }
  const responseError = {
    type: "Error",
    message: result.message || "Something went wrong",
    data: result.data || "",
    code: result.code || "",
  };

  let error = new Error();
  error = { ...error, ...responseError };
  throw error;
};

//DOM Manipulation to show all the coins and respective values
const coins = getCoins("/cryptocurrency/listings/latest?limit=25");
var mainContent = document.getElementById("main-content");
if (coins.length > 0) {
  coins.forEach((coin) => {
    var content = document.createElement("div");
    var paragraph = document.createElement("p");
    paragraph.textContent = `${coin.name} - ${coin.quote.USD.price}`;
    content.appendChild(paragraph);
    mainContent.appendChild(content);
  });
}*/