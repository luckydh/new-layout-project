<template>
  <div class="main-container b-1-black">
    <header class="topbar"></header>
    <div class="ml-2 mt-1">
      <div class="ml-1">
        <h1>This is nothing but a test page to us any sort of test</h1>
        <input type="checkbox" v-model="currentLocation.can_generate_po">Generate POs from the location
      </div>
      <div class="main-box b-1-black">
        <form class="ml-1 mt-1">

          <div class="mb-half">
            <label>Use PO Numbers from location:</label> 
            <select style="width:40%;" :disabled='!currentLocation.can_generate_po'  v-model="currentLocation.location">
              <option disabled>This Location</option>
              <option v-for="location in locations" :key="location.location" :value="location.location">
                {{location.location}}-{{location.name}}</option>
            </select>
          </div>

        <div class="b-1-black ml-1 inner-box mb-half">
          <div class="ml-1 mt-half">
            <tr style="width: 100%"> 
            <td style="width: 50%"><label>Next PO number</label></td>
            <td style="width: 50%"><input type="text" :disabled='!currentLocation.can_generate_po' 
            v-model="currentLocation.next_po_number"></td>
            </tr>
          </div>
          <div class="ml-1 mt-half mb-half">
            <tr style="width: 100%"> 
            <td style="width: 50%"><label>Next Requisition number</label></td>
            <td style="width: 50%"><input type="text" :disabled='!currentLocation.can_generate_po' 
            v-model="currentLocation.next_requisition_number"/></td>
            </tr>
          </div>
        </div>{{currentLocation.id}}
       
        <input-div type="checkbox" label='Auto Generate Stock Numbers' v-model="currentLocation.auto_generate_stock_number" :disable='!currentLocation.can_generate_po'></input-div>
        <input-div type="checkbox" label='Auto Generate Serial Numbers' v-model="currentLocation.auto_generate_serial_number" :disable='!currentLocation.can_generate_po'></input-div>
        <input-div type="checkbox" label='Require Order step in IPO' v-model="currentLocation.skip_order_step" :disable='!currentLocation.can_generate_po'></input-div>
        <input-div type="number" label='Default IPO View' v-model="currentLocation.default_view" :disable='!currentLocation.can_generate_po'></input-div>
        
        <!-- search-component for the pop-ops -->
<!-- 
        <search-input-div type="number" label='Default Tax Account' 
        v-model="currentLocation.default_tax_account" :disable='!currentLocation.can_generate_po' :icon='true'></search-input-div> -->
        
        
        <!-- <search-input-div type="text" label='Default Feright Account' :disable='!currentLocation.can_generate_po' :icon="true"
        v-model="currentLocation.default_freight_account"></search-input-div> -->

        <!-- <Label>Default Account number</Label>
          <account-lookup :key="currentLocation.default_tax_account" inputtype="number" :disable='!currentLocation.can_generate_po'
           :ledger_search="currentLocation.default_tax_account"
        v-model="currentLocation.default_tax_account" />{{currentLocation.default_tax_account}} -->

        <Label>Default FRIEGht ACOUNT</Label>
          <account-lookup  :disable='!currentLocation.can_generate_po'
        v-model="currentLocation.default_freight_account" />{{currentLocation.default_freight_account}}
        </form>

        <div class="mt-1 mb-1 footer">
          <button type="button" class="mr-1 btn btn-danger" @click="cancel">Cancel</button>
          <button type="button" class="ml-1 btn btn-primary" @click="submit">Save</button>
        </div>
      </div>
    </div>

<!--  <account-lookup ref="accountLookupModal" @rowSelect="setItem" ></account-lookup>-->
  </div>
</template>

<script>
import Http from 'axios';
import InputDiv from '../components/forms/InputDiv';
// import SearchInputDiv from '../components/forms/SearchInputDiv';
import AccountLookup from '../components/AccountLookup';

// import {mapActions} from 'vuex';
// import {
  // FETCH_LOCATIONS
// ,FETCH_CURRENT_LOCATION
// } from '../store/action-consts';

export default {
  name: 'TestPage',
  data(){
    return {
      accounts:[],
      ledger_search: null,
      from_ac: false,
      from_frieght: false,

locations:[],
currentLocation:{},
  }


  },
  components: {
   InputDiv,
  //  SearchInputDiv,
   AccountLookup
  },
  computed:{
  },
  methods:{
      getLocations(){
            Http.get(`localhost:3000/locations`)
            .then((response)=>{
                this.locations = response.data;
            })
            .catch((error)=>{
                alert(error.response);
            })
    },

    getCurrent(){
            Http.get(`localhost:3000/defaults/1`)
            .then((response)=>{
                this.currentLocation = response.data;
            })
            .catch((error)=>{
                alert(error.response);
            })
    },
    // getDTAC(val){
    //   this.currentLocation.default_tax_account = val;
    // },
    // getDFAC(val){
    //   this.currentLocation.default_freight_account = val;
    // },

    // showAccountLookupModal(e){
    //   // this.ledger_search = 
    //   this.$refs.accountLookupModal.showModal();
    // },

    submit(){
      Http.put('http://localhost:3000/defaults/'+this.currentLocation.id, this.currentLocation)
      .then(()=>alert('successfully saved'))
      .catch(()=>alert('something wrong'))
    },

    cancel(){},

    setItem(event){
      if(this.from_ac == true)
        this.currentLocation.account_no = event.account_no;

      if(this.from_frieght == true)
        this.currentLocation.default_freight_account = event.account_no;

        this.from_ac = false;
        this.from_frieght =false;

      this.$refs.accountLookupModal.closeModal();

    }


  },
  mounted(){
    this.$store.dispatch('Location/FETCH_CURRENT_LOCATION');
    this.$store.dispatch('Location/FETCH_LOCATIONS');
  }
}
</script>

<style>
.main-container{
  display: flex;
  flex-direction: column ;
  height: 99%;
  margin: 0px 1px 1px 1px;
}

.topbar{
  height: 50px;
  width: 100%;
  background: blue;
}

.main-box{
  background: grey;
  width: 60%;
}

.inner-box{
  width: 90%;
}

@media screen and (max-width: 400px) {
  .main-box{
    width: 90%;
  }
}

.footer{
  width:70%; 
  display:flex; 
  justify-content:flex-end;
}


</style>
