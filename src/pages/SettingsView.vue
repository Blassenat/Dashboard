<template>
  <div class="container">
    <div class="settings-header">
      <div>
        <h1 class="settings-title">Account Settings</h1>
        <p class="settings-subtitle">Manage your account preferences and security settings</p>
      </div>
    </div>

    <div v-if="!user" class="loading-state">
      <div class="spinner"></div>
      <p>Loading user data...</p>
    </div>

    <form v-else-if="editableUser" @submit.prevent="saveSettings" class="settings-form">
      <!-- Profile Section -->
      <SettingsSection 
        title="Profile Information"
        description="Update your basic account information"
      >
        <BaseInput
          id="name"
          v-model="editableUser.name"
          label="Full Name"
          placeholder="Enter your full name"
          hint="This is how your name appears throughout the system"
          required
        />

        <BaseInput
          id="email"
          v-model="editableUser.email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          hint="We'll use this email for notifications and account recovery"
          required
        />
      </SettingsSection>

      <!-- Security Section -->
      <SettingsSection 
        title="Security"
        description="Protect your account with additional security measures"
      >
        <BaseCheckbox
          id="mfa"
          v-model="editableUser.mfaEnabled"
          title="Enable Multi-Factor Authentication"
          description="Receive verification codes via email for enhanced security"
        />
      </SettingsSection>

      <!-- Action Buttons -->
      <div class="form-actions">
        <BaseButton 
          type="submit" 
          :loading="isSaving"
          loading-text="Saving..."
        >
          Save Changes
        </BaseButton>
        
        <div v-if="saveStatus" :class="['status-message', saveStatus.type]">
          {{ saveStatus.message }}
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import BaseInput from "../components/BaseInput.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseButton from "../components/BaseButton.vue";
import SettingsSection from "../components/SettingsSection.vue";

const editableUser = ref<PublicUser | null>(null);
const auth = useAuthStore();
const user = computed(() => auth.user);
const isSaving = ref(false);
const saveStatus = ref<{ message: string; type: 'success' | 'error' } | null>(null);

type PublicUser = typeof auth.user;

onMounted(() => {
  if (auth.user) {
    editableUser.value = { ...auth.user };
  }
});

watch(user, (newUser) => {
  if (newUser && !editableUser.value) {
    editableUser.value = { ...newUser };
  }
}, { immediate: true });

async function saveSettings(): Promise<void> {
  if (!user.value) {
    return;
  }

  isSaving.value = true;
  saveStatus.value = null;
  const url = `/api/users/${user.value.id}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(editableUser.value),
    });

    if (!response.ok) {
      if (response.status === 403) {
        saveStatus.value = {
          message: "You do not have permission to update these settings",
          type: 'error'
        };
      } else if (response.status === 404) {
        saveStatus.value = {
          message: "User not found",
          type: 'error'
        };
      } else {
        saveStatus.value = {
          message: "Error saving settings",
          type: 'error'
        };
      }
      return;
    }

    const data = await response.json();
    auth.user = { ...auth.user, ...data.user };
    saveStatus.value = {
      message: "Settings updated successfully",
      type: 'success'
    };

    setTimeout(() => {
      saveStatus.value = null;
    }, 4000);
  } catch {
    saveStatus.value = {
      message: "Error saving settings",
      type: 'error'
    };
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.settings-header {
  margin-bottom: var(--spacing-4xl);
  padding-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--color-border-light);
}

.settings-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
  letter-spacing: -0.01em;
}

.settings-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-tertiary);
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3xl);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 640px) {
  .settings-header {
    margin-bottom: var(--spacing-2xl);
    padding-bottom: var(--spacing-xl);
  }

  .settings-title {
    font-size: var(--font-size-2xl);
  }
}
</style>