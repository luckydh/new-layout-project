import Http from 'axios'
import {URL} from '../../config/config';
import {FETCH_LOCATIONS, FETCH_CURRENT_LOCATION} from '../action-consts';
import {SET_ALL_LOCATIONS, SET_CURRENT_LOCATION} from '../mutation-conts';

const state = {
    allLocations: [],
    currentLocation: {},
    currentLocationID:1,
    currentLocationName:'',
}

const getters = {
    allLocations: state => state.allLocations,
    currentLocation: state => state.currentLocation,
    currentLocationName: state => state.currentLocationName,
};

const actions = {
    [FETCH_LOCATIONS]({commit}){
        return new Promise((resolve, reject) => {
            Http.get(`${URL}/locations`)
            .then((response)=>{
                commit(SET_ALL_LOCATIONS,response.data);
                resolve(true);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    },

    [FETCH_CURRENT_LOCATION]({commit,state}){
        return new Promise((resolve, reject) => {
            Http.get(`${URL}/defaults/${state.currentLocationID}`)
            .then((response)=>{
                commit(SET_CURRENT_LOCATION,response.data);
                commit('SET_CURRENT_LOCNAME',response.data.location);
                resolve(true);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    },
}

const mutations = {
    SET_ALL_LOCATIONS(state,locations){
        state.allLocations = locations;
    },
    SET_CURRENT_LOCATION(state,location){
        state.currentLocation = location;
    },
    SET_CURRENT_LOCATIONID(state,locationID){
        state.currentLocationID = locationID;
    },
    SET_CURRENT_LOCNAME(state,locname){
        state.currentLocationName = locname;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
