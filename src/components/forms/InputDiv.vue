<template>
<div>
    <div class="mb-half">
        <tr style="width: 100%"> 
        <td style="width: 55%"><label>{{label}}</label></td>
        <td style="width: 30%  float:right">
            
        <input :type="type" 
        v-model="innervalue"
        @keyup.enter="searchData"
        :disabled="disable"
        />
        </td>
        </tr>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            filteredItems: [],
            dialog:false,
            // innervalue:null,
        }
    },
    props:{
        disable:{
            type:Boolean,
            default:false
        },
        label: String,
        value: [String,Number,Boolean],
    
        type:String,
        icon:String,
    },
    methods:{
    },
    computed:{
        innervalue:{
            get(){
                return this.value;
            },
            set(val){
                console.log(val);
                this.$emit('input', val);

            }
        }
    }
}
</script>