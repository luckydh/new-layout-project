<template>
<div>
    <div class="input-group">
    <input 
           :type="inputtype"
           v-model="innerValue"
           :disabled="disable"
           @keyup.enter="showModal"
           class="form-control"
    />
    <div class="input-group-prepend point">
        <div class="input-group-text" @click="showModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </div>
    </div>
    </div>
    <b-modal size="md" ref="accountLookupModal" class="account-lookup-modal" no-fade no-close-on-esc no-close-on-backdrop>
        <template slot="modal-header">
            <div class="ipo-ac-lookup">
                <span class="modalLable">{{header}}</span>
            </div>
            <div>
                <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
            </div>
        </template>

        <grid :data="data" :columns="gridColumns" :keyProps="['account_no']"
        :sortable="true" :pageSize="99999"
        @rowClick="selectThis"
        ></grid>

        <template slot="modal-footer">
            <button class="btn btn-primary AccountLookupColseBtn" v-on:click="closeModal">Close</button>
        </template>
    </b-modal>
</div>
</template>
<script>
import Http from 'axios';
import grid from './Grid';

export default{
    data(){
        return{
            data:[],
            innerValue:null,
        }
    },
components:{
    grid,
},

props:{
    inputtype:[String,Number,Boolean],
    header:{
        type:String,
        default:"Account Lookup"
    },
    cols:{
        type:[Array],
        default:()=>[
    { label: 'Account Name', field: 'name' },
    { label: 'Account Number', field: 'account_no' }
],
    },
    url:{
        type:String,
        default:'http://localhost:3000/accounts'
    },
    ledger_search:String,

    disable:{
        type:Boolean,
        default:false
    },

	value:[String,Number]

},

computed:{
    gridColumns(){
        return this.cols;
    },
},
watch:{
    innerValue(new_value) {
        this.$emit('input', new_value)
    },
    value(new_value){
      this.innerValue = new_value;
    }
},
methods:{

    gridData(){
        Http.get(this.url,{
            params:{
                curloc: this.$store.state.Location.currentLocation.location,
                action: 'LS',
                ledger_search: this.innervalue,
            }
        })
        .then((res)=>{
            this.data = res.data;
        });
    },
    closeModal(){
        this.$refs.accountLookupModal.hide();
    },
    showModal(){
        this.gridData();
        this.$refs.accountLookupModal.show();
    },
    selectThis(item){
        this.innerValue = item.account_no;
        this.closeModal();
    }
},
mounted(){
        this.innerValue = this.value;
    }

}
</script>