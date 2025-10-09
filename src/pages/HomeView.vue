<template>
<div class="page-container">
  <div class="page-header">
    <h1 class="page-title">Dashboard Homepage</h1>
    <p class="page-subtitle">Welcome to your dashboard training project</p>
  </div>
  
  <div class="home-content">
    <div class="card p-2xl">
      <h2 class="text-xl font-semibold text-primary mb-lg">Getting Started</h2>
      <p class="text-base text-secondary mb-lg">
        This is a Vue.js dashboard training project showcasing modern web development practices.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <div class="card p-lg">
          <h3 class="text-lg font-medium text-primary mb-md">Features</h3>
          <ul class="text-base text-secondary space-y-sm">
            <li>• User Authentication System</li>
            <li>• Real-time Dashboard</li>
            <li>• Responsive Design</li>
            <li>• Modern UI Components</li>
          </ul>
        </div>
        <div class="card p-lg">
          <h3 class="text-lg font-medium text-primary mb-md">Technologies</h3>
          <ul class="text-base text-secondary space-y-sm">
            <li>• Vue 3 with Composition API</li>
            <li>• TypeScript</li>
            <li>• Pinia State Management</li>
            <li>• Vue Router</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-content {
  flex: 1;
}

.space-y-sm > * + * {
  margin-top: var(--spacing-sm);
}

.mb-md {
  margin-bottom: var(--spacing-md);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}
</style>