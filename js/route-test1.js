/**
 * Created by wangguangkai on 2016/7/14.
 */
var routingDemoApp = angular.module('routingDemoApp', ['ngRoute'])
routingDemoApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      template: '这是首页页面'
    })
    .when('/computers', {
      templateUrl:'../html/address-test.html',
      //template: '这是电脑分类页面',
    })
    .when('/printers', {template: '这是打印机页面'})
    .when('/route1/:name:xingming', {
      templateUrl:'../html/route-html/route1.html',

    })
    .otherwise({redirectTo: '/'});
}]);

routingDemoApp.controller('routeTrl1', function($scope, $routeParams,$location){
  console.log($routeParams);
  l=$location;
  //$location.path('/')
  $location.search({
    name:'zhangsan',
    sex:'1'
  });
});