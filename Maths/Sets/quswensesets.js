(function(window){
    'use strict';
	
	function define_library(){
		var QuswenseSets = {};
		
		QuswenseSets.gNaturalN = function(divid, space){
			gEnumSets(divid, space, 1, 3, '\u2115');
		}
		
		QuswenseSets.gWholeN = function(divid, space){
			gEnumSets(divid, space, 0, 4, QuswenseCommon.fixedFromCharCode(0x1d54e));
		}
		
		QuswenseSets.gIntegersN = function(divid, space){
			gEnumSets(divid, space, -4, 9, '\u2124');
		}
		
		QuswenseSets.gRationalN = function(divid, space){
			space = space || 3;
			var dividnormalize = divid.substr(1);
			var svg = d3.select(divid).append('svg').attr("style", "font-family: 'Cambria Math'");
			var textsvg = svg.append('text').attr("x", "5").attr("y", "20");
			var i = 0;
			var ts_hdata = ["\u211a","=","{",QuswenseCommon.fixedFromCharCode(0x0FF5C),QuswenseCommon.fixedFromCharCode(0x1d45d),",",
			QuswenseCommon.fixedFromCharCode(0x1d45e),"\u220a","\u2124","and",QuswenseCommon.fixedFromCharCode(0x1d45e),"\u2260",
			QuswenseCommon.fixedFromCharCode(0x1d7e2),"}"];
			var ts_fracdata = [QuswenseCommon.fixedFromCharCode(0x1d45d),'\u2015'];
			
			textsvg.selectAll('tspan').data(ts_hdata).enter()
				.append('tspan').text(function(d) { return d; })
				.attr("id", function(d, i) { return dividnormalize + "_t" + i; })
				.attr("dx", space ).attr("alignment-baseline", "middle");
			d3.select(divid + '_t0').attr("font-size", "20px");
			d3.select(divid + '_t3').attr("dx", 4 * space );
			
			var dy = 12;
			ts_fracdata.forEach(function(d, i) {
				textsvg.append('tspan').text(d)
				.attr("x", "50" )
				.attr("id", function(d, i) { return dividnormalize + "_t" + i + ts_hdata.length; })
				.attr("y", dy + 11 * i );
			});
			textsvg.append('tspan').text(QuswenseCommon.fixedFromCharCode(0x1d45e))
				.attr("x", "50" )
				.attr("id", function(d, i) { return dividnormalize + "_t" + i + ts_fracdata.length; })
				.attr("y", dy + 11 + 5 );
			
			QuswenseCommon.resizeSvgBasedOnChilds(divid + ' svg');
		}
		
		function gEnumSets(divid, space, min, count, leftchar) {
			space = space || 3;
			var numarray = gEllipsesRangeNumberSet(min, count);
			numarray.unshift('=');
			numarray.unshift(leftchar);
			
			gd3EnumerateSet(divid, space, numarray);
		}
				
		function gd3EnumerateSet(divid, space, array) {
			space = space || 3;
			var dividnormalize = divid.substr(1);
			var textsvg = d3.select(divid).append('svg').attr("style", "font-family: 'Cambria Math'")
				.append('text').attr("x", "5").attr("y", "15");
				
			textsvg.selectAll("tspan").data(array).enter()
				.append('tspan')
				.attr("id", function(d, i) { return dividnormalize + "_t" + i; } )
				.attr("dx", function(d, i) { return space; } )
				.text(function(d) { return d } );
			
			d3.select(divid + '_t0').attr("font-size", "20px").attr("alignment-baseline", "baseline");
			
			QuswenseCommon.resizeSvgBasedOnChilds(divid + ' svg');
		}
		
		function gEllipsesRangeNumberSet(min, count) {
			var newarray = ['{'];
			for(var i = 0; i < count; ++i) {
				newarray.push(min + i);
				newarray.push(',');
			}
			newarray.push('...');
			newarray.push('}');
			return newarray;
		}
		
		function h_tspan(svge,ch,id,dx,align) {
			svge.append('tspan').text(ch).attr("id", id).attr("dx", dx ).attr("alignment-baseline", align);
		}
		
		return QuswenseSets;
	}
	
	//define globally if it doesn't already exist
    if(typeof(QuswenseSets) === 'undefined'){
        window.QuswenseSets = define_library();
    }
    else{
        console.log("QuswenseSets already defined.");
    }
	
	if(typeof(d3) === 'undefined'){
		console.log("d3 not defined.");
	}
	
	if(typeof(QuswenseCommon) === 'undefined'){
		console.log("QuswenseCommon not defined.");
	}
	
})(window);