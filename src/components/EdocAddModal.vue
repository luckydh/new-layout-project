<template>
    <b-modal size="md" ref="edocsAddModal" class="edocs-add-modal" no-fade no-close-on-esc no-close-on-backdrop>
        <template slot="modal-header">
            <div class="">
                eDOCS Add
            </div>
            <div>
                <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
            </div>
        </template>

        <div class="edocsAddForm">
            <div class="col-md-12">
                <label class="col-md-3">File Document:</label>
                <div class="input-group-sm col-md-7" style="display:inline-flex;padding: 0;">
                    <input type="file" name="file" ref="edocFileInput" @change="setFileName" style="display: none;">
                    <input type="text" class="form-control input-sm edocAddFileLocationInput" v-model="fileName" ref="edocAddFileLocationInput" readonly="readonly">
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-file edocAddBrowseBtn" ref="edocAddBrowseBtn" @click="$refs.edocFileInput.click()" autofocus="">
                            <span class="fa fa-folder-open"></span>
                        </button>
                    </span>
                </div>
            </div>
            <div class="col-md-12">
                <label class="col-md-3">Document Number:</label><input class="form-control col-md-7"/>
            </div>
            <div class="col-md-12">
                <label class="col-md-3">Document Date:</label><div class="col-md-7 dateContainer"><el-date-picker type="date" class="" v-model="date" :clearable="false" format="MM/dd/yyyy"></el-date-picker></div>
            </div>
            <div class="col-md-12">
                <label class="col-md-3">Module:</label><select class="form-control col-md-7"></select>
            </div>
            <div class="col-md-12">
                <label class="col-md-3">Description:</label><input class="form-control col-md-7"/>
            </div>
             <div class="col-md-12">
                <label class="col-md-3">Tags:</label><input class="form-control col-md-7"/>
            </div>
        </div>

        <template slot="modal-footer">
            <button class="btn btn-primary EdocsAddCloseBtn" v-on:click="closeModal">Close</button>
            <button class="btn btn-primary EdocsAddBtn" v-on:click="addEdoc">Submit</button>
        </template>
    </b-modal>
</template>

<script>
export default {
    name:"EdocsAddModal",
    data() {
        return {
            date: new Date(),
            fileName: ""
        }
    },
    computed: {

    },
    methods: {
        closeModal() {
            this.$refs.edocsAddModal.hide();
            this.reset();
        },
        showModal(){
            this.reset();
            this.$refs.edocsAddModal.show();
        },
        reset() {
            this.fileName = "";
            this.date = new Date();
            // this.$refs.edocFileInput.value = null;
        },
        setFileName(event) {
            this.fileName = '';
            var files = event.target.files;

            if(!files.length) return;

            for(let x = 0; x< files.length; x++ ){
                this.fileName += files[x].name + ';';
            }
        },
        addEdoc(){
            this.closeModal();
        }
    }
}
</script>

<style lang="scss" module>
.edocsAddForm {
    display: flex;
    flex-wrap: wrap;
    
    input {
        display: inline-flex;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    select {
        display: inline-flex;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    label {
        text-align: right;
        font-weight: bold;
    }

    > div {
        margin: 10px 0;
        display: inline-flex;
        align-items: baseline;
    }

    .edocAddBrowseBtn {
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }

    .el-input-inner {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }

    .dateContainer {
        display: inline-flex;
        padding: 0;
        > div {
            width: 100%;
        }
    }
}

</style>