(function() {
    'use strict';

    angular
        .module('app.my-directive', [])
        .directive('myDirective', myDirective);

    /* @ngInject */
    function myDirective () {
        var directive = {
            restrict     : 'E',
            templateUrl  : '/my-directive.html',
            controller   : MyDirectiveController,
            controllerAs : 'myDirective'
        };

        return directive;

        // -------------------------

        /* @ngInject */
        function MyDirectiveController(jModal) {
            var vm = this;

            vm.detail = detail;

            vm.items = [{
                name: 'Mark',
                surname: 'Otto',
                username: 'mdo'
            }, {
                name: 'Jacob',
                surname: 'Thornton',
                username: 'fat'
            }, {
                name: 'Larry',
                surname: 'Bird',
                username: 'twitter'
            }];

            function detail(item) {
                jModal.open({
                    scope        : item,
                    templateUrl  : '/detail.html',
                    controller   : 'Detail',
                    controllerAs : 'vm',
                    size         : 'md',
                    className    : 'my-class-name',
                    onClose      : onClose,
                    onConfirm    : onConfirm
                });
            }

            function onClose(data) {
                console.log('onClose', data);
            }

            function onConfirm(data) {
                console.log('onConfirm', data);
            }

        }
    }

})();
