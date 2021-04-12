var margin = {top: 20, right: 30, bottom: 20, left: 20},
    width = 600,
    height = 60;


var details = d3.select("#details-area").append("svg")
        // .attr("transform", "translate(" + 10 + "," + 0 + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", 
             "translate(" + margin.left + "," + 0 + ")");