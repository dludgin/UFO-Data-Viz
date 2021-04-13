var w = 600;
var h = 400;
const maxYear = 2019;
const minYear = 2010;
const maxDate = "2019-12-31";
const minDate = "2010-01-01";



  //histogram setup
var margin = {top: 20, right: 30, bottom: 50, left: 20},
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
          .domain([parseTime(minDate).getTime(), parseTime(maxDate).getTime()])
          .rangeRound([0, width]);
    const y = d3.scaleLinear()
            .range([height, 0]);

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeMonth));


    // const witnessAccount = d3.select("body").append("div")
    //     .attr("class", "witnessAccount")
    //     .style("opacity", 0);

    // function witness() {
    //         svg.append('text')
    //         .html(d => {
    //             let text = `<span style='color:red;text-transform:capitalize'><strong>Witness Account:</strong></span><br>`
    //             text += `<span style='color:white'>${d.Summary}</span><br>`
                
    //             return text
    //         })
    //     }
    // const tipBig = svg.append('text')
    // .attr('class', 'd3-tip')
    //     .html(d => {
    //         let text = `<span style='color:red;text-transform:capitalize'><strong>Witness Account:</strong></span><br>`
    //         text += `<span style='color:white'>${d.Summary}</span><br>`
            
    //         return text
    //     })
    // var witnessAccount = d3.select("#deets").append("div")
    //     .attr("class", "witnessAccount")
    //     .style("opacity", 0);
    // var details = d3.select("#chart-area").append("svg");



    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svgH = d3.select("#histo-area").append("svg").style("background-color","#000000").style("color","#ffffff")
        // .attr("transform", "translate(" + 10 + "," + 0 + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", 
             "translate(" + margin.left + "," + margin.bottom + ")");
        
        
    //Map Setup
    

    var svg = d3.select("#chart-area").append("svg").style("background-color","#000000")
        .attr("viewBox", "0 0 " + w + " " + h)
        .classed("svg-content", true);
    var projection = d3.geoAlbersUsa().translate([w/2, h/(2)]).scale(700);
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
    
    var div = d3.select("#details-area").append("div")
        .attr("class", "tooltip")
        .attr("viewBox", "0 0 " + w + " " + h)
        // .attr("width", w)
        // .attr("height", "40px")
        // .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
        .style("opacity", 0);
    
    // g.append("path")
    //     .attr("class", "line")
    //     .attr("fill", "none")
    //     .attr("stroke-width", "3px")
    //     .on("mouseover", tip.show)
    //     .on("mouseout", tip.hide);
    


    let time = 0
    g.call(tip)
    // g.call(tipBig)




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
    var sightings = d3.csv("ufoV6(2010_2019).csv");
   
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
        // formattedData = (values[1]).filter(d => { return ((d.Year === '2013') && (d.State !== 'WA') && (d.State !== 'DE') && (d.State !== 'GA'))})
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

        formattedData.forEach(function(d) {
            d.date = parseTime(d.Date)
            d.year = d.Year
        });

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
            .attr("height", function(d) { return (height) - y(d.length); })

        // add the x Axis
        svgH.append("g")
            .attr("transform", "translate(0," + (-margin.bottom) + ")")
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
		    .duration(1000)
        
            x.domain([w,0])
            y.domain([0,h])

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
              .attr("fill-opacity", 0)
              .remove()
        
              
        circles.enter().append("circle")
            .attr('fill-opacity', 0)
            .attr("r", "0px")
            .merge(circles)
            
            .attr("class","circles")
                .attr("cy", d => (d.Long))
                .attr("cx", d => (d.Lat))
                .attr("text", d => (d.Summary))
                .attr('d', function(d) {return (d);})
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                // .on("click", tip.hide)
                .on("click", function(d) {
                    // .style("opacity", 0)
                    div.transition()
                      .duration(200)
                      .style("opacity", 1);
                    div .html(
                        "<strong>"+"Date:  "+"</strong>" +  (d.Date) + "</br>" +
                        "<strong>"+"Location:  "+"</strong>" +  (d.City) + ", " + (d.State) + "</br>" +
                        "<strong>"+"Shape:  "+"</strong>" +  (d.Shape) + "</br>" + "</br>" +
                        "<strong>"+"Witness Account:"+"</strong>" + "</br>" + (d.Text) + "</br>" + '<a href= "'+d.report_link+'" target="_blank">' + //with a link
                        "Click to see Full Report" +
                        "</a>")      
                    .style("transform", 
                        "translate(" + 0 + "," + h/(2.5) + ")")
                      .style("top", (h*1.43) + "px")             
                      .style("bottom", (0) + "px")
                      .style("margin-left", (.1*w))
                      .style("margin-right", (.1*w))
                      .style("width", (.8*w));
                    })
                // .html(d => {
                //     let text = `${d.Summary}`
                //     console.log(text)
                //         return text
                //     })
                // .on('click', details())
                .transition((t))
                    .attr("r", "1px")
                    .attr('fill-opacity',.9);
            // console.log(text)
            }


            // function details() {
            //     const tipBig = svg.append('text')
            //         .attr('class', 'd3-tip')
            //             .html(d => {
            //                 let text = `<span style='color:red;text-transform:capitalize'><strong>Witness Account:</strong></span><br>`
            //                 text += `<span style='color:white'>${d.Summary}</span><br>`
            //                     return text
            //                 })
            // }
            // .html(
            //     "Witness Account:" + "</br>" + (d.Text) + "</br>" + "Link to Full Report: " + '<a href>' + // The first <a> tag
            //     (d.report_link) +
            //     "</a>")     
            //     .style("left", (d3.event.pageX) + "px")             
            //     .style("top", (d3.event.pageY - 28) + "px");
            //   });
            
            // const deets = d3.select("#chart-area").append("svg")
            //     .attr('font-size',12)
            //     .html(d => {
            //         let text = `<span style='color:red;text-transform:capitalize'><strong>Witness Account:</strong></span><br>`
            //         text += `<span style='color:white'>${d.Summary}</span><br>`
                    
            //         return text
            // })
            // .attr('d', d => symbol())

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
        
// }

