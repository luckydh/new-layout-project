<template>
    <b-modal size="md" ref="fileAttachmentModal" class="edocs-add-modal" no-fade no-close-on-esc no-close-on-backdrop>
        <template slot="modal-header">
            <div class="">
                File Attachment
            </div>
            <div>
                <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
            </div>
        </template>

        <div class="edocsAddForm">
            <div class="col-md-12">
                <label class="col-md-3">File Document:</label><div class="input-group-sm col-md-7" style="display:inline-flex;padding: 0;">
                    <input type="file" name="file" ref="edocFileInput" @change="setFileName" style="display: none;" multiple>
                    <input type="text" class="form-control input-sm edocAddFileLocationInput" v-model="fileName" ref="edocAddFileLocationInput" readonly="readonly">
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-file edocAddBrowseBtn" ref="edocAddBrowseBtn" @click="$refs.edocFileInput.click()" autofocus="">
                            <span class="fa fa-folder-open"></span>
                        </button>
                    </span>
                </div>
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
    name:"fileAttachmentModal",
    data() {
        return {
            fileName: "",
            files:[],
        }
    },
    computed: {

    },
    methods: {
        closeModal() {
            this.$refs.fileAttachmentModal.hide();
            this.reset();
        },
        showModal(){
            this.reset();
            this.$refs.fileAttachmentModal.show();
        },
        reset() {
            this.fileName = "";
            // this.$refs.edocFileInput.value = null;
        },
        setFileName(event) {
            this.fileName = '';
            this.files = event.target.files;

            if(!this.files.length) return;

            for(let x = 0; x< this.files.length; x++ ){
                this.fileName += this.files[x].name + ';';
            }
        },
        addEdoc(){
            this.$emit('fileSelected',this.files)
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