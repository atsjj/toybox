export default {};

var coneImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABu0lEQVQ4y52RzW4TMRRGjz3OzDQlqIqigrKrxLIbno89Ekg8ChvEI1RihZCibkqhpRU0jcik0yTz47E9ZuFRIpAKCl7aPufe+13hL7gARoBht9N7/ZK5Ao74zxNFDCTyYAFyZ/jNK1CKhUSNIRqBUDvBvR7EMSjiZ+Aeg+2DvQVf/xOOY4iTIFEkx+AyiA5BHoD5Bm3+IJzuQZr8JngO7RLaDOwUmq+gJ0H0B/xoAP0+JEnXvgJFfBw26Gto15BmYC+hPIH1uw18+AQGA0jSUDmKQEoQ3pcZMHxo5k9v+3+LZKG8T/He41tH6wzOFOhiynJ2wuz0BeOnMD6CooCqBN2ANeBaaB0oXcxxpsQ29zTVjHp5TjH/wPr2PREhTNvA/n6YXWswJkisA1XcnWF1RlP+QK++UOcT6vuP4HLivdCn0aB6ITQpQwbGgLWgyrsJprqhKa7QqzNMcY53OSoKAISP1oCKtwIpQ5Cqyk8x1XdMeYWtrvEuR4ptyhBmdTbciQhE9y4EqGb1eWjqG5ye4l2OYGvfCLrAnAMlAbGRDJWpri9d83PkXW4EhOqy23En8L6TdCIZAYIeMP8FmqHeeHyqoOoAAAAASUVORK5CYII=';

var s = {
  w: 400,
  h: 400,
  cx: 200,
  cy: 200,
  r: 150
};

function d(a) {
  return a * (180 / Math.PI);
}

function r(a) {
  return a * (Math.PI / 180);
}

var svg = d3.select('body')
  .append('svg')
  .attr('width', s.w)
  .attr('height', s.h);

var defs = svg.append('svg:defs');

var pattern = defs.append('svg:pattern')
  .attr('id', 'coneImage')
  .attr('x', 0)
  .attr('y', 0)
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('height', 16)
  .attr('width', 16);

var image = pattern.append('svg:image')
  .attr('x', 0)
  .attr('y', 0)
  .attr('height', 16)
  .attr('width', 16)
  .attr('xlink:href', coneImage);

var g = svg.append('svg:g')
  .attr("transform", "translate(" + s.cx + "," + s.cy + ")");

var frameArc = d3.svg.arc()
  .startAngle(r(-137))
  .innerRadius(s.r - 20)
  .outerRadius(s.r);

var frame = g.append('svg:path')
  .attr('d', frameArc.endAngle(r(92)))
  .attr('class', 'frame');

var meterArc = d3.svg.arc()
  .startAngle(r(-135))
  .innerRadius(s.r - 15)
  .outerRadius(s.r - 5);

var meter = g.append('svg:path')
  .attr('d', meterArc.endAngle(r(90)))
  .attr('class', 'meter');

var ng = g.append('svg:g');

var base = ng.append('svg:circle')
  .attr('cy', 0)
  .attr('cx', 0)
  .attr('r', 7);

var needle = ng.append('svg:path')
  .attr('d', 'M0,0L-2.5,0L-1,-75L1,-75L2.5,0L0,0')
  .attr('stroke-width', '0.5px')
  .attr('stroke', '#000')
  .attr('fill', '#000');

var kg = ng.append('svg:g')
  .attr("transform", "translate(0, -14)");

var knob = kg.append('svg:circle')
  .attr('cy', 0)
  .attr('cx', 0)
  .attr('r', 5);

var gem = kg.append('svg:circle')
  .attr('cy', 0)
  .attr('cx', 0)
  .attr('r', 3)
  .attr('class', 'gem');

ng.call(spin, 30000, false);
meter.call(ark, 30000, false);

function spin(selection, duration, back) {
  selection.transition()
    .ease('bounce')
    .duration(duration / 2)
    .attrTween('transform', function() {
      var b = (back) ? -135 : 90;
      var e = (back) ? 90 : -135;
      return d3.interpolateString('rotate(' + b + ')', 'rotate(' + e + ')');
    });

  setTimeout(function() { spin(selection, duration, !back); }, duration);
}

function ark(selection, duration, back) {
  selection.transition()
    .ease('bounce')
    .duration(duration / 2)
    .attrTween('d', function(d) {
      var b = (back) ? -135 : 90;
      var e = (back) ? 90 : -135;
      var i = d3.interpolateNumber(r(b), r(e));

      return function(t) {
        return meterArc.endAngle(i(t))();
      };
    });

  setTimeout(function() { ark(selection, duration, !back); }, duration);
}
