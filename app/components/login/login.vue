<!-- components/Login.vue -->
<template>
  <form
    @submit.prevent="handleSubmit"
    class="mx-auto w-full max-w-sm space-y-4 p-6"
  >
    <div class="logomark size-12"></div>
    <h2 class="text-2xl font-semibold">Sign in to ArtistWorks</h2>
    <div class="text-sm">
      New User?
      <NuxtLink
        to="/create-account"
        class="text-sm text-link no-underline hover:underline"
      >
        Create an account.
      </NuxtLink>
    </div>
    <div class="space-y-1">
      <label for="username" class="block text-sm font-medium">Username</label>
      <input
        id="username"
        v-model.trim="username"
        name="username"
        type="text"
        autocomplete="username"
        required
        class="w-full rounded-lg border px-3 py-2 outline-none focus:ring placeholder:text-gray-400 placeholder:text-sm"
        placeholder="Enter Username"
        :aria-invalid="errors.username ? 'true' : 'false'"
        :aria-describedby="errors.username ? 'username-error' : undefined"
      />
      <p
        v-if="errors.username"
        id="username-error"
        class="text-sm text-red-600"
      >
        {{ errors.username }}
      </p>
    </div>

    <div class="space-y-1">
      <label for="password" class="block text-sm font-medium">Password</label>
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          name="password"
          autocomplete="current-password"
          required
          class="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring placeholder:text-gray-400 placeholder:text-sm"
          placeholder="Enter password"
          :aria-invalid="errors.password ? 'true' : 'false'"
          :aria-describedby="errors.password ? 'password-error' : undefined"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-0 mr-2 rounded px-2 text-sm text-gray-600 cursor-pointer"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
        >
          {{ showPassword ? "Hide" : "Show" }}
        </button>
      </div>

      <p
        v-if="errors.password"
        id="password-error"
        class="text-sm text-red-600"
      >
        {{ errors.password }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full rounded-full bg-primary px-4 py-2 font-medium text-white cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ loading ? "Signing in…" : "Continue" }}
    </button>

    <NuxtLink
      to="/forgot-password"
      class="text-sm no-underline hover:underline"
    >
      Forgot Password?
    </NuxtLink>

    <div class="relative py-2 text-center text-xs text-gray-500">
      <span class="bg-white px-2">Or sign in with</span>
      <div
        class="absolute inset-x-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-gray-200"
      ></div>
    </div>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 cursor-pointer hover:bg-gray-50"
        @click="emit('oauth', 'google')"
        aria-label="Continue with Google"
      >
        <!-- Simple G icon -->
        <NuxtImg class="size-4" src="/img/google.svg" />
        Google
      </button>

      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 cursor-pointer hover:bg-gray-50"
        @click="emit('oauth', 'apple')"
        aria-label="Continue with Apple"
      >
        <NuxtImg class="size-4" src="/img/apple.svg" />
        Apple
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (e: "submit", payload: { username: string; password: string }): void;
  (e: "oauth", provider: "google" | "apple"): void;
}>();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const errors = reactive<{ username?: string; password?: string }>({});

function validate() {
  errors.username = !username.value ? "Username is required." : undefined;
  errors.password = !password.value ? "Password is required." : undefined;
  return !errors.username && !errors.password;
}

async function handleSubmit() {
  if (!validate()) return;
  loading.value = true;
  try {
    emit("submit", { username: username.value, password: password.value });
  } finally {
    loading.value = false;
  }
}
</script>
