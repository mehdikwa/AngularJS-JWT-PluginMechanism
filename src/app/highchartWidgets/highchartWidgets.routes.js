export /* @ngInject */ function config($stateProvider) {
    $stateProvider
        .state('highchartWidgets', {
            url: '/highchartWidgets',
            templateUrl: 'app/highChartWidgets/views/widgets.main.html',
            controller: 'WidgetCtrl',
            controllerAs: 'vm',
        })
}
