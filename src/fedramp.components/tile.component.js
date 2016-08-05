(function () {
    'use strict';

    angular
        .module('fedramp.components')
        .component('tile', {
            templateUrl: 'src/templates/components/tile.html',
            controller: Tile,
            controllerAs: 'controller',
            bindings: {
                model: '<',
                state: '<'
            }
        });

    Tile.$inject = ['$log', '$sce', '$state', '$stateParams', 'helperService', '$location'];

    /**
     * @constructor
     * @memberof Components
     */
    function Tile ($log, $sce, $state, $stateParams, helperService, $location) {
        var self = this;

        /**
         * The tile template for the model type.
         */
        self.tileTemplate = 'src/templates/components/tile-' + self.model.type + '.html';

        /**
         * Redirect to the appropriate view
         * @public
         * @memberof Components.Tile
         */
        self.view = function () {
            let baseUrl = '';
            if ($stateParams.name) {
                baseUrl = '/' + self.model.type + '/' + $stateParams.name + '/versus/' + helperService.slugify(self.model.name);
            } else {
                baseUrl = '/' + self.model.type + '/' + helperService.slugify(self.model.name);
            }
            $location.url(baseUrl + helperService.queryString());
        };

        /**
         * Trust a URL
         * @public
         * @memberof Components.Assessor
         *
         * @param {string} url
         *  The external URL
         *
         * @returns
         *  The trusted URL
         */
        self.externalLink = function (url) {
            if (url.indexOf('http') === -1) {
                url = 'http://' + url;
            }
            return $sce.trustAsResourceUrl(url);
        };
    }
})();
