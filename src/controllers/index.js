(function() {
    'use strict';

    angular
        .module('angular.j.modal', [])
        .factory('jModal', jModal);

    /* @ngInject */
    function jModal($document, $q, $http, $templateCache, $compile, $rootScope, $controller) {

        var defaults = {
            backdrop: true,
            keyboard: true,
            show: true,
            templateUrl: null,
            size: 'md'
        };
        var container = null,
            confirm   = false;

        activate();

        var service = {
            open : openModal
        };

        return service;

        // -------------------------

        function activate() {
            if (missingBootstrap()) return false;
            appendModal();
        }

        function openModal(modalOptions) {
            var options = angular.extend({}, defaults, modalOptions);

            getTemplate(options.templateUrl).then(function (template) {
                var modalInstance = createModalInstance(template),
                    $scope        = createModalScope(options),
                    controller    = createModalController(options, $scope, modalInstance),
                    compiled      = $compile(modalInstance)($scope);

                container.empty().append(compiled);

                modalInstance.modal(options).on('hidden.bs.modal', function() {
                    onClose(options);
                });

                confirm = false;
            });

        }

        function missingBootstrap() {
            if (typeof $.fn.modal == 'undefined') {
                throw new Error('Bootstrap Modal library has not been found.');
            }
        }

        function appendModal() {
            if ($document.find('#modal-container').length === 0) {
                $document.find('body').append(angular.element('<div id="modal-container"></div>'));
            }
            container = $document.find('#modal-container');
        }

        function getTemplate(url) {
            var deferred = $q.defer();

            $http.get(url, { cache: $templateCache }).then(function(res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        }

        function createModalInstance(template) {
            var modalInstance = angular.element('<div class="modal fade" ng-class="$modalOptions.className"><div class="modal-dialog modal-{{ $modalOptions.size }}"><div class="modal-content"></div></div></div>'),
                modalContent  = modalInstance.find('.modal-content');

            modalContent.html(template);

            return modalInstance;
        }

        function createModalScope(options) {
            var modalOptions = {
                    $modalOptions : {
                        size      : options.size,
                        className : options.className
                    }
                };

            return angular.extend($rootScope.$new(true), options.scope, modalOptions);
        }

        function createModalController(options, $scope, modalInstance) {
            var controllerInstance, controllerLocals = {};

            addCallbacks(options, modalInstance);

            if (options.controller) {
                controllerLocals.$scope = $scope;
                controllerLocals.modalInstance = modalInstance;

                controllerInstance = $controller(options.controller, controllerLocals);
                if (options.controllerAs) {
                    $scope[options.controllerAs] = controllerInstance;
                }
            }

            return controllerInstance;
        }

        function addCallbacks(options, modalInstance) {
            modalInstance.close = function(data) {
                onClose(options, data);
            };

            modalInstance.confirm = function(data) {
                modalInstance.modal('hide');
                onConfirm(options, data);
            };
        }

        function isCallback(options, name) {
            return typeof options[name] === 'function';
        }

        function onClose(options, data) {
            container.empty();
            if (isCallback(options, 'onClose') && !confirm) {
                options.onClose(data);
            }
        }

        function onConfirm(options, data) {
            if (isCallback(options, 'onConfirm')) {
                confirm = true;
                options.onConfirm(data);
            }
        }

    }

})();
