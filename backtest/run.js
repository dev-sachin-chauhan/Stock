
const rootPrefix = '..'
  ,BackTestKlass = require( rootPrefix + '/backtest/back_test')
  ,TimeUtilsObj = require(rootPrefix + '/common_utils/time_util')
;
const STOCKSS = ['USDINR=X','^NSEI','^NSEBANK','ADANIPORTS.NS', 'ASIANPAINT.NS', 'AXISBANK.NS', 'BAJAJ-AUTO.NS', 'BAJFINANCE.NS', 'BAJAJFINSV.NS', 'BPCL.NS',
  'BHARTIARTL.NS', 'INFRATEL.NS', 'CIPLA.NS', 'COALINDIA.NS', 'DRREDDY.NS', 'EICHERMOT.NS', 'GAIL.NS', 'GRASIM.NS', 'HCLTECH.NS', 'HDFCBANK.NS',
  'HEROMOTOCO.NS', 'HINDALCO.NS', 'HINDPETRO.NS', 'HINDUNILVR.NS', 'HDFC.NS', 'ITC.NS', 'ICICIBANK.NS', 'IBULHSGFIN.NS', 'IOC.NS', 'INDUSINDBK.NS',
  'INFY.NS', 'KOTAKBANK.NS', 'LT.NS', 'LUPIN.NS', 'M&M.NS', 'MARUTI.NS', 'NTPC.NS', 'ONGC.NS', 'POWERGRID.NS', 'RELIANCE.NS', 'SBIN.NS', 'SUNPHARMA.NS',
  'TCS.NS', 'TATAMOTORS.NS', 'TATASTEEL.NS', 'TECHM.NS', 'TITAN.NS', 'UPL.NS', 'ULTRACEMCO.NS', 'VEDL.NS', 'WIPRO.NS', 'YESBANK.NS', 'ZEEL.NS', 'PVR.NS','CYIENT.NS','YESBANK.NS'];

const STOCKS = ["ABB.NS",
  "ACC.NS",
  "AIAENG.NS",
  "AUBANK.NS",
  "ADANIPORTS.NS",
  "ADANIPOWER.NS",
  "ABCAPITAL.NS",
  "ABFRL.NS",
  "AJANTPHARM.NS",
  "ALKEM.NS",
  "AMARAJABAT.NS",
  "AMBUJACEM.NS",
  "APOLLOHOSP.NS",
  "APOLLOTYRE.NS",
  "ASHOKLEY.NS",
  "ASIANPAINT.NS",
  "AUROPHARMA.NS",
  "DMART.NS",
  "AXISBANK.NS",
  "BAJAJ-AUTO.NS",
  "BAJFINANCE.NS",
  "BAJAJFINSV.NS",
  "BALKRISIND.NS",
  "BANKBARODA.NS",
  "BANKINDIA.NS",
  "BATAINDIA.NS",
  "BERGEPAINT.NS",
  "BEL.NS",
  "BHARATFIN.NS",
  "BHARATFORG.NS",
  "BHEL.NS",
  "BPCL.NS",
  "BHARTIARTL.NS",
  "INFRATEL.NS",
  "BIOCON.NS",
  "BOSCHLTD.NS",
  "BRITANNIA.NS",
  "CADILAHC.NS",
  "CANBK.NS",
  "CASTROLIND.NS",
  "CENTRALBK.NS",
  "CENTURYTEX.NS",
  "CHOLAFIN.NS",
  "CIPLA.NS",
  "COALINDIA.NS",
  "COLPAL.NS",
  "CONCOR.NS",
  "COROMANDEL.NS",
  "CROMPTON.NS",
  "CUMMINSIND.NS",
  "DLF.NS",
  "DABUR.NS",
  "DHFL.NS",
  "DBL.NS",
  "DISHTV.NS",
  "DIVISLAB.NS",
  "DRREDDY.NS",
  "EDELWEISS.NS",
  "EICHERMOT.NS",
  "EMAMILTD.NS",
  "ENDURANCE.NS",
  "ENGINERSIN.NS",
  "EXIDEIND.NS",
  "FEDERALBNK.NS",
  "FCONSUMER.NS",
  "FRETAIL.NS",
  "GAIL.NS",
  "GMRINFRA.NS",
  "GICRE.NS",
  "GLENMARK.NS",
  "GODREJAGRO.NS",
  "GODREJCP.NS",
  "GODREJIND.NS",
  "GRASIM.NS",
  "GRUH.NS",
  "GSPL.NS",
  "HCLTECH.NS",
  "HDFCBANK.NS",
  "HAVELLS.NS",
  "HEROMOTOCO.NS",
  "HEXAWARE.NS",
  "HINDALCO.NS",
  "HINDPETRO.NS",
  "HINDUNILVR.NS",
  "HINDZINC.NS",
  "HUDCO.NS",
  "HDFC.NS",
  "ITC.NS",
  "ICICIBANK.NS",
  "ICICIGI.NS",
  "ICICIPRULI.NS",
  "IDBI.NS",
  "IDFCBANK.NS",
  "IDFC.NS",
  "IRB.NS",
  "IDEA.NS",
  "IBULHSGFIN.NS",
  "IBREALEST.NS",
  "IBVENTURES.NS",
  "INDIANB.NS",
  "INDHOTEL.NS",
  "IOC.NS",
  "IGL.NS",
  "INDUSINDBK.NS",
  "NAUKRI.NS",
  "INFY.NS",
  "INDIGO.NS",
  "JSWENERGY.NS",
  "JSWSTEEL.NS",
  "JINDALSTEL.NS",
  "JUBLFOOD.NS",
  "JUBILANT.NS",
  "KARURVYSYA.NS",
  "KOTAKBANK.NS",
  "L&TFH.NS",
  "LICHSGFIN.NS",
  "LT.NS",
  "LUPIN.NS",
  "MRF.NS",
  "MGL.NS",
  "M&MFIN.NS",
  "M&M.NS",
  "MANAPPURAM.NS",
  "MRPL.NS",
  "MARICO.NS",
  "MARUTI.NS",
  "MFSL.NS",
  "MINDTREE.NS",
  "MOTHERSUMI.NS",
  "MPHASIS.NS",
  "MUTHOOTFIN.NS",
  "NATCOPHARM.NS",
  "NBCC.NS",
  "NHPC.NS",
  "NMDC.NS",
  "NTPC.NS",
  "NATIONALUM.NS",
  "OBEROIRLTY.NS",
  "ONGC.NS",
  "OIL.NS",
  "OFSS.NS",
  "PCJEWELLER.NS",
  "PIIND.NS",
  "PNBHOUSING.NS",
  "PAGEIND.NS",
  "PETRONET.NS",
  "PIDILITIND.NS",
  "PEL.NS",
  "PFC.NS",
  "POWERGRID.NS",
  "PRESTIGE.NS",
  "PGHH.NS",
  "PNB.NS",
  "QUESS.NS",
  "RBLBANK.NS",
  "RAJESHEXPO.NS",
  "RELCAPITAL.NS",
  "RELIANCE.NS",
  "RELINFRA.NS",
  "RPOWER.NS",
  "RECLTD.NS",
  "SBILIFE.NS",
  "SRF.NS",
  "SHREECEM.NS",
  "SRTRANSFIN.NS",
  "SIEMENS.NS",
  "SBIN.NS",
  "SAIL.NS",
  "STRTECH.NS",
  "SPARC.NS",
  "SUNPHARMA.NS",
  "SUNTV.NS",
  "SUZLON.NS",
  "SYNGENE.NS",
  "TV18BRDCST.NS",
  "TVSMOTOR.NS",
  "TATACHEM.NS",
  "TCS.NS",
  "TATAGLOBAL.NS",
  "TATAMTRDVR.NS",
  "TATAMOTORS.NS",
  "TATAPOWER.NS",
  "TATASTEEL.NS",
  "TECHM.NS",
  "RAMCOCEM.NS",
  "TITAN.NS",
  "TORNTPHARM.NS",
  "TORNTPOWER.NS",
  "UPL.NS",
  "ULTRACEMCO.NS",
  "UNIONBANK.NS",
  "UBL.NS",
  "VGUARD.NS",
  "VAKRANGEE.NS",
  "VEDL.NS",
  "VOLTAS.NS",
  "WIPRO.NS",
  "WOCKPHARMA.NS",
  "YESBANK.NS",
  "ZEEL"];
const lookAllStocks = async function() {
  let signal = 0;
  console.log('For Date',TimeUtilsObj.getDate({p_date:0}));
  for(let i =0;i<STOCKS.length;i++){
    const back_test_day = await new BackTestKlass({scrip:STOCKS[i], sr_merge_margin: 0.005, period: 'd', sr_period: 61}).run();

    const back_test_week = await new BackTestKlass({scrip:STOCKS[i], sr_merge_margin: 0.01, period: 'w', sr_period: 366}).run();

    const back_test_month = await new BackTestKlass({scrip:STOCKS[i], sr_merge_margin: 0.02, period: 'm', sr_period: 1830}).run();

    if (/*back_test_day.todo === 'SELL' &&*/ ((back_test_day && back_test_week) || back_test_day.points > 1)) {
      if (back_test_day) console.log(STOCKS[i], 'Day', back_test_day.todo, 'Points',back_test_day.points, 'Price' ,back_test_day.dpPrice, 'CurrentPrice', back_test_day.currentPrice);
      if (back_test_week) console.log(STOCKS[i],'Week',back_test_week.todo, 'Points',back_test_week.points,'Price', back_test_week.dpPrice, 'CurrentPrice', back_test_day.currentPrice);
      if (back_test_month) console.log(STOCKS[i],'Month',back_test_month.todo, 'Points',back_test_month.points,'Price', back_test_month.dpPrice, 'CurrentPrice', back_test_day.currentPrice);
    }
  }
  console.log('From', STOCKS.length);
};

lookAllStocks().then(function(){});
// var looper = async function () {
//   while(true) {
//     var response = await getQuote();
//     // see the docs for the full list
//     // console.log(response['price']['regularMarketPrice']);
//     console.log(JSON.stringify(response['recommendationTrend']));
//
//   }
// };
//
// var getQuote =  function() {
//   return new Promise(function(resolve, reject){
//     setTimeout(async function(){
//       response = await yahooFinance.quote({
//         symbol: 'TCS.NS',
//         modules: [ 'price' ,'recommendationTrend', 'summaryDetail', 'earnings', 'calendarEvents', 'upgradeDowngradeHistory', 'defaultKeyStatistics','summaryProfile', 'financialData']});
//       resolve(response);
//     },1000);
//   });
//
// };
//
//
// looper().then(console.log);
