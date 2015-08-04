'use strict';

angular.module("usersFilter", []).filter('userGenderText', function() {
  return function(input, uppercase) {
    switch(input){
      case 'male':
        return '男';
      case 'female':
        return '女';
      default:
        return '';
    }
  }
});