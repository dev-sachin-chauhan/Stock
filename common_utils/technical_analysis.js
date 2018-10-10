const TA = function () {
};

TA.prototype.init = async function (ohlcList, mergeMargin) {
  const oThis = this
  ;

  oThis.ohlcList = ohlcList;
  oThis.srList = [];
  oThis.mergeMargin = mergeMargin || 0.005;

  // await oThis.buildSR();
  await oThis.checkSR();
};

TA.prototype.checkSR = async function () {
  const oThis = this;
  let currentPrice = oThis.ohlcList[0].price
    , margin = (currentPrice*oThis.mergeMargin)
    , upperMargin = currentPrice + margin
    , lowerMargin = currentPrice - margin
  ;

  //console.log("Margin",margin);

  for (let index = 1; index< oThis.ohlcList.length-1; index ++) {
    let currentEntity = oThis.ohlcList[index]
      , prevEntity = oThis.ohlcList[index - 1]
      , nextEntity = oThis.ohlcList[index + 1]
    ;

    if (Math.min(prevEntity.low,nextEntity.low) > currentEntity.low) {
      if (upperMargin > currentEntity.low && lowerMargin < currentEntity.low){
        currentEntity['pivot']=currentEntity.low;
        oThis.srList.push(currentEntity);
      }
    } else if(Math.max(prevEntity.high,nextEntity.high) < currentEntity.high) {
      if (upperMargin > currentEntity.high && lowerMargin < currentEntity.high){
        currentEntity['pivot']=currentEntity.high;
        oThis.srList.push(currentEntity);
      }
    }
  }
};

TA.prototype.buildSR = async function () {
  const oThis = this
    , tempList = []
  ;
  oThis.srList.length = 0;
  let cs1 = 0
    , cs2 = 0
    , cs3 = 0
    , cs4 = 0
    , cs5 = 0
    , cs6 = 0
  ;
  for (let index = 0; index< oThis.ohlcList.length; index ++) {
    let entity = oThis.ohlcList[index]
      , currentPrice = entity['price']
    ;
    if (Math.max(cs1, cs2, cs3, cs5, cs6 ,currentPrice) < cs4 || Math.min(cs1, cs2, cs3, cs5, cs6, currentPrice) > cs4) {
      tempList.push(cs4);
    }
    cs1 = cs2;
    cs2 = cs3;
    cs3 = cs4;
    cs4 = cs5;
    cs5 = cs6;
    cs6 = currentPrice;
  }

  tempList.sort();

  oThis.srList.push(tempList[0]);

  for (let index = 1; index< tempList.length; index++) {
    let price = tempList[index]
      , srPrice = oThis.srList[oThis.srList.length-1]
    ;


    if (srPrice + srPrice*oThis.mergeMargin >= price ) {
      oThis.srList[oThis.srList.length-1] = (srPrice + price) / 2;
    } else {
      oThis.srList.push(price);
    }
  }
};

TA.prototype.getSRList = function () {
  const oThis = this
  ;

  return oThis.srList;
};

module.exports = TA;

// const tu = require('./common_utils/technical_analysis')