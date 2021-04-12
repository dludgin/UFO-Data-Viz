var w = 1000;
var h = 700;
const maxYear = 2019;
const minYear = 2009;
const maxDate = "2019-12-31";
const minDate = "2009-01-01";



  //histogram setup
var margin = {top: 20, right: 30, bottom: 20, left: 20},
    width = 600,
    height = 60;

    const MARGIN = { LEFT: 100, RIGHT: 100, TOP: 50, BOTTOM: 100 }
    const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

    // parse the date / time
    // var parseDate = d3.timeParse("%Y-%m-%d");
    // var parseYear = d3.timeParse("%Y");
    // var parseTime = d3.timeParse("%b %Y");
    // var formatDate = d3.timeFormat("%b %Y");

    const parseTime = d3.timeParse("%Y-%m-%d")
    const formatTime = d3.timeFormat("%b %Y")
    // console.log(parseTime(maxDate))


    
    var x = d3.scaleTime()
          .domain([new Date(minYear, 1, 1), new Date(maxYear, 1, 1)])
          .rangeRound([0, width]);
    const y = d3.scaleLinear()
            .range([height - margin.top, margin.bottom]);

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeMonth));

        const witnessAccount = d3.select("body").append("div")
        .attr("class", "witnessAccount")
        .style("opacity", 0);
    // witness.show = function {
    //           witnessAccount.transition()
    //            .duration(200)
    //             .style("opacity", .9);
    //           witnessAccount.html("Date: " + d.Date + "<br/>Duration: " + d.durationMin + " minutes <br/>" + "Shape: " + d.Shape + "<br/> <br/> Witness's Account: <br/>" + d.Text + "<br/> <br/> Link to Report: <br/>" + d.report_link)
    //             .style("left", width + 30)
    //             // .style("background", "black")
    //             .style("top", 80);
              
              // d3.select(this)
              //   .attr("fill", "yellow")
              //   .attr("d", symbol.size(64 * 4));

            // })

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svgH = d3.select("#histo-area").append("svg")
        // .attr("transform", "translate(" + 10 + "," + 0 + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", 
             "translate(" + margin.left + "," + 0 + ")");
        
        
    //Map Setup
    

    var svg = d3.select("#chart-area").append("svg").attr("preserveAspectRatio", "xMinYMin meet").style("background-color","#000000")
        .attr("viewBox", "0 0 " + w + " " + h)
        .classed("svg-content", true);
    var projection = d3.geoAlbersUsa().translate([w/2, h/2]);
    var path = d3.geoPath().projection(projection);
    // console.log(path)

    const tip = d3.tip()
    .attr('class', 'd3-tip')
        .html(d => {
            let text = `<strong>City:</strong> <span style='color:red;text-transform:capitalize'>${d.City}</span><br>`
            text += `<strong>State:</strong> <span style='color:red;text-transform:capitalize'>${d.State}</span><br>`
            text += `<strong>Shape:</strong> <span style='color:red'>${d.Year}</span><br>`
            text += `<strong>Summary:</strong> <span style='color:white'>${d.Summary}</span><br>`
            
            return text
        })
    

    const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    

    
    // g.append("path")
    //     .attr("class", "line")
    //     .attr("fill", "none")
    //     .attr("stroke-width", "3px")
    //     .on("mouseover", tip.show)
    //     .on("mouseout", tip.hide);

    let time = 0
    g.call(tip)


    $("#date-slider").slider({
        range: true,
        max: parseTime(maxDate).getTime(),
        min: parseTime(minDate).getTime(),
        step: 374112,
	    values: [
            parseTime(minDate).getTime(),
            parseTime(maxDate).getTime()
        ],
        // slide: updateRange,
        slide: (event, ui) => {
            $("#dateLabel1").text(formatTime(ui.values[0]))
		    $("#dateLabel2").text(formatTime(ui.values[1]))
            // update(formattedData)
        },
        stop: (event, ui) => {
            update(formattedData)
        }
    })

    // var label = slider.append("text")  
    //     .attr("class", "label")
    //     .attr("text-anchor", "middle")
    //     .text(formatDate(startDate))
    //     .attr("transform", "translate(0," + (-25) + ")")
    // function updateRange() {
    //     $('#dateLabel1').text($('#date-slider').slider("values", 0));
    //     $('#dateLabel2').text($('#date-slider').slider("values", 1));
    //     update(formattedData);
    // }
    // $( "#date-slider" ).draggable({
    //     create: function( event, ui ) {
    //         $("#dateLabel1").text(ui.values[0])
	// 	    $("#dateLabel2").text(ui.values[1])
    //     }
    //   });
    // console.log($("#date-slider").slider("values"))

    // $( "#data-slider" ).on( "dragcreate", function( event, ui ) {} );


    // $("#date-slider").slider("value", Number(time + 1960))
    // console.log($("#date-slider"))

 

    
        
        
    // load data  
    var usMap = d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json");
    var sightings = d3.csv("ufoV6(10yr without text).csv");
   
Promise.all([usMap, sightings]).then(function(values){    
 // draw map
    svg.selectAll("path")
        .data(values[0].features)
        .enter()
        .append("path")
        .attr("class","continent")
        .attr("d", path),

        // formattedData = (values[1]).filter(d => { return ((d.State === 'IL'))})
        formattedData = (values[1]).filter(d => { return ((d.State !== 'WA') && (d.State !== 'DE') && (d.State !== 'GA'))})
        // && (d.Year >= 2009) && (d.Year <= 2010)
        // formattedData = (values[1])
        // formattedData.forEach(function(d) {
        //     d.Date = parseDate(d.Date)
        //     d.Year = d.Year
        // });
        // console.log(formattedData)

        formattedData.forEach(function(d) {
            // console.log(([d.Longitude, d.Lattitude])[0])
            // d.date = parseDate(d.Date)
            // d.year = d.Year
            d.Lat = projection([d.Longitude, d.Lattitude])[0]
            d.Long = projection([d.Longitude, d.Lattitude])[1]
            d.date = parseTime(d.Date)
            d.year = d.Year
        });

        // formattedData.forEach(function(d) {
        //     d.date = parseDate(d.Date)
        //     d.year = d.Year
        // });

        var bins = histogram(formattedData);

        y.domain([0, d3.max(bins, function(d) { return d.length; })]);


        svgH.selectAll("rect")
            .data(bins)
            .enter().append("rect")
            .attr("opacity",.8)
            .attr("fill", "#ccff40")
            .attr("rect-anchor","center,bottom")
            .attr("x", 1)
            .attr("transform", function(d) {
                return "translate(" + (x(d.x0)-1) + "," + y(d.length) + ")"; })
            .attr("width", function(d) {
                return ((width/bins.length)*.9) })
            .attr("height", function(d) { return height - y(d.length); })

        // add the x Axis
        svgH.append("g")
            .attr("transform", "translate(0," + 10 + ")")
            .call(d3.axisBottom(x));

     
      
        // // group the data for the bars
        // var bins = histogram(values[1]);
      
        // // Scale the range of the data in the y domain
        // y.domain([0, d3.max(bins, function(d) { return d.length; })]);
        
        // svgH.selectAll("rect")
        //     .data(bins)
        //     .enter().append("rect")
        //     .attr("x", 1)
        //     .attr("transform", function(d) {
        //         return "translate(" + x(d.x0) + "," + (y(d.length) + 30) + ")"; })
        //     .attr("width", (width/132))
        //     .attr("height", function(d) { return height - y(d.length); })
            
      
        // // add the x Axis
        // svgH.append("g")
        //     .attr("transform", "translate(0," + 10 + ")")
        //     .call(d3.axisBottom(x));

        update(formattedData);

        
    }); 

    function update(data) {
        const t = d3.transition()
		    .duration(5000)

        // console.log(data)
        const sliderValues = $("#date-slider").slider("values")
        // console.log(sliderValues[0])


        const filteredData = data.filter(d => { return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]))
        })
        // const filteredOutData = data.filter(d => { return ((d.Year < sliderValues[0]) && (d.Year > sliderValues[1]))
        // })

        const circles = svg.selectAll("circle")
            .data(filteredData)

 


        circles.exit()
            // .attr("class","removecircles")
            .transition(t)
              .attr("r", "0px")
              .attr("opacity", 0)
              .remove()
        
        circles.enter().append("circle")
            .data(filteredData)
            .attr("r", "0px")
            .merge(circles)
            .attr("class","circles")
                .attr("cy", function(d) {return (d.Long);})
                .attr("cx", function(d) {return (d.Lat);})
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                // .on("click", tip.hide)
                .transition(t)
                    .attr("r", "1px");

            // const rectX = d3.scaleLinear()
            //     .domain([2009, 2019])
            //     .range([0, width])
            
            // svgH.select('rect')
            //     .remove()
            // // const rects = svgH.select('rect')
        
            // svgH.append('rect')
            //     .attr('x', rectX(sliderValues[0]))
            //     .attr('y', 0)
            //     .attr('height', height)
            //     .attr("opacity", .3)
            //     .attr('width', ((rectX(sliderValues[1])) - (rectX(sliderValues[0]))))
            //     .attr('fill', 'red');
            // console.log((rectX(sliderValues[0])))

        // const rects = svgH.selectAll("rect")

 


        // rects.exit()
        //     // .transition(t)
        //     //   .attr("r", "0px")
        //     //   .attr("opacity", 0)
        //       .remove()
        
        // rects.enter().append("circle")
        //     .data(filteredData)
        //     .attr("r", "0px")
        //     .merge(circles)
        //     .attr("class","circles")
        //         .attr("y", function(d) {return (d.Long);})
        //         .attr("x", function(d) {return (d.Lat);})
        //         .on("mouseover", tip.show)
        //         .on("mouseout", tip.hide)
        //         .transition(t)
        //             .attr("r", "2px");
        // console.log(circles)
                // group the data for the bars

        // data.forEach(function(d) {
        //     d.date = parseDate(d.Date)
        //     d.year = d.Year
        // });

        // var bins = histogram(filteredData);

        // y.domain([0, d3.max(bins, function(d) { return d.length; })]);


        // svgH.selectAll("rect")
        //     .data(bins)
        //     .enter().append("rect")

        //     .attr("x", 1)
        //     .attr("transform", function(d) {
        //         return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        //     .attr("width", function(d) {
        //         return ((width/bins.length)*.9) })
        //     .attr("height", function(d) { return height - y(d.length); })

        // // add the x Axis
        // svgH.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));
        
}

