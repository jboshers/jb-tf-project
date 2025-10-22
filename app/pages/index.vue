<script setup lang="ts">
function onSubmit({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  // TODO: call your auth API here (e.g., $fetch('/api/login', { method:'POST', body:{ username, password } }))
  console.log("login", username, password);
}

function onOAuth(provider: "google" | "apple") {
  // TODO: kick off your OAuth flow here
  // Example with navigateTo to your auth endpoints:
  // navigateTo(`/api/auth/${provider}`)
  console.log("oauth", provider);
}
</script>

<template>
  <div class="flex h-screen">
    <div class="welcome flex-none w-84 shrink-0 p-8 hidden md:flex">
      <h1 class="text-[56px]/14 font-bold text-foreground">
        Welcome <br />Back
      </h1>
    </div>
    <div class="container pt-8">
      <Login @submit="onSubmit" @oauth="onOAuth" />
    </div>
  </div>
</template>
