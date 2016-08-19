(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })

            .state('root.employees', {
                url: '/employees',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-employees': {
                        templateUrl: 'employees/employees.html',
                        controller: 'EmployeesCtrl',
                        controllerAs: 'employeesCtrl'
                    }
                }
            })

            .state('root.employees-details', {
                url: '/employees-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-employees': {
                        templateUrl: 'employees/employees-details.html',
                        controller: 'EmployeesDetailsCtrl',
                        controllerAs: 'employeesDetailsCtrl'
                    }
                }
            })

            .state('root.employees-add', {
                url: '/employees-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-employees': {
                        templateUrl: 'employees/employees-add.html',
                        controller: 'EmployeesAddCtrl',
                        controllerAs: 'employeesAddCtrl'
                    }
                }
            })

            .state('root.goods', {
                url: '/goods',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-goods': {
                        templateUrl: 'goods/goods.html',
                        controller: 'GoodsCtrl',
                        controllerAs: 'goodsCtrl'
                    }
                }
            })

            .state('root.good-details', {
                url: '/good-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-goods': {
                        templateUrl: 'goods/good-details.html',
                        controller: 'GoodDetailsCtrl',
                        controllerAs: 'goodDetailsCtrl'
                    }
                }
            })

            .state('root.good-add', {
                url: '/good-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-goods': {
                        templateUrl: 'goods/good-add.html',
                        controller: 'GoodAddCtrl',
                        controllerAs: 'goodAddCtrl'
                    }
                }
            })

            .state('root.audit', {
                url: '/audit',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-grid': {
                        templateUrl: 'audit/audit.html',
                        controller: 'AuditCtrl',
                        controllerAs: 'auditCtrl'
                    }
                }
            })

            .state('root.audit-details', {
                url: '/audit-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-grid': {
                        templateUrl: 'audit/audit-details.html',
                        controller: 'AuditDetailsCtrl',
                        controllerAs: 'auditDetailsCtrl'
                    }
                }
            })

            .state('root.users', {
                url: '/users',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-grid': {
                        templateUrl: 'users/users.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'usersCtrl'
                    }
                }
            })

            .state('root.user-details', {
                url: '/user-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-grid': {
                        templateUrl: 'users/user-details.html',
                        controller: 'UserDetailsCtrl',
                        controllerAs: 'userDetailsCtrl'
                    }
                }
            })

            .state('root.user-add', {
                url: '/user-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-grid': {
                        templateUrl: 'users/user-add.html',
                        controller: 'UserAddCtrl',
                        controllerAs: 'userAddCtrl'
                    }
                }
            })

            .state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            });

        $urlRouterProvider.otherwise('root/home');
    }

})
();
