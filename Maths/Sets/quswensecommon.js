(function(window){
    'use strict';
	
	function define_library(){
		var QuswenseCommon = {};
		
		QuswenseCommon.resizeSvgBasedOnChilds = function(svgid){
			var  svg = d3.select(svgid);
			var  bbox = svg.node().getBBox();

			// Add 10 padding for some breathing space    
			svg.attr("width", bbox.x + bbox.width);
			svg.attr("height", bbox.y + bbox.height);
		}
		
		QuswenseCommon.fixedFromCharCode = function(codePt) {
			if (codePt > 0xFFFF) {
				codePt -= 0x10000;
				return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
			}
			else {
				return String.fromCharCode(codePt);
			}
		}

		return QuswenseCommon;
	}
	
	//define globally if it doesn't already exist
    if(typeof(QuswenseCommon) === 'undefined'){
        window.QuswenseCommon = define_library();
    }
    else{
        console.log("QuswenseCommon already defined.");
    }
	
	if(typeof(d3) === 'undefined'){
		console.log("d3 not defined.");
	}
	
})(window);