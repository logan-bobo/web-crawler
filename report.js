function report(results) {
  let orderedKeys = sortDictVal(results);

  for (let k of orderedKeys) {
    console.log(`Found ${results[k]} internal link/s to ${k}`);
  }
}

function sortDictVal(dict) {
  let toOrder = [];

  for (let item of Object.keys(dict)) {
    toOrder.push([item, dict[item]]);
  }

  toOrder.sort((first, seccond) => {
    return seccond[1] - first[1];
  });

  var finalKeys = toOrder.map((e) => {
    return e[0];
  });

  return finalKeys;
}

module.exports = {
  report,
  sortDictVal,
};
