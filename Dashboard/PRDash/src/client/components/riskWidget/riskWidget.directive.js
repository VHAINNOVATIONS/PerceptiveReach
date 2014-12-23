angular.module('perceptiveReachApp', [])
	.directive('riskWidget', function(){
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'riskWidget.html'
		}
}); 