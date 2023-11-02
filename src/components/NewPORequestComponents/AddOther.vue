<template>
<div class="addUnitGridContainer">
    <grid
        class="itemGrid"
        :data="itemData"
        :columns="itemDataColumns"
        :keyProps="['item_id']"
        :pageSize="9999">

        <template slot="cell_description" slot-scope="{item}">
            <input v-model="item.description" class="form-control " style="width:70%;" onclick="this.select()"/>
        </template>
        <template slot="cell_itemNumber" slot-scope="{item}">
            <input v-model="item.itemNumber" class="form-control " onclick="this.select()"/>
        </template>
        <template slot="cell_quantity" slot-scope="{item}">
            <input type="number" v-model.number="item.quantity" class="form-control " onclick="this.select()"/>
        </template>
        <template slot="cell_unitPrice" slot-scope="{item}">
            <currency-input
            v-model="item.unitPrice" 
            class="form-control " 
            currency="USD"
            locale="en"
            v-on:focus.native="selectInput"/>
        </template>
        <template slot="cell_extendedPrice" slot-scope="{item}">
            <div :class="{textRed : extendedPrice(item) < 0}">{{extendedPrice(item)}} </div>
            <!-- <div :class="{textRed : extendedPrice(item) < 0}">{{formatPrice(extendedPrice(item))}} </div> -->
        </template>
        <template slot="cell_delete" slot-scope="{item}">
            <i class="fa fa-trash deleteButton" @click="deleteLine(item)"></i>
        </template>
        <template slot="cell_clone" slot-scope="{item}">
            <i class="fa fa-clone deleteButton" @click="cloneLine(item)"></i>
        </template>  
        <template slot="no-content">
            <div class="noGridContent">
                No Other-item Added
            </div>
        </template>
    </grid>
</div>
</template>

<script>
import Grid from '../Grid.vue';
import {CurrencyInput} from 'vue-currency-input'

export default {
    name: "AddOther",
    components: {
        'grid': Grid,
        'currency-input': CurrencyInput
    },
    data(){
        return {
            itemDataColumns: [
                {label:"Item Description", field:"description", klass: "itemDescription special-element"},
                {label: "Item Number", field:"itemNumber", klass: "itemNumber special-element"},
                {label: "Qty", field:"quantity", klass: "itemQuantity special-element"},
                {label: "Unit Price", field:"unitPrice", klass: "itemPrice special-element"},
                {label: "Extended Price", field:"extendedPrice", klass: "itemExtendedPrice"},
                {label: "", field:"clone", klass: "cloneLine"},
                {label: "", field:"delete", klass: "deleteLine"},
            ]

        }
    },
    computed: {
        itemData: {
            get() {
                return this.$store.getters.getRequestItemData;
            },
            set(newValue) {
                this.$store.commit('setRequestItemData', newValue)
            }
        }
    },
    methods: {
        deleteLine(lineItem) {
            this.itemData = this.itemData.filter( dataItem => {
                return dataItem.item_id != lineItem.item_id
            })
        },
        cloneLine(lineItem) {
            window.console.log(lineItem);
            var newItemData = this.itemData;
            var newLine = {
                item_id: newItemData.length
            };
            newLine.description = lineItem.description;
            newLine.itemNumber = lineItem.itemNumber;
            newLine.quantity = lineItem.quantity;
            newLine.unitPrice = lineItem.unitPrice;            
            newItemData.push(newLine);
            this.itemData = newItemData;
        },
        selectInput(e){
            setTimeout( () => {
                e.target.select();
            },50);
        },
        extendedPrice(item) {
            return item.quantity * item.unitPrice;
        }
    }
}
</script>

<style lang="scss">
    
.itemDescription {
    width: 30% !important;
}
.itemNumber {
    width: 30% !important;
}
.itemQuantity {
    width: 10% !important;
}
.itemPrice {
    width: 15% !important;
}

.itemExtendedPrice {
    width: calc(15% - 40px) !important;
}

.deleteLine {
    width: 40px !important;
    text-align: center !important
}

.cloneLine {
    width: 40px !important;
    text-align: center !important
}

</style>