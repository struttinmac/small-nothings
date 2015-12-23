"use strict";

var custReqChartBuilder = window.custReqChartBuilder || {};
//The module for executing a REST query

custReqChartBuilder.RESTQuery = function (listTitle, query, filter) {
    var execute = function (listTitle, query, filter) {
        //Use the below line when adding this code to the site; use an absolute path for testing on a sandbox site
		    var restUrl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('" + listTitle + "')/items";
		    
        if (query != "") {
            restUrl = restUrl + "?" + query;
        }
		    if (filter != "") {
            restUrl = restUrl + "?" + query + "&" + filter;
        }
        var deferred = $.ajax({
            url: restUrl,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        });

        return deferred.promise()
    };

    return {
        execute: execute
    }
}();
