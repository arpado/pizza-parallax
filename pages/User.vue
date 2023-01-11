<template>
  <div class="wrapper flex column center-both">
    <h3>user data:</h3>
    <div class="user-container">
      {{ userStore.user }}
    </div>
    <div class="user-container">
      {{ userFromDatabase }}
    </div>
    <button @click="getData">get user</button>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      userFromDatabase: null,
    };
  },
  methods: {
    async getData() {
      // ezt userstorebol szedni, es csak a modositas eseten visszakuldeni a dolgot
      if (this.userStore.user) {
        this.userFromDatabase = await getUserFromDB();
      } else {
        this.userFromDatabase = null;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}
.user-container {
  border: 1px solid black;
}
</style>