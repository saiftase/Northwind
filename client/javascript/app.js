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
    //watch the naming-- not sure I want a variable named new
		var data = {
			name: $scope.new.name,
			priority: $scope.new.priority || 5//you could add default to the database too
		};
    

		$http.post('/api/items', data)
		.then(function(body){
			var item = body.data;
			$scope.items.push(item);
			sortItems();
			return body.data;//what am I returning to?
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
			return;//why return to what?
		});
	};

  //you could probably DRY up the up and down methods.. no?
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
		});
	};

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
		});
	};

	$scope.arrowUp = function (item, index){
    return index !== 0;
	};

	$scope.arrowDown = function (item, index){
		return index !== $scope.items.length - 1;
	};

	//Helper & Other
	function sortItems(){
		$scope.items = $scope.items.sort(function(a,b){
			return a.priority - b.priority;
		});
	};

});
