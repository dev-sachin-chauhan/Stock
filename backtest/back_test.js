const rootPrefix = '..'
  , TimeUtilsObj = require(rootPrefix + '/common_utils/time_util')
  , TechnicalAnalysisKlass = require(rootPrefix + '/common_utils/technical_analysis')
;

const yahooFinance = require('yahoo-finance');


const BackTest = function (params) {
  const oThis = this
  ;
  params = params || {};
  oThis.scrip = params.scrip || 'PVR.NS';
  oThis.rrRatio = params.rr_ratio || 2;
  oThis.period = params.period || 'd';
  oThis.btPeriod = params.bt_period || 0;
  oThis.maPeriod = params.ma_period || 100;
  oThis.srPeriod = params.sr_period || 100;
  oThis.maxPeriod = Math.max(oThis.maPeriod, oThis.srPeriod);
  oThis.srMergeMargin = params.sr_merge_margin || 0.005;

  oThis.technicalData = new TechnicalAnalysisKlass();
};

BackTest.prototype.run = async function () {
  const oThis = this
  ;

  return await oThis.buildTechnicalData();


};

BackTest.prototype.buildTechnicalData = async function () {
  const oThis = this
    , ohlcData = []
    , param = {
      symbol: oThis.scrip,
      from: TimeUtilsObj.getDate({p_date: oThis.maxPeriod + oThis.btPeriod}),
      to: TimeUtilsObj.getDate({p_date:1}),
      period: oThis.period
    }
  ;
  let historical_data = null;

  // console.log(param);
  let change = 0;
  try {
    //get current price
    let currentPrice = await yahooFinance.quote({symbol: oThis.scrip, modules: [ 'price' ]});
    ohlcData.push({price: currentPrice['price']['regularMarketPrice']
        , high: currentPrice['price']['regularMarketDayHigh']
        , low:currentPrice['price']['regularMarketDayLow']
        , volume:currentPrice['price']['regularMarketVolume']
        , date:currentPrice['price']['regularMarketTime'].toString().slice(0, 10)});

    historical_data = await yahooFinance.historical(param);

    for (let index = 0; index < historical_data.length; index++) {
      let entity = historical_data[index]
        // , stockData = {price :(Math.round(entity['close'] * 100)/100), volume: entity['volume']}
        , stockData = {
          date: entity['date'].toISOString().slice(0, 10),
          price: entity['close'],
          volume: entity['volume'],
          high: entity['high'],
          low: entity['low']
        }
      ;
      ohlcData.push(stockData);
    }
    //change = ohlcData[0]['price'] - ohlcData[1]['price'];
  } catch (err) {
    console.error("Error while fetching historical data of ", oThis.scrip, err, historical_data);
  }

  await oThis.technicalData.init(ohlcData, oThis.srMergeMargin);

  let list = oThis.technicalData.getSRList();
  let listLen = list.length;
  let pivotPoints = 0;
  if (listLen > 0) {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += list[i].pivot;
      pivotPoints += 1;
    }
    let DPPrice = (sum * 1.0) / listLen;
    change = DPPrice - ohlcData[0].price;
    let obj = {script: oThis.scrip, currentPrice: ohlcData[0].price ,todo: change >= 0 ? 'SELL' : 'BUY', dpPrice: DPPrice, points: pivotPoints};
    //console.log(obj);
    return obj;
  } else {
    return 0;
  }
  // console.log(oThis.technicalData.getSRList());
};

module.exports = BackTest;
