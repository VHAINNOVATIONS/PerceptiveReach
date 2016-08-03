'use strict';

angular.module('ui.widgets')
	.controller('RemovePatientCtrl', ['$scope', '$modalInstance', 'params',
        function($scope, $modalInstance, params) {
        	$scope.name = params.veteranObj.Name;
        	$scope.ok = function(){
        		$modalInstance.dismiss('cancel');
        	}

        	$scope.cancel = function(){
        		$modalInstance.dismiss('cancel');
        	}
        }
]);