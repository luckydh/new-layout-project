import Vue from 'vue';
import Vuex from 'vuex';
import Location from './modules/locations';
import {state, getters, mutations, actions} from './mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations, 
    actions,
    plugins:[],
    modules: {
        Location,
    }
});

export default store;