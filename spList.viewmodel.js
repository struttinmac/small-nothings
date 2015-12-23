"use strict";

var custReqChartBuilder = window.custReqChartBuilder || {};

custReqChartBuilder.acceptedBarChart = function () {
    var load = function () {
        $.when(
            //
            custReqChartBuilder.RESTQuery.execute("Customer%20Requirements%20ST13", "$select=Functional Area","filter=Status eq 'Accepted'")
        ).done(
            // Manipulate the data in this section
			
			function (listItems) {
                var dataArray = [];
                var countArray = [];
                //Add the SharePoint List
                var results = listItems[0].d.results;
                for (var i = 0; i < results.length; i++) {
                    var functionalArea = results[i].Functional%20Area.results;
                    for (var j = 0; j < functionalArea.length; j++) {
                        dataArray.push(functionalArea[j]);
                    }
					var custReq = results[i].Functional%20Area;
                    dataArray.push(custReq);
                }
	
                countArray = custReqChartBuilder.Utilities.buildCategoryCounts(countArray, dataArray);
                //Put data into format for bar chart
                var seriesData = [];
                var xCategories = [];
                for (var i = 0; i < countArray.length; i++) {
                    xCategories.push(countArray[i][0]);
                    seriesData.push(countArray[i][1]);
                }
				//Build Chart
				custReqChartBuilder.Utilities.loadBarChart(xCategories, seriesData, "#custReqByAreaChart", "Accepted Requirements by Functional Area");
            } 

        ).fail(
            function (listItems) {
                $("#custReqByAreaChart").html("<strong>An error has occurred.</strong>");
            }
        );
    };

    return {
        load: load
    }
}();

//object for holding a category instance
custReqChartBuilder.StatusByLeader = function (name, status, count) {
    var leaderName = name,
        statusName = status,
        statusCount = count

    return {
        leaderName: name,
        statusName: statusName,
        statusCount: statusCount
    }
}
