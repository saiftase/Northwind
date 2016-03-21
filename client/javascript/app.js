var app = angular.module('Northwind', []);

app.controller("ListController", function($http, $scope){
	// console.log("Angular Active");

	//Init
	$http.get('/api/items/')
	.then(function (body) {
		var items = body.data;
	    $scope.items = items;
	    return items;
	}).catch(console.error.bind(console));

	//Functions
	$scope.addItem = function(){
		var data = {
			name: $scope.new.name,
			priority: $scope.new.priority || 5
		}

		$http.post('/api/items', data)
		.then(function(body){
			var item = body.data;
			$scope.items.push(item);
			sortItems();
			return body.data;
		})
	}

	$scope.removeItem = function(index){
		var id = $scope.items[index]._id;
		$http({
			method: "DELETE",
			url: "/api/items/" + id
		})
		.then(function(){
			$scope.items.splice(index, 1);
			return;
		})
	}

	$scope.up = function(index){
		var id = $scope.items[index]._id;
		var newPriority;

		if(index === 0){
			console.log("Already at the top"); return;
		}

		var higherNeighborPriority = $scope.items[index - 1].priority;
		if(higherNeighborPriority <= 1){
			newPriority = 1;
		}else{
			newPriority = higherNeighborPriority - 1;
		}

		$http({
			method: "PUT",
			url: "/api/items/" + id + "/priority/" + newPriority
		})
		.then(function(item){
			$scope.items[index].priority = newPriority;
			sortItems();
		})
	}

	$scope.down = function(index){
		var id = $scope.items[index]._id;
		var newPriority;

		var lowerNeighbor = $scope.items[index + 1];
		if(!lowerNeighbor){
			console.log("Already the lowest item."); return;
		}
		var lowerNeighborPriority = lowerNeighbor.priority;
		newPriority = lowerNeighborPriority + 1;
	
		$http({
			method: "PUT",
			url: "/api/items/" + id + "/priority/" + newPriority
		})
		.then(function(item){
			$scope.items[index].priority = newPriority;
			sortItems();
		})
	}


	//Helper
	function sortItems(){
		$scope.items = $scope.items.sort(function(a,b){
			return a.priority - b.priority;
		});
	}
})