import { config } from './highchartWidgets.routes.js';
import { WidgetCtrl } from './controllers/WidgetsController';

angular.module('app.hcwidgets', [
    'md.data.table',
    'smart-table',
    'ui.router',
])
    .config(config)

    .controller('WidgetCtrl', WidgetCtrl)
