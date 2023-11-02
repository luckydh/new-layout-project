export const state = {
    currentView:'',
    document: null,
    homeViewDefault: '',
    requestItemData: [],
    isEdocsModalLoaded: false,
    isEdocsAddModalLoaded: false,
    isEdocsEditModalLoaded: false,
    isNewPORequestModalLoaded: false,
    savedGridOptions: null
}

export const getters = {
    getRequestItemData(state) {
        return state.requestItemData;
    }
}
 //For async operations
 export const mutations = {
    setCurrentView(_state, view) {
        this.state.currentView = view;
    },
    setDocument(_state, newDocument) {
        this.state.document = newDocument;
    },
    setHomeViewDefault(_state, homeViewDefault){
        this.state.homeViewDeafult = homeViewDefault;
    },
    setModalLoaded(_state, modalName) {
        this.state[modalName] = true;
    },
    setRequestItemData(_state, newItemData){
        this.state.requestItemData = newItemData;
    },
    setSavedGridOptions(_state, savedGridOptions){
        this.state.savedGridOptions = savedGridOptions;

    }
    
}
//For async operations
export const actions = {
    getSelectedDocument(){
        
    }
}