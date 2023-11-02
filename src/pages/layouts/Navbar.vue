<template>
<div class="masternav">
    <div class="standardHeader">
        <div id="logoContainer">
            <span id="ipoLabel">Purchase Order</span>
        </div>
        <!-- </bell> -->
        <div id="edocViewBtn" class="navIcon" @click="showEdocsModal"><span class="fa fa- cloud"></span></div>
        <div class="navLink" @click="showNewPORewquestModal">
            <a href="#" id="createReq">Create New Request</a>
        </div>
        <div id="quickSearchHolder">
            <input
            placeHolder="Search..."
            v-model="searchDocumentString"
            onclick="this.select()"
            class="quickSearch"
            type="text"
            autocomplete="off" spellcheck="false"
            autocapitalize="off" autocorrect="off"
            id="quickSearch" />
            <button type="button" id="quickSearchButton">
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="navLink">
            <a href="#" v-on:click="showHome()" :class="{navLinkSelected: (currentView == 'HomeColView' || currentView == 'HomeGridView')}">Dashboard</a>
        </div>
        <div class="navLink">
            <a href="#" id="reports">Reports</a>
        </div>
        <div class="navIcon" v-bind:class="{'disableIcon': (currentView == 'SettingsView' || currentView == 'DocumentView')}">
            <a href="#" title="IPO Settings" v-on:click="showHome('SettingsView')">
                <i class="fa fa-cogs"></i>
            </a>
        </div>
        <div class="navIcon">
            <a href="#" title="Switch to Grid View" v-show="currentView == 'HomeColView'" v-on:click="showHome('HomeGridView')">
                <i class="fa fa-table"></i>
            </a>
            <a href="#" title="Switch to Column View" v-show="currentView == 'HomeGridView'" v-on:click="showHome('HomeColView')">
                <i class="fa fa-columns"></i>
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Navbar",
    components: {
        // "bell": NotificationBell
    },
    data() {
        return {
            searchDocumentString: '',
        }
    },
    computed: {
        currentView: function() {
            return this.$store.state.currentView;
        },
        currentDocument: function(){
            return this.$store.state.document;
        }
    },
    methods: {
        showHome(homeView) {
            if(homeView){
                this.$store.commit('setCurrentView', homeView);
            }else{
                this.$store.commit('setCurrentView', this.$store.state.homeViewDefault);
            }
        },
        showEdocsModal(){
            this.$emit('showEdocsModal')
        },
        showNewPORewquestModal(){
            this.$emit('showNewPORequestModal', 'poRequestModal');
        }
    }
}
</script>

<style lang="scss">

.navIcon{
    padding: 0px;
    white-space: nowrap;
    text-align: center;
    padding-top: 8px;
    height: 100%;
    width: 10%;
    cursor: pointer;

    .fa{
        font-size: 25px !important;
    }
    .fa-cloud {
        color: #ccc;
    }
}
.masternav {
    display: flex;
    border-bottom: 1px solid #CCCCCC;
    height: 42px;
    vertical-align: middle;
    background-color: #eee;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: -5px;
    margin-right: -5px;
    margin-top: -5px;
    margin-bottom: 4px;
    position: fixed;
    z-index: 5;
    top: 5px;
    left: 5px;
    width: 100%;

    @media only screen and (max-width: 1000px) {
        height: unset;
        flex-wrap: wrap;
    }
    .masternav a {
        text-decoration: none !important;
    }
    .standardHeader {
        display: inline-flex;
        width: 100%;
        @media only screen and (max-width: 1000px) {
            width: 90%;
        }
    }
    #logoContainer {
        font-size: 14pt;
        margin: 10px;
        font-weight: bold;
        min-width: 125px;
        max-width: 170px;
        width: 170px;
        cursor: default;
        margin-left: 20px;
    }

    #netViewLabel {
        font-size: 16px;
    }

    #ipoLabel {
        font-size: 16px;
        color: #04b104;
    }
    .navLink {
        padding: 0px;
        white-space: nowrap;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        padding-top: 13px;
        height: 100%;
        width: 20%;
        cursor: pointer;
    }

    .navLinkSelected {
        padding-bottom: 5px;
        border-bottom: 2px solid #ccc;
    }

    #quickSearch {
        position: relative;
        font-size: 14px;
        padding: 5px 0 6px 1em;
        width: 100%;
        height: 27px;
        margin: 6px 0px 0 10px;
        border: 1px solid #999;
        border-radius: 5px 0 0 5px;
    }
    .quickSearch {
        text-transform: uppercase;
    }
    #quickSearchButton {
        height: 27px;
        background-color: #fff;
        color: #333;
        border: 1px solid #999;
        border-radius: 0 5px 5px 0;
        margin: 6px 6px 0 0;
        border-left: none;
        padding-left: 10px;
        padding-right: 10px;
    }

    #quickSearchHolder {
        overflow: hidden;
        border-radius: 5px;
        display: inline-flex;
        width: 30%;

        @media only screen and (max-width: 1000px) {
            width: calc(100% - 125px)
        }
    }
}
</style>