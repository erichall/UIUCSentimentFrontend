
export const create_dataset = (dataset, data_set_name, stroke_color, axisID) => {
  return {
        label: data_set_name,
        borderColor: stroke_color, 
        backgroundColor: stroke_color,
        pointHitRadius: 10,
        borderCapStyle: 'butt',
        pointColor: stroke_color,
        pointStrokeColor: 'rgba(75,192,192,1)',
        pointHighlightFill: "#fff",
        'data': dataset,
        yAxisID: axisID,
        fill: false,
      };
};

export const create_data = (labels, ...data_sets) => {
  return {
        'labels': labels,
        'datasets': Object.values(Object.assign({}, ...data_sets))
      }; 
  };



Array.prototype.simpleSMA = function(N) {
return this.map(
  function(el,index, _arr) { 
      return _arr.filter(
      function(x2,i2) { 
        return i2 <= index && i2 > index - N;
        })
      .reduce(
      function(current, last, index, arr){ 
        return (current + last); 
        })/(index+1) || 1;
      }); 
};

Array.prototype.EMA = function () {
  const alpha = 0.3;
  return this.map((v, i) => {
    if( i == 0)
      return v;
    return alpha * v + (1 - alpha) * this[i-1]
  })
}

