angular.module('perceptiveReachApp').service('modalService', ['$modal',
    function ($modal, $modalInstance) {
        var optionsChoice = {};
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            controller: 'ModalCtrl',
            resolve:{
                data: function () {
                    return {options: optionsChoice};
                }
            },
            templateUrl: 'components/modal/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }
            else{
                tempModalDefaults.resolve.data.options = tempModalOptions;
                optionsChoice = tempModalOptions;
                console.log(tempModalDefaults.resolve.data.options);
            }            
            console.log(tempModalDefaults.resolve);
            return $modal.open(tempModalDefaults).result;
        };

    }]);