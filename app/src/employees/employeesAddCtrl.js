(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesAddCtrl', EmployeesAddCtrl);

    EmployeesAddCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'EmployeesService', '$ionicLoading'];

    function EmployeesAddCtrl($rootScope, $state, $stateParams, EmployeesService, $ionicLoading) {
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
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function clientSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                description: vm.description,
                cv: vm.cv,
                sum: 0
            };

            EmployeesService.addItem(item)
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
