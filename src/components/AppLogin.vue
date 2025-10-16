<template>
  
  <div class="layout">
   
    <div class="main">
      
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>