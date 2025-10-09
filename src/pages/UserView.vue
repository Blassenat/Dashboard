<template>
<div class="page-container">
  <div class="page-header">
    <h1 class="page-title">User Management</h1>
    <p class="page-subtitle">View and manage user accounts and permissions</p>
  </div>
  
  <div class="user-content">
    <div class="card p-2xl">
      <div class="flex justify-between items-center mb-xl">
        <h2 class="text-xl font-semibold text-primary">User Overview</h2>
        <div class="flex gap-md">
          <button class="btn btn-secondary">
            Export Users
          </button>
          <button class="btn btn-primary">
            Add User
          </button>
        </div>
      </div>
      
      <div class="user-stats grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
          <div class="card p-lg">
            <div class="text-2xl font-bold text-brand-primary mb-sm">1,234</div>
            <div class="text-sm text-tertiary">Total Users</div>
          </div>
          <div class="card p-lg">
            <div class="text-2xl font-bold text-brand-secondary mb-sm">1,180</div>
            <div class="text-sm text-tertiary">Active Users</div>
          </div>
          <div class="card p-lg">
            <div class="text-2xl font-bold text-brand-accent mb-sm">54</div>
            <div class="text-sm text-tertiary">Pending Verification</div>
          </div>
      </div>
      
      <div class="user-list">
        <h3 class="text-lg font-medium text-primary mb-lg">Recent Users</h3>
        <div class="grid grid-cols-1 gap-md">
          <div class="card p-lg flex items-center justify-between">
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div>
                <div class="font-medium text-primary">John Doe</div>
                <div class="text-sm text-tertiary">john.doe@example.com</div>
              </div>
            </div>
            <div class="flex items-center gap-md">
              <span class="badge badge-active">Active</span>
              <span class="text-sm text-tertiary">Admin</span>
            </div>
          </div>
          
          <div class="card p-lg flex items-center justify-between">
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-white font-medium">
                JS
              </div>
              <div>
                <div class="font-medium text-primary">Jane Smith</div>
                <div class="text-sm text-tertiary">jane.smith@example.com</div>
              </div>
            </div>
            <div class="flex items-center gap-md">
              <span class="badge badge-active">Active</span>
              <span class="text-sm text-tertiary">User</span>
            </div>
          </div>
          
          <div class="card p-lg flex items-center justify-between">
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white font-medium">
                MJ
              </div>
              <div>
                <div class="font-medium text-primary">Mike Johnson</div>
                <div class="text-sm text-tertiary">mike.johnson@example.com</div>
              </div>
            </div>
            <div class="flex items-center gap-md">
              <span class="badge badge-inactive">Inactive</span>
              <span class="text-sm text-tertiary">User</span>
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
.user-content {
  flex: 1;
}

.user-stats {
  margin-bottom: var(--spacing-xl);
}

.user-list {
  margin-top: var(--spacing-xl);
}

.badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.badge-active {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.badge-inactive {
  background-color: var(--color-error-light);
  color: var(--color-error);
}

.mb-sm {
  margin-bottom: var(--spacing-sm);
}

.mb-md {
  margin-bottom: var(--spacing-md);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}

.mb-xl {
  margin-bottom: var(--spacing-xl);
}
</style>