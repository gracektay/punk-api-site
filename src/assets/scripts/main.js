/**
 * Dynamit Code Day Punk API
 */

// Punk API endpoint
const API_ENDPOINT = 'https://api.punkapi.com/v2/beers?page=2&per_page=80';

console.log('We Werkin\'');

var $ = require('jquery');
var axios = require('axios');

//TODO: Find load button
$(document).ready(function () {
    var grid = $('#data-grid');

    $('#load-data').click(function () {
        $('#load-data').hide();
        grid.show();
        $('#dash-view').css('height', '100%');

        //TODO: Load Data for beers
        axios.get(API_ENDPOINT)
            .then(function (response) {
                if (response.status === 200) {
                    var itemsPerRow = 4;
                    var data = response.data;
                    var groupedData = [];  

                    var createDiv = function (text, classNames) {
                        return $(`<div>${text}</div>`, { class: classNames });
                    }

                    for (var i = 0; i < data.length; i += itemsPerRow) {
                        groupedData.push(data.slice(i, i + itemsPerRow))
                    }

                    console.log(groupedData.length);

                    for (var i = 0; i < groupedData.length; i++) {
                        var rowData = groupedData[i];
                        var row = createDiv('', 'row');

                        for (var k = 0; k < rowData.length; k++) {
                            var singleDataSet = groupedData[i][k];
                            //console.log(singleDataSet);

                            var column = createDiv('', 'column column-1').attr('id', 'toggle');
                            var image = $(`<img>`, { src: singleDataSet.image_url, alt: singleDataSet.name });
                            var textWrapper = createDiv('', 'content-wrapper');
                            var title = createDiv(singleDataSet.name, '');
                            var abv = createDiv(singleDataSet.abv, '');

                            title.appendTo(textWrapper);
                            abv.appendTo(textWrapper);
                            image.appendTo(column);
                            textWrapper.appendTo(column);
                            column.appendTo(row);
                        };

                        console.log(groupedData.length);
                        
                        row.appendTo(grid);
                    }

                } else {
                    console.log(response.status);
                }
            })




    });


});
//TODO: Loop through data and break into chunks of 4
//TODO: Loop through chunked data, 1 for each row
//TODO: Loop through individual data set
//TODO: Add loading indicator
//TODO: Sort Results
//TODO: Toggle from 4 to 2
//TODO: Load large image from thumbnail
