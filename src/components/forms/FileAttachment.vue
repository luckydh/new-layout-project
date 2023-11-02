<template>
    <div class="edocsAddForm">
        <div class="col-md-12">
            <!-- <label class="col-md-4">Attach File:</label> -->
            <div class="input-group-sm col-md-7" style="display:inline-flex;padding: 0;">
                <span class="input-group-btn">
                    <button class="btn btn-default btn-file edocAddBrowseBtn" ref="edocAddBrowseBtn" @click="$refs.edocFileInput.click()" autofocus="">
                        <span :class="iconClass"></span>
                    </button>
                </span>
                <input name="file" type="file" ref="edocFileInput" @change="setFile" style="display: none;" multiple/>
                <input name="file" v-model="innerValue" style="display: none;"/>
                <input type="text" class="form-control input-sm edocAddFileLocationInput" v-if="fileName" v-model="fileName" ref="edocAddFileLocationInput" readonly="readonly"/>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"fileAttachment",
    data() {
        return {
            // fileName: "",
            innerValue:[],
        }
    },
    props:{
        iconClass:{
            type: String,
            default: 'fa fa-folder-open'
        },
        value:{
            type:[FileList,Array,Object],
        }
        },
    computed: {
            fileName(){
                let fileName = '';window.console.log('dd');
            var files = this.value;

            if(!files.length) return;

            for(let x = 0; x< files.length; x++ ){
                fileName += files[x].name + ';';
            }
            return fileName;
            }
    },
    watch:{
        innerValue(new_value) {
            this.$emit('input', new_value)
        },
        value(new_value){
        this.innerValue = new_value;
        }
    },
    methods: {
        reset() {
            this.fileName = "";
            // this.$refs.edocFileInput.value = null;
        },
        setFile(event) {
            var files = event.target.files;

            this.innerValue = files;
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