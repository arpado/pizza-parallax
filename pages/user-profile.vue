<template>
  <div class="wrapper flex column center-both">
    <h3>User Profile:</h3>
    <div class="data-container flex column" v-if="userStore.user">
      <div class="data-unit" v-for="(value, key) in userStore.user" :key="key">
        <div
          :class="key"
          class="flex justify-between"
          v-if="activeSetup === key"
        >
          <div>
            <input class="input-field" type="text" v-model="userStore.user[key]" />
            <button @click="toggleSetup(key)">Cancel</button>
            <button @click="userStore.updateUser(key, userStore.user[key], userStore.user.id)">Save</button>
          </div>
        </div>
        <div class="flex justify-between" v-else>
          <span>{{ key }}</span> -- <span>{{ value }}</span> --
          <a @click="toggleSetup(key)">Modify data</a>
        </div>
      </div>
      <h3>User History</h3>
      <div class="flex column" v-if="userStore.orderHistory">
        <div class="data-unit-RENAME" v-for="(item, index) in userStore.orderHistory" :key="index">
          <p>{{ item }}</p>
        </div>
        <button @click="userStore.getUserOrderHistory">Get History</button>
      </div>
    </div>
    <div v-else>
      <h3>No user logged in!</h3>
    </div>
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
      activeSetup: null,
    };
  },
  methods: {
    toggleSetup(key) {
      if (this.activeSetup === key) {
        this.activeSetup = null;
        return;
      }
      this.activeSetup = key;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  color: var(--main-white);
}
.data-container {
  border: 1px solid black;
  width: 360px;
}
.data-unit {
  height: 100px;
}
.input-field {
  width: 100 px;
}
</style>