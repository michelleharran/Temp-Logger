// Robert Cudmore
// 20180628

var myurl = window.location.href;
console.log(myurl)

//Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv", function(err, rows){
myReplot = function () {
	
	Plotly.d3.csv(myurl + 'log', function(err, rows){
  
		function unpack(rows, key) {
			return rows.map(function(row) { return row[key]; });
		}

		var headerNames = Plotly.d3.keys(rows[0]);
	
		var headerValues = [];
		var cellValues = [];
		var temperatureValues = [];
		var humidityValues = [];
		var xValues = [];
		for (i = 0; i < headerNames.length; i++) { 
			headerValue = [headerNames[i]];
			headerValues[i] = headerValue; 
			cellValue = unpack(rows, headerNames[i]); 
			cellValues[i] = cellValue;

			if (headerNames[i] == 'Temperature') {
				temperatureValues = cellValue
			}
			if (headerNames[i] == 'Humidity') {
				humidityValues = cellValue
			}
		}
  
		// clean date
		for (i = 0; i < cellValues[1].length; i++) {
			//assuming 'Date' in column 1, 'Time' in column 2
			var dateValue = cellValues[1][i].split(' ')[0] + ' ' + cellValues[2][i].split(' ')[0]
			cellValues[1][i] = dateValue
		} 

		var data = [{
		  type: 'table',
		  columnwidth: [200,600,600,400,400,400,400,400,400],
		  columnorder: [0,1,2,3,4,5,6,7,8,9],
		  header: {
			values: headerValues, 
			align: "center",
			line: {width: 1, color: 'rgb(50, 50, 50)'},
			fill: {color: ['rgb(100, 100, 100)']},
			font: {family: "Arial", size: 12, color: "white"}
		  },
		  cells: {
			values: cellValues,
			align: ["center", "center"],
			line: {color: "black", width: 1},
			//fill: {color: ['rgba(228, 222, 249, 0.65)','rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)']},
			fill: {color: ['rgba(220, 220, 220, 0.65)']},
			font: {family: "Arial", size: 11, color: ["black"]}
		  }
		}]

		var layout = {
		  //title: "Bitcoin mining stats for 180 days",
		  height: 600,
		  width: 1000,
		}

		Plotly.plot('graph', data, layout); 

		//
		// my plot

		xValues = cellValues[1] // this should be a string 'yyyy-mm-dd HH:MM:SS'

		var trace1 = {
		  x: xValues,
		  y: temperatureValues,
		  name: 'Temperature',
		  mode: 'lines+markers',
		  type: 'scatter'
		};

		var trace2 = {
		  x: xValues,
		  y: humidityValues,
		  name: 'Humidity',
		  yaxis: 'y2',
		  mode: 'lines+markers',
		  type: 'scatter'
		};

		var mylayout = {
			yaxis: {
				title: 'Temperature (deg celcius)'
			},
			yaxis2: {
				title: 'Humidity (%)',
				overlaying: 'y',
				side: 'right'
			}
		}

		mydata = [trace1, trace2]

		Plotly.plot('myplot', mydata, mylayout)

	});  
};


myReplot();

//setInterval(myReplot, 500)
