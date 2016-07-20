'use strict';

/**
 * React table directive
 * @namespace Directives
 * @memberOf App.Product
 */

/**
 * @name reactTable
 * @desc Navigation bar, present on the whole app
 * @param {Object} $filter angular filter
 * @memberOf App.Product.Directives
 * @returns {Object} The react table directive
 */
export /* @ngInject */ function reactTable($filter) {
    return {
        restrict: 'A',
        replace: true,
        link: /* @ngInject */ function ($scope, $element, $attrs) {
            const ReactTableTd = React.createClass({
                render: function () {
                    const item = this.props.item;

                    return (
                        React.createElement('tr', null,
                            React.createElement('td', null, item.index),
                            React.createElement('td', null, item.name),
                            React.createElement('td', null, item.surname),
                            React.createElement('td', null, item.fullname),
                            React.createElement('td', null, item.email)
                        )
                    );
                },
            });

            const ReactTableNode = React.createClass({
                render: function () {
                    const items = this.props.items;

                    const rows = _.map(items, function (item) {
                        return (
                            React.createElement(ReactTableTd, { item: item, key: item.index })
                        );
                    });

                    return (
                        React.createElement('table', null,
                            React.createElement('tbody', null, rows)
                        )
                    );
                },
            });

            const ReactTableWrapper = React.createClass({
                componentWillMount: function () {
                    this.delayedChange = _.debounce(function (e) {
                        this.setState({ items: $filter('filter')(this.props.items, e.target.value) });
                    }, 100);
                },
                getInitialState: function () {
                    return { items: this.props.items };
                },
                handleChange: function (e) {
                    e.persist();
                    this.delayedChange(e);
                },
                render: function () {
                    return (
                        React.createElement('div', null,
                            React.createElement('input', { onChange: this.handleChange }),
                            React.createElement(ReactTableNode, { items: this.state.items })
                        )
                    );
                },
            });

            const render = function () {
                const items = $scope.$eval($attrs.items);
                ReactDOM.render(React.createElement(ReactTableWrapper, { items: items }), $element[0]);
            };

            render();

            $scope.$on('$destroy', function () {
                ReactDOM.unmountComponentAtNode($element[0]);
            });
        },
    };
}
