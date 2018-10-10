const yahooFinance = require('yahoo-finance');
 
// yahooFinance.historical({
//   symbol: 'TCS.NS',
//   from: '2018-01-01',
//   to: new Date().toISOString().slice(0, 10),
//   period: 'd'
// }, function (err, quotes) {
//   console.log(quotes[1]);
// });

var looper = async function () {
	while(true) {
		var response = await getQuote();
  	 // see the docs for the full list
  	 console.log(response['price']);
  	 // console.log(JSON.stringify(response['recommendationTrend']));

	}
};

var getQuote =  function() {
	return new Promise(function(resolve, reject){
		setTimeout(async function(){
		response = await yahooFinance.quote({
  			symbol: '^NSEI',
  			modules: [ 'price' ]});
		resolve(response);
	},1000);
	});
	
};

//,'recommendationTrend', 'summaryDetail', 'earnings', 'calendarEvents', 'upgradeDowngradeHistory', 'defaultKeyStatistics','summaryProfile', 'financialData'
looper().then(console.log);
