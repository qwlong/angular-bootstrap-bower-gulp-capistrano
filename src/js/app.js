/* Services */
var webApp = angular.module('WebApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'mgcrea.ngStrap',
  'ngTouch',
  'angular-carousel',
  'angular.filter',
  'ui.bootstrap',
  'WebApp.controllers.Main',
  'WebApp.controllers.Home'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {title: '首页', tab: 'index', controller: "HomeController", templateUrl:'home.html',  reloadOnSearch: false});
    //修改为html5的模式
    //$locationProvider.html5Mode({enable: false, requireBase:false});
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
  }).run(function($rootScope) {
    //修改浏览器页面的title
    //$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    //  $rootScope.tab = current.$$route.tab;
    //  $rootScope.title = current.$$route.title;
    //  document.title = current.$$route.title;
    //  var iframe = angular.element('<iframe src="http://www.baidu.com/favicon.ico" style="display: none;"></iframe>').on('load', function(){
    //    setTimeout(function() {iframe.off('load').remove();}, 0)
    //  }).appendTo(angular.element('body'));
    //  document.title = current.$$route.title;
    //});
  })
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        $rootScope.loading = true;
        config.headers = config.headers || {};
        window.request_config = config;
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      response: function (response) {
        $rootScope.loading = false;
        if (response.status === 401) {
          // handle the case where the user is not authenticated
          alert('权限不够');
        }
        return response || $q.when(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
