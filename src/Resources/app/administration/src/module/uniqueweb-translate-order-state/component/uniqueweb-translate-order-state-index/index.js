import template from './index.html.twig';
import './index.scss';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('uniqueweb-translate-order-state-index', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            isLoading: false,
            orderStates: null,
            total: 0,
            sortBy: 'createdAt',
            sortDirection: 'DESC'
        };
    },

    computed: {
        stateMachineStateRepository() {
            return this.repositoryFactory.create('state_machine_state');
        },

        stateMachineStateCriteria() {
            return (new Criteria(this.page, this.limit))
                .addSorting(Criteria.sort(this.sortBy, this.sortDirection));
        },

        stateMachineStateColumns() {
            return this.getStateMachineStateColumns();
        }
    },

    methods: {
        async getList() {
            this.isLoading = true;

            const criteria = await this.addQueryScores(this.term, this.stateMachineStateCriteria);
            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;

                return false;
            }

            return this.stateMachineStateRepository.search(criteria).then((stateMachines) => {
                this.isLoading = false;
                this.total = stateMachines.total;
                this.orderStates = stateMachines;

                return this.orderStates;
            });
        },

        onChangeLanguage() {
            this.getList();
        },

        updateTotal({ total }) {
            this.total = total;
        },

        getStateMachineStateColumns() {
            return [{
                property: 'name',
                label: 'sw-product.list.columnName',
                routerLink: 'uniqueweb.translate.order.state.detail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true,
            }, {
                property: 'technicalName',
                label: 'uniqueweb-translate-order-state.index.columnTechnicalName',
                allowResize: true
            }];
        },
    }
});