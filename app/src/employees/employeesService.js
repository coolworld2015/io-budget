(function () {
    'use strict';
    angular
        .module('app')
        .factory('EmployeesService', EmployeesService);

    EmployeesService.$inject = ['$rootScope', '$http'];

    function EmployeesService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            getClients: getClients,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            _sort: sort
        };

        function getClients() {
            var url = webUrl + 'api/employees/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }

        function addItem(item) {
            var url = webUrl + 'api/employees/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/employees/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/employees/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();
