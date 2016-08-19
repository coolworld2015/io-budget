(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'EmployeesService',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function EmployeesCtrl($scope, $rootScope, $state, $stateParams, EmployeesService, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showAdd: showAdd,
            addConfirm: addConfirm,
            showConfirm: showConfirm,
            clientDelete: clientDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            clientAdd: clientAdd,
            clientDetails: clientDetails
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.clients = [];
            vm.clientsFilter = [];
            vm.clear = false;
            vm.addShowed = false;
            $rootScope.raisedError = false;

            EmployeesService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    $ionicLoading.hide();
                })
                .catch(errorHandler);
        }

        function showAdd() {
            vm.addShowed = vm.addShowed ? false : true;
        }

        function addConfirm(client) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Add client',
                template: 'Are you sure you want to add new employee?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        function showConfirm(client) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete client',
                template: 'Are you sure you want to delete ' + client.name + '?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    clientDelete(client.id);
                } else {
                    $ionicListDelegate.closeOptionButtons();
                    console.log('You are not sure');
                }
            });
        }

        function clientDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            EmployeesService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);

            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.clients = [];
            vm.clear = false;
            EmployeesService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .catch(errorHandler);
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function clientAdd() {
            $state.go('root.employees-add');
        }

        function clientDetails(item) {
            $state.go('root.employees-details', {item: item});
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }
})();