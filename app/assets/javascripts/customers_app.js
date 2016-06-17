var app = angular.module('customers',[]);


app.controller("CustomerSearchController", [ "$scope", "$http", 
	function($scope, $http) {

		var page = 0;
		
		$scope.search = function(searchTerm) {
		  // verifica se o usuário está digitando uma palavra menor que 3
		  if(searchTerm.length < 3){
		  	return;
		  }	

		  // faz a requisicao via AJAZ da rota "/customers.json"
		  $http.get("/customers.json",
					{ "params": { "keywords": searchTerm, "page": page } }
			).then(function(response) { // se obtiver sucesso pega os dados JSON da rota anterior e coloca em customers
				$scope.customers = response.data;
			},function(response) { 		// caso contrário lança o erro
				alert("There was a problem: " + response.status);
			  }
			);

	    }

	    // paginacao

	    $scope.previousPage = function() {
	    	if (page > 0){
	    		page = page - 1;
	    		$scope.search($scope.keywords);
	    	}

	    }
	    $scope.nextPage = function() {
	    	page = page + 1;
	    	$scope.search($scope.keywords);
	    }
	}
]);