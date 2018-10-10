var http = require('https');
var fs = require('fs');

const STOCKS = ['ADANIPORTS', 'ASIANPAINT', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BPCL', 
'BHARTIARTL', 'INFRATEL', 'CIPLA', 'COALINDIA', 'DRREDDY', 'EICHERMOT', 'GAIL', 'GRASIM', 'HCLTECH', 'HDFCBANK', 
'HEROMOTOCO', 'HINDALCO', 'HINDPETRO', 'HINDUNILVR', 'HDFC', 'ITC', 'ICICIBANK', 'IBULHSGFIN', 'IOC', 'INDUSINDBK', 
'INFY', 'KOTAKBANK', 'LT', 'LUPIN', 'M&M', 'MARUTI', 'NTPC', 'ONGC', 'POWERGRID', 'RELIANCE', 'SBIN', 'SUNPHARMA', 
'TCS', 'TATAMOTORS', 'TATASTEEL', 'TECHM', 'TITAN', 'UPL', 'ULTRACEMCO', 'VEDL', 'WIPRO', 'YESBANK', 'ZEEL'];

var download = function (url, fileName){
	var file = fs.createWriteStream('/Users/Sachin/Desktop/stocks_data/' + fileName);
    var request = http.get(url, function(response) {
    	response.pipe(file);
	});	
}

var main = function () {
	for (let ind = 0; ind<STOCKS.length; ind++) {
		let url = 'https://query1.finance.yahoo.com/v7/finance/download/'+ STOCKS[ind]+ '.NS' + '?period1=1500657540&period2=1532193540&interval=1hr&events=history&crumb=rFG19uWcclz';	
		download(url, STOCKS[ind] + '.csv');
	}
}

main();