(function() {
    'use strict';

    angular
        .module('app.detail', [])
        .controller('Detail', Detail);

    /* @ngInject */
    function Detail($scope, modalInstance) {
        var vm = this;

        vm.confirm = function() {
            modalInstance.confirm();
        };
    }

})();
