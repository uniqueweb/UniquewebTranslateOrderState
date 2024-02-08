import './component/uniqueweb-translate-order-state-index';
import './component/uniqueweb-translate-order-state-detail';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';
const { Module } = Shopware;

Module.register('uniqueweb-translate-order-state', {
    type: 'plugin',
    name: 'translate-order-state',
    title: 'uniqueweb-translate-order-state.general.title',
    description: 'uniqueweb-translate-order-state.general.description',
    color: '#A092F0',
    icon: 'regular-info-circle',

    snippets: {
        'en-GB': enGB,
        'de-DE': deDE
    },

    routes: {
        index: {
            component: 'uniqueweb-translate-order-state-index',
            path: 'index'
        },
        detail: {
            component: 'uniqueweb-translate-order-state-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'uniqueweb.translate.order.state.index'
            }
        },
    },

    navigation: [{
        id: 'uniqueweb-translate-order-state',
        label: 'uniqueweb-translate-order-state.general.title',
        path: 'uniqueweb.translate.order.state.index',
        color: '#A092F0',
        icon: 'regular-info-circle',
        parent: 'sw-order',
        position: 40
    }],

})
