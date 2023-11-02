<template>
    <b-modal size="md" ref="edocsModal" no-fade no-close-on-esc no-close-on-backdrop>
        <template slot="modal-header">
            <div class="">
                eDOCS
            </div>
            <div>
                <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
            </div>
        </template>

        <div class="edocsGridHeader">
            <button class="btn btn-primary addNewDocBtn" @click="addDocument">Add New Document</button>

            <input class="form-control filterEdocs" placeholder="Filter Results"/>
        </div>

        <grid
            class="edocsGrid"
            :data="edocsData"
            :sortable="true"
            :columns="edocsDataColumns"
            :keyProps="['file']"
            :pageSize="9999">
            <template slot="no-content">
                <div class="noGridContent">
                    No Edocs Found
                </div>
            </template>
        </grid>

        <template slot="modal-footer">
            <button class="btn btn-primary EdocsCloseBtn" v-on:click="closeModal">Close</button>
        </template>
    </b-modal>
</template> 

<script>
import Grid from './Grid';
export default {
    name: "EdocsModal",
    data() {
        return {
            edocsData: [
                {
                    file: "",
                    document: "",
                    date:"",
                    description:"",
                    tags:"",
                    type:"",
                    size:0,
                    uploader:""
                }
            ],
            edocsDataColumns: [
                {label: "Edit", field: "edit", klass: "edocsEdit"},
                {label: "File", field: "field", klass: "edocsFile"},
                {label: "Document", field: "document", klass: "edocsDocument"},
                {label: "Date", field: "date", klass: "edocsDate"},
                {label: "Description", field: "description", klass: "edocsDescription"},
                {label: "Tags", field: "tags", klass: "edocsTag"},
                {label: "Type", field: "type", klass: "edocsType"},
                {label: "Size", field: "size", klass: "edocsSize"},
                {label: "Uploader", field: "uploader", klass: "edocsUploader"},
                {label: "Delete", field: "delete", klass: "edocsDelete"},
                
            ]
        }
    },
    components: {
        'grid': Grid
    },
    computed: {

    },
    methods: {
        showModal() {
            this.$refs.edocsModal.show();
        },
        closeModal() {
            this.$refs.edocsModal.hide();
        },
        addDocument(){
            this.closeModal();
            this.$emit('AddNewDocument')
        }
    }
}
</script>

<style lang="scss" scoped>

.edocsGridHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .filterEdocs {
        width: 200px;
    }
}

.edocsGrid {
    height: calc(100% - 48px)
}

</style>