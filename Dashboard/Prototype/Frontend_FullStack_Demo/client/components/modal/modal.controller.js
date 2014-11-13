'use strict';

angular.module('perceptiveReachApp')
  .controller('ModalCtrl', function ($scope, $modalInstance, data) {
        $scope.modalOptions = data.options;
        console.log($scope.modalOptions);
        $scope.modalOptions.ok = function (result) {
            $modalInstance.close(result);
        };
        $scope.modalOptions.close = function (result) {
            $modalInstance.dismiss('cancel');
        };
  });