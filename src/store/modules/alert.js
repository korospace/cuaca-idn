export default {
    namespaced: true,
    state: {
      data: {
        show: false,
        text: '',
        type: ''
      },
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_DATA_ALERT: function(state, data) {
            state.data.show = data.show;
            state.data.text = data.text;
            state.data.type = data.type;
        },
    }
}