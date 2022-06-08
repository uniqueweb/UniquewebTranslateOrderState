import template from './detail.html.twig';
import './detail.scss';

const { Component } = Shopware;

Component.register('uniqueweb-translate-order-state-detail', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        'placeholder',
        'notification'
    ],

    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onCancel',
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            orderState: {},
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        stateMachineStateRepository() {
            return this.repositoryFactory.create('state_machine_state');
        }
    },

    created() {
        this.orderState = this.stateMachineStateRepository.create(Shopware.Context.api);
        this.getOrderState();
    },

    methods: {
        getOrderState() {
            Shopware.Context.api.inheritance = true;
            this.isLoading = true;

            return this.stateMachineStateRepository.get(this.$route.params.id, Shopware.Context.api)
                .then((orderState) => {
                    this.orderState = orderState;
                }).catch((error) => {
                    this.createNotificationError({
                        message: error,
                    });
                }).finally(() => {
                    this.isLoading = false;
                });
        },

        onSave() {
            this.isLoading = true;

            this.stateMachineStateRepository.save(this.orderState, Shopware.Context.api)
                .then(() => {
                    this.isSaveSuccessful = true;
                    this.isLoading = false;
                })
        },

        saveFinish() {
            this.isSaveSuccessful = false;
            this.$router.push({ name: 'uniqueweb.translate.order.state.detail', params: { id: this.orderState.id } });
        },

        onCancel() {
            this.$router.push({ name: 'uniqueweb.translate.order.state.index' });
        },

        onChangeLanguage() {
            this.getOrderState();
        },
    }
});