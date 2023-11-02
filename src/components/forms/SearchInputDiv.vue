<template>
<div class="">
    <div class="mb-half form-group form-row">
        <div class="col-md-6">
        <label>{{label}}</label>
        </div>
        <div class="col-md-6 input-group">
        <input :type="type" 
        v-model="innervalue"
        @keyup.enter="searchData"
        :disabled="disable"
        class="form-control"
        />
        <div class="input-group-prepend point" v-if="icon" >
          <div class="input-group-text" @click="searchData">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
        </div>
        </div>
    </div>

        <!-- <div style="background-color:white; width:30%;margin:auto;" class="b-1-black">
        
        </div> -->
    <b-modal v-model="dialog" hide-footer title="Account Look-up">
        <div class="d-block text-center">
            <table class="m-a mb-4" style="border-collapse: collapse;">
                <thead>
                    <tr>
                    <th class="b-1-black">Account number</th>
                    <th class="b-1-black">Account Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="point" :key="filters.id" v-for="filters in filteredItems" @click="itemSelected(filters)">
                        <td class="b-1-black">{{filters.account_no}}</td>
                        <td class="b-1-black">{{filters.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</div>
</template>
<script>
import Http from 'axios';

export default {
    data(){
        return {
            filteredItems: [],
            dialog:false,
            innervalue:null,
        }
    },
    props:{
        disable:{
            type:Boolean,
            default:false
        },
        label: String,
        value: [String,Number,Boolean],
        searchItems: [Array,Object],
        type:String,
        icon:Boolean,
    },
    watch:{
       innerValue(new_value) {
         this.$emit('input', new_value)
       },
       value(new_value){
           this.innerValue = value;
       }
    } ,
    methods:{
        searchData(){
                // this.innervalue = this.value; //in future if we need pass value in service/api
                  //to show modal
                Http.get('http://localhost:3000/accounts')        //api/service call
                .then((res) => {
                    this.filteredItems = res.data;  
                    this.dialog = true;              //if successful asign the value
                })
                .catch(()=>{
                    this.dialog = false;
                    alert('something went wrong');
                })

        },
        itemSelected(item){
            this.innervalue = item.account_no;
            this.dialog = false;
        },  
    },
    // computed:{
    //     innervalue:{
    //         get(){
    //             return this.value;
    //         },
    //         set(val){
    //             this.$emit('input', val);

    //         }
    //     }
    // }
}
</script>