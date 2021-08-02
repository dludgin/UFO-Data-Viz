var w = 600,
    h = 400,
    centered;
const maxYear = 2019;
const minYear = 2015;
const maxDate = "2019-12-31";
const minDate = "2015-01-01";

const durationBins = 120;

var formatDur = d3.format(",.2~f");

  //histogram setup
var margin = {top: 20, right: 30, bottom: 20, left: 20},
    width = 600,
    height = 60;

    var durWidth = parseInt(d3.select("#duration-area").style("width"),10);

    const MARGIN = { LEFT: 100, RIGHT: 100, TOP: 50, BOTTOM: 100 }
    const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

    const parseTime = d3.timeParse("%Y-%m-%d")
    const formatTime = d3.timeFormat("%b %Y")



    var durScale = d3.scaleLog()
        .domain([.0003, 4, 6000])
        .range(["#CA7437", "#5894C2", "#ffffff"])
        .interpolate(d3.interpolateHcl)
        .base(2);
    
    
    var x = d3.scaleTime()
          .domain([parseTime(minDate).getTime(), parseTime(maxDate).getTime()])
          .rangeRound([0, width]);

    var xD = d3.scaleLog()
          .domain([.00033, 10080])
          .range([0, width])
          .base(2);
    var xDr = d3.scalePow()
          .domain([0, width])
          .range([0, 10080])
          .exponent(327);


        //   console.log(xD.invert(327))


    const y = d3.scaleLinear()
            .range([height,0]);
    
    const yD = d3.scaleLog()
            .base(10)
            .range([height, 0]);

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeMonth));

    var histogramDur = d3.histogram()
        .value(function(d) { return d.Duration_mins; })
        .domain(xD.domain())
        .thresholds(xD.ticks(durationBins));

    var svgH = d3.select("#histo-area").append("svg").style("background-color","#000000").style("color","#ffffff")
        .attr("height", height + margin.top + margin.bottom)
        .attr('viewBox', '0 0 ' + (640) + ' ' + height)
        .append('g')
        .attr("transform", 
             "translate(" + margin.left + "," + margin.bottom + ")");

    var svgDH = d3.select("#duration-area").append("svg").style("background-color","#000000").style("color","#ffffff")
        .attr("height", height + margin.top + margin.bottom)
        .attr('viewBox', '0 0 ' + (640) + ' ' + height)
        .classed("svg-content", true)
        .append('g')
        .attr("transform", 
             "translate(" + margin.left + "," + margin.bottom + ")");
        
        
    //Map Setup
    function getBaseLog(x, y) {
        return Math.log(y) / Math.log(x);
      }
console.log(("#histo-area").width)
    

    var svg = d3.select("#chart-area").append("svg").style("background-color","#000000")
        .attr("viewBox", "0 0 " + w + " " + h)
        .classed("svg-content", true);


    var projection = d3.geoAlbersUsa().translate([w/2, h/(2)]).scale(700);
    var path = d3.geoPath().projection(projection);
    // console.log(path)

    const tip = d3.tip()
        
        .attr('class', 'd3-tip')
            .html(d => {
                let text = `<strong>City:</strong> <span style='text-transform:capitalize'>${d.City}</span><br>`
                text += `<strong>State:</strong> <span style='text-transform:capitalize'>${d.State}</span><br>`
                text += `<strong>Shape:</strong> <span style='text-transform:capitalize'>${d.Shape}</span><br>`
                text += `<strong>Duration:</strong> <span style='text-transform:capitalize'>${formatDur(d.Duration_mins)} mins</span><br>`
                text += `<strong>Summary:</strong> <span style='text-transform:capitalize'>${d.Summary}</span><br>`
                text += `<strong>Click for Full Details</strong>`
                return text
            })
                
    

    const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    
    
    var div = d3.select("#details-area").append("div")
        .attr("class", "tooltip")
        .attr("viewBox", "0 0 " + w + " " + h)

        .style("opacity", 0);
    

    


    let time = 0
    g.call(tip)
    // g.call(tipBig)



    // $(function () {
        $("#date-slider").slider({
            range: true,
            max: parseTime(maxDate).getTime(),
            min: parseTime(minDate).getTime(),
            step: 374112,
            values: [
                parseTime(minDate).getTime(),
                parseTime(maxDate).getTime()
            ],

            slide: (event, ui) => {
                $("#dateLabel1").text(formatTime(ui.values[0])),
                $("#dateLabel2").text(formatTime(ui.values[1]));
                // update(formattedData)
            },
            stop: (event, ui) => {
                update(formattedData)
            },
        });

    
    $("#duration-slider").slider({
        
        range: true,
        max: xD(10080),
        min: 0,
        // step: Math.log(5),
	    values: [
            0,
            10080
        ],
        // slide: updateRange,
        slide: (event, ui) => {
            $("#duration1").text(formatDur(xD.invert((ui.values[0]))) + " min")
		    $("#duration2").text(formatDur(xD.invert((ui.values[1]))) + " min")
            // update(formattedData)
        },
        stop: (event, ui) => {
            update(formattedData)
        }
    })

// let zoom = d3.zoom()
//     .scaleExtent([1, 8])
//     .translateExtent([[-500, -300], [1100, 700]])
//     .on('zoom', () => {
//         svg.attr('transform', d3.event.transform)
//     }, {passive: true});
 
// svg.call(zoom);



// console.log(ui.values[0])
 

    
        
        
    // load data  
    var usMap = d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json");
    var sightings = d3.csv("https://raw.githubusercontent.com/6859-sp21/a4-mapyourbreath/main/ufoV6(2010_2019).csv");
   
Promise.all([usMap, sightings]).then(function(values){    
 // draw map
    svg.selectAll("path")
        .data(values[0].features)
        .enter()
        .append("path")
        .attr("class","continent")
        .attr("d", path)
        // .enter().append("path")
        // .attr("d", path)
        // .on("click", clicked);

        formattedData = (values[1]).filter(d => { return ((d.Year >= '2015'))})
    

  
 


        formattedData.forEach(function(d) {

            d.Lat = projection([d.Longitude, d.Lattitude])[0]
            d.Long = projection([d.Longitude, d.Lattitude])[1]
            d.date = parseTime(d.Date)
            d.year = d.Year
        });


    
        let bins = histogram(formattedData);

        svgH.append("g")
            .attr("transform", "translate(0," + (-(2*margin.bottom)) + ")")
            .call(d3.axisBottom(x));

        
        var binsDur = histogramDur(formattedData);

        


     
      $("#shape-select").on("change", update)


        update()
        
    }); 

    function update() {
        

        const t = d3.transition()
		    .duration(500)
        
        const shape = $("#shape-select").val()



        // console.log(data)
        const sliderValues = $("#date-slider").slider("values")
        // console.log(sliderValues)
        const durationValues = $("#duration-slider").slider("values")
        // console.log(shape)
    
        const filteredData = formattedData.filter(d => { 
            if (shape === "All") {return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]) && (d.Duration_mins >= xD.invert(durationValues[0])) && (d.Duration_mins <= xD.invert(durationValues[1])))}
            else 	{ 
                return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]) && 
                (d.Duration_mins >= xD.invert(durationValues[0])) && (d.Duration_mins <= xD.invert(durationValues[1]))
                && (d.Shape === shape))}
        })

        
        // durScaleSize.domain(filteredData.map(d => d.Duration_mins))


    //    console.log(durScaleSize(4))

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
                .attr("fill", d => durScale((d.Duration_mins)))
                
                
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .attr('d', function(d) {return (d);})
                // .on("click", tip.hide)
                .on("click", function(event, d) {
                    // .style("opacity", 0)
                    d3.select(this)
                       .style("fill", "White")
                       .attr("fill-opacity",".9")
                       .attr("r", "1px");
                    })
                .on("click", function(d) {
                    // .style("opacity", 0)
                    d3.select(this)
                       .attr("fill", "White")
                       .attr("fill-opacity",".9")
                       .attr("r", "1px");
                    div.transition()
                      .duration(200)
                    //   .style("fill","white")
                      .style("opacity", 1);
                    div .html(
                        "<strong>"+"Date:  "+"</strong>" +  (d.Date) + "</br>" +
                        "<strong>"+"Location:  "+"</strong>" +  (d.City) + ", " + (d.State) + "</br>" +
                        "<strong>"+"Shape:  "+"</strong>" +  (d.Shape) + "</br>" +
                        "<strong>"+"Duration of Encounter:  "+"</strong>" +  (formatDur(d.Duration_mins)) + " minutes" + "</br>" + "</br>" +
                        "<strong>"+"Witness Account:"+"</strong>" + "</br>" + (d.Text) + "</br>"+'<a href= "'+d.report_link+' " style="color:#ccff40"" target="_blank" >' + //with a link
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
                    .transition((t))
                        .attr("r", "1.5px")
                        .attr('fill-opacity',.8);

                let bins = histogram(formattedData);
                let binsUpdate = histogram(filteredData);
        
                    // console.log(bins)
                y.domain([0, d3.max(binsUpdate, function(d) { return d.length; })]);
                

                const rects = svgH.selectAll("rect")
                    .data(binsUpdate)

                rects.exit()
                    .transition(t)
                        .attr("height", 0)
                        .attr("y", function(d) { return (height - y(d.length));})
                        .remove()


                rects.enter().append("rect")
                    .attr("height",0)
                    .attr("y", 0)
                    .attr("fill","#ccff40")
                    .merge(rects)
                        .attr("opacity",.8)
                        .attr("rect-anchor","center,bottom")
                        .attr("x", d => x(d.x0))
                        .attr("width", function(d) {return (width/130) })
                        .transition((t))
                            .attr("y", d=> y(d.length))
                            .attr("height", function(d) { return (height - y(d.length)); 
                })


                var binsDurUpdate = histogramDur(filteredData);
                var binsDur = histogramDur(formattedData);
                yD.domain([1, d3.max(binsDur, function(d) { return d.length; })]);
                    
                const rectD = svgDH.selectAll("rect")
                    .data(binsDurUpdate)

                rectD.exit()
                    .transition(t)
                        .attr("height", 0)
                        .attr("y", function(d) { return (height - yD(d.length + 1));})
                        .remove()

                rectD.enter().append("rect")
                    .attr("height",0)
                    .attr("y", 0)
                    .merge(rectD)
                    .attr("opacity",.8)
                    // .attr("fill", "#ccff40")
                    .style("fill", function(d){ return durScale(d.x0)})
                    // .attr("rect-anchor","center,bottom")
                    .attr("rect-anchor","center,bottom")
                    .attr("x", d => xD(d.x0))
                    .attr("width", (width/(50)))
                    .transition(t)
                        .attr("y", d=> yD(d.length + 1))
                        .attr("height", function(d) { return height - yD(d.length + 1); })


                            

                    // add the x Axis

                    svgDH.append("g")
                .attr("transform", "translate(0," + (-(2*margin.bottom)) + ")")
                .attr("class", "axis")
                .call(d3.axisBottom(xD)
                    .ticks(10)
                    .tickFormat(d3.format(",.3~f")));
                

            }


const shapeSelect = document.querySelector('#shape-select');
shapeSelect.addEventListener('change', (event) => {
    const allIcons = document.querySelectorAll('[data-icon]');
    const icon = document.querySelector(`[data-icon="${event.target.value}"]`);
    allIcons.forEach(ic => ic.classList.remove('active'));
    if (icon) {
        icon.classList.add('active');
    }
});
