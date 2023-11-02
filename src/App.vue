<template>

    <div id="app">
      <navbar @showNewPORequestModal="requestpo"></navbar>

    <router-view></router-view>

    <new-po-request-modal  ref="newPORequestModal"/>
    </div>
</template>

<script>

import NewPORequestModal from './pages/NewPORequest';
import Navbar from './pages/layouts/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
   'new-po-request-modal':NewPORequestModal,
  },
  methods:{
    requestpo(){
      this.$refs.newPORequestModal.showModal();
    }
  }

 }
</script>

<style>

</style>
