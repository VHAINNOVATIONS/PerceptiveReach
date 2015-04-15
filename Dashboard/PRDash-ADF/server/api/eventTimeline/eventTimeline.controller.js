'use strict';

// Timeline Data Format
// Top Properties
//    minY: minimum y value
//    maxY: maximum y value
//    chart: array of series; each series corresponds to a data type
// Series Properties
//    key: Series name
//    bar: Show values as bars
//    hideLine: Only show data points; do not connect data point with lines
//    color: color for the series
//    values: array of data points
// Data Point Properties
//    date: In MMDDYYYY format
//    value: Y value (choose something constant if y values does not make sense for this series)
//    tooltipLInes: This is an array of strings date will make tooltip popup content.
//
// {
//     "minY": 0,
//     "maxY": 120,
//     "chart": [
//         {
//             "key": "Medication",
//             "bar": false,
//             "hideLine": false,
//             "values": [
//                 {
//                     "date": "04162012",
//                     "value": 95,
//                     "tooltipLines": [
//                         "Medication Score: 95",
//                         "Medication: Aspirin"
//                     ]
//                 },
//                 {
//                     "date": "05092012",
//                     "value": 49,
//                     "tooltipLines": [
//                         "Medication Score: 49",
//                         "Medication: Aspirin"
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "Appointment",
//             "bar": false,
//             "hideLine": true,
//             "values": [
//                 {
//                     "date": "04092012",
//                     "value": 110,
//                     "tooltipLines": [
//                         "Appointment: Physical Checkup"
//                     ]
//                 },
//                 {
//                     "date": "05022012",
//                     "value": 110,
//                     "tooltipLines": [
//                         "Appointment: Physical Checkup"
//                     ]
//                 },
//                 {
//                     "date": "06092012",
//                     "value": 110,
//                     "series": 1,
//                     "tooltipLines": [
//                         "Appointment: Physical Checkup"
//                     ]
//                 }
//             ],
//             "color": "#000000"
//         },
//         {
//             "key": "Therapy",
//             "bar": true,
//             "hideLine": false,
//             "values": [
//                 {
//                     "date": "04052012",
//                     "value": 30,
//                     "tooltipLines": [
//                         "Therapy Score: 30",
//                         "Therapy: Bethesda Center"
//                     ]
//                 },
//                 {
//                     "date": "05142012",
//                     "value": 99,
//                     "tooltipLines": [
//                         "Therapy Score: 99",
//                         "Therapy: Bethesda Center"
//                     ]
//                 },
//                 {
//                     "date": "06022012",
//                     "value": 63,
//                     "tooltipLines": [
//                         "Therapy Score: 63",
//                         "Therapy: Bethesda Center"
//                     ]
//                 }
//             ]
//         }
//     ]
// }

var moment = require('moment');

var mockData = function(dateRange) {
    var startDate = moment(dateRange.startDate, 'MMDDYYYY');
    var endDate = moment(dateRange.endDate, 'MMDDYYYY');
    var descriptions = ['Aspirin', 'Physical Checkup', 'Bethesda Center'];
    var mockData = [];
    ["Medication", "Appointment", "Therapy"].forEach(function(key, index) {
        var mockValues = [];
        for (var year=startDate.year(); year<=endDate.year(); ++year) {
            var startMonth = (year === startDate.year()) ? startDate.month() : 0; 
            var endMonth = (year === endDate.year()) ? endDate.month(): 12;
            for (var month=startMonth; month<endMonth; ++month) {
                var day = Math.floor(Math.random() * 26) + 1;
                var value = key === 'Appointment' ? 110 : Math.floor(Math.random() * 100);
                var m = moment({ year :year, month :month, day :day});
                var element = {
                    date: m.format('MMDDYYYY'),
                    value: value
                };
                if (key === 'Appointment') {
                    element.tooltipLines = [
                        key + ': ' + descriptions[index]
                    ];
                } else {
                    element.tooltipLines = [
                        key + ' Score: ' + value,
                        key + ': ' + descriptions[index]
                    ];
                }
                mockValues.push(element);
            }
      }
      var bar = (key === 'Therapy') ? true : false;
      var hideLine = (key === 'Appointment') ? true : false;
      var series = {
        key: key,
        bar: bar,
        hideLine: hideLine,
        values: mockValues
      };
      if (key === 'Appointment') {
        series.color = '#000000';
      }
      mockData.push(series);
    });
    var data = {
        minY: 0,
        maxY: 120,
        chart: mockData
    };
    return data;
};

exports.index = function(req, res) {
    res.header("content-type: application/json");

    var start = req.param('start');
    var end = req.param('end');

    var data = mockData({startDate: start, endDate: end});

    res.send(data);
};
