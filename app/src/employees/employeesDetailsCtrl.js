(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesDetailsCtrl', EmployeesDetailsCtrl);

    EmployeesDetailsCtrl.$inject = ['$rootScope', '$state', '$stateParams', '$filter', 'EmployeesService', '$ionicLoading'];

    function EmployeesDetailsCtrl($rootScope, $state, $stateParams, $filter, EmployeesService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSubmit: showSubmit,
            clientSubmit: clientSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
            vm.total = $filter('number')(vm.sum, 2);
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function clientSubmit() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var item = {
                id: vm.id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                sum: vm.sum,
                cv: vm.cv,
                description: vm.description
            };

            EmployeesService.editItem(item)
                .then(function () {
                    $ionicLoading.hide();
                    $state.go('root.employees', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }

})();
