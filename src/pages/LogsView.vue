<template>
<div class="page-container">
  <div class="page-header">
    <h1 class="page-title">System Logs</h1>
    <p class="page-subtitle">Monitor and analyze system activity and user interactions</p>
  </div>
  
  <div class="logs-content">
    <div class="card p-2xl">
      <div class="flex justify-between items-center mb-xl">
        <h2 class="text-xl font-semibold text-primary">Recent Activity</h2>
        <div class="flex gap-md">
          <button class="btn btn-secondary">
            Export Logs
          </button>
          <button class="btn btn-primary">
            Refresh
          </button>
        </div>
      </div>
      
      <div class="logs-table-container">
        <div class="grid grid-cols-1 gap-lg">
          <div class="card p-lg border-l-4" style="border-left-color: var(--color-success);">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-primary mb-xs">User Login Successful</h4>
                <p class="text-sm text-tertiary">user2@example.com logged in successfully</p>
              </div>
              <span class="text-xs text-tertiary">2 minutes ago</span>
            </div>
          </div>
          
          <div class="card p-lg border-l-4" style="border-left-color: var(--color-secondary);">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-primary mb-xs">Failed Login Attempt</h4>
                <p class="text-sm text-tertiary">Invalid credentials for user1@example.com</p>
              </div>
              <span class="text-xs text-tertiary">5 minutes ago</span>
            </div>
          </div>
          
          <div class="card p-lg border-l-4" style="border-left-color: var(--color-primary);">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-primary mb-xs">System Health Check</h4>
                <p class="text-sm text-tertiary">All systems operational</p>
              </div>
              <span class="text-xs text-tertiary">10 minutes ago</span>
            </div>
          </div>
          
          <div class="card p-lg border-l-4" style="border-left-color: var(--color-accent);">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-primary mb-xs">New User Registration</h4>
                <p class="text-sm text-tertiary">New user account created</p>
              </div>
              <span class="text-xs text-tertiary">15 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logs-content {
  flex: 1;
}

.mb-xs {
  margin-bottom: var(--spacing-xs);
}

.mb-xl {
  margin-bottom: var(--spacing-xl);
}

.border-l-4 {
  border-left-width: 4px;
}
</style>