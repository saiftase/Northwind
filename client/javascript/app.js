console.log("App.js");
var app = angular.module('Northwind', []);

app.controller("ListController", function($http, $scope){
	console.log("Angular Working");

	$http.get('/api/items/')
	.then(function (body) {
		var items = body.data;
	    $scope.items = items;
	    return items;
	}).catch(console.error.bind(console));

})