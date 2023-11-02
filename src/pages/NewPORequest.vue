<template>
<b-modal size="xl" ref="newPORequestModal" class="new-po-request-modal" no-fade no-close-on-esc no-close-on-backdrop>
    <template slot="modal-header">
        <div class="netview-ipo-brand">
            <span>Netview</span>
            <span class="ipo-keyword">IPO</span>
            <span class="modalLabel">
                New Purchase Order request
            </span>
        </div>
        <div>
            <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
        </div>  
    </template>      

    <div class="NewPORequestBody">
        <div class="requestHeaderSection col-md-12">
            <div class="requestHeaderCol col-md-6">
                <div class="departmentContainer">
                    <label class="col-md-3">Department:</label>
                    <select class="form-control col-md-8" v-model="header.department_id">
                        <option v-bind:value="department.value" v-for="department in departments" :key="department.value">{{department.text}}</option>
                    </select>
                </div>
                <div class="reasonContainer">
                    <label class="col-md-3 alignTop">Reason for Purchase:</label>
                    <textarea class="form-control col-md-8" v-model="header.reason_for_purchase"/>
                </div>
                <div class="commentContainer">
                    <label class="col-md-3 alignTop">Comment:</label>
                    <textarea class="form-control col-md-8" v-model="comment"/>
                </div>
                <div class="poTypeContainer">
                    <label class="col-md-3">PO Type:</label>
                    <select class="form-control col-md-8" @change="requestTypechange($event)">
                        <option :key="type.text" v-for="type in requestTypeOptions" v-bind:value="type.value"
                        :selected="type.text === 'Other'"
                        >{{type.text}}</option>
                    </select>
                </div>
            </div>
            <div class="requestHeaderCol col-md-6">
                <div class="titleContainer">
                    <label class="col-md-3">Title:</label>
                    <input class="form-control col-md-8" v-model="header.title">
                </div>
                <div class="vendorContainer">
                    <label class="col-md-3">Vendor #:</label>
                    <input class="form-control col-md-8" v-model="header.vendor">
                </div>
                <div class="quoteNumContainer">
                    <label class="col-md-3">Quote #:</label>
                    <input class="form-control col-md-8" v-model="header.quote_number">
                </div>
                <div class="markImportantContainer">
                    <label class="col-md-3">Mark as Important:</label>
                    <input class="form-control markImportantCheckbox" type='checkbox' v-model="header.reason_for_purchase"/>
                </div>
                <div class="attachFileContainer">
                    <label class="col-md-3">Attach File</label>
                    <file-attachment v-model="files" icon-class="fa fa-cloud"></file-attachment>
                </div>

            </div>
        </div>
        <div class="requestGridSection">
            <button class="btn btn-primary NewPORequestAddNewItemBtn" @click="addNewItem">Add New Item</button>

            <add-unit-grid class="requestGrid" v-if="requestType == 'Unit'"/>
            <add-other class="requestGrid" v-if="requestType == 'Other'"/>
            <add-part class="requestGrid" v-if="requestType == 'Part'"/>
        </div>
    </div>

    <template slot="modal-footer">
        <button class="btn btn-primary NewPORequestModalCloseBtn" v-on:click="closeModal">Close</button>
        <button class="btn btn-primary NewPORequestModalSaveBtn" v-on:click="saveRequest">Save</button>
        <button class="btn btn-primary NewPORequestModalCloseBtn" v-on:click="submitRequest">Submt For Approval</button>
    </template>

    <edoc-modal ref="Edocs_Modal" @AddNewDocument="showAddEModal"></edoc-modal>
    <edoc-add-modal ref="edocaddModal"></edoc-add-modal>
    <file-attachment-modal ref="fileModal" @fileSelected="setFiles"></file-attachment-modal>

</b-modal>
</template>

<script>
import AddUnitGrid from '../components/NewPORequestComponents/AddUnitGrid.vue';
import AddOther from '../components/NewPORequestComponents/AddOther.vue';
import AddPart from '../components/NewPORequestComponents/AddPart.vue';
import EdocModal from '../components/EdocModal';
import EdocAddModal from '../components/EdocAddModal';
import FileAttachmentModal from '../components/forms/FileAttachmentModal';
import FileAttachment from '../components/forms/FileAttachment';
import Http from 'axios';

export default {
    name: "NewPORequestModal",
    components: {
        'add-unit-grid': AddUnitGrid,
        'add-other': AddOther,
        'add-part': AddPart,
        EdocModal,
        EdocAddModal,
        'file-attachment-modal':FileAttachmentModal,FileAttachment
    },
    data(){
        return {
            requestTypeOptions : [
                {text:'Unit', value:0},
                {text:'Part', value:0},
                {text:'Other', value:0}
            ],
            requestType: 'Other',
            inputModal: false,
            files:[],
            header:{},
            comment:'',
            departments:[
                {text: "Software", value:30},
                {text: "Office", value:40}
            ]
        }
    },
    watch: {
        requestType(){
            this.$store.commit('setRequestItemData', []);
        }
    },
    computed: {

    },
    methods: {
        showModal(){
            this.reset();
            this.$refs.newPORequestModal.show();
        },
        closeModal(){
            this.$refs.newPORequestModal.hide();
            this.reset();
        },
        reset(){
            this.$store.commit('setRequestItemData', []);
            this.requestType = 'Other';
        },
        addNewItem(){
            var itemData = this.$store.getters.getRequestItemData;
            var newLine = {
                item_id: itemData.length
            }

            newLine.quantity = 1;
            newLine.unitPrice = 0;

            switch(this.requestType) {
                case "Other":
                    break;
                case "Part":
                    break;
                case "Unit":
                    break;
                default:
                    break;
            }
            itemData.push(newLine);
            this.$store.commit('setRequestItemData', itemData);
        },
        saveRequest() {
            let formData = new FormData();
            if(this.files){
                for (let i = 0; i < this.files.length; i++) {
                    formData.append(`files[${i}]`, this.files[i]);
                    formData.append(`filesSize[${i}]`, this.files[i].size);
                }
                formData.append('file_count', this.files.length);
            }
            let date = new Date();
            this.header.created_at = new Date();
            this.header.created_by = "Name of the autorized user";
            this.header.type = this.requestType;
            let lines = this.$store.getters.getRequestItemData;
            let formattedlines = [];
            for(let i = 0; i < lines.length; i++) {
               formattedlines.push({
                   "id": lines[i].item_id,
                   "line_number": 1,
                   "status": 0,
                   "type": 0,
                   "created_by": "jpoh doe",
                   "created_at": date,
                   "asset_id": 7786,
                   "item_number": lines[i].itemNumber,
                   "description": lines[i].description,
                   request_info_lists:[{
                       "id": lines[i].item_id,
                       "quantity": lines[i].quantity,
                       "amount": lines[i].quantity * lines[i].unitPrice,
                       "requested_by": "Timothy",
                       "requested_date": date,
                   }]
            });
            }
            formData.set('curloc', this.$store.state.Location.currentLocation.Location);
            formData.set('action', "createDocument");
            // formData.set('header', JSON.stringify(this.header));
            // formData.set('lines',JSON.stringify(formattedlines) );

            let body = {
                header: this.header,
                lines: formattedlines,
                comment:this.comment
            }
            let json={body:body};

            formData.append('json',JSON.stringify(json));

            Http.post(`http://writwiz.test/api/v1/test`,formData
            )
            .then(()=>{
                alert('data saved');
                this.closeModal();
            })
            .catch(()=>{
                alert('some error occured');
                this.files=[];
            })
        },
        submitRequest(){
            this.closeModal()
        },
        showInputModal() {
            this.inputModal = true;
        },
        showEdoc(){
            this.$refs.Edocs_Modal.showModal();
        },
        showAddEModal(){
            this.$refs.edocaddModal.showModal();
        },
        showFileModal(){
            this.$refs.fileModal.showModal();
        },
        setFiles(items){
            this.files = items;
        },
        requestTypechange(event){
            window.console.log(event.target.value);
        }
    }
    
}
</script>

<style lang="scss" scoped>

.NewPORequestBody {
    height: 100%
}

.requestHeaderSection {
    display: flex;
    height: 50%

    label {
        font-weight: bold;
        text-align: right;
        align-self: center;
    }

    input, select, textarea {
        display: inline-flex;
    }
    .requestHeaderCol > div {
        margin-top: 15px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }

    .attachFileConatiner {
        text-align: right;
        padding: 0;
        cursor: pointer;

        .attachFileCloud {
            text-align: right;
            font-size: 25px;
            margin-right: 15px;
            color: #999;
            background-color: #eee;
            padding: 3px;
        }
    }

}

.requestGridSection {
    height: 50%;
}

.requestGrid {
    margin-top: 10px;
    height: calc(100% - 44px)
}

.markImportantCheckbox {
    width: inherit;
    vertical-align: middle;
    align-self: center;
}
</style>
