<template>
  <div class="wrapper flex column center-both">
    <div class="menu flex center-both wrap">
      <ButtonElement text="User Data" @click="setActiveMenu('userData')" />
      <ButtonElement
        text="Order History"
        @click="setActiveMenu('userHistory')"
      />
      <ButtonElement
        text="Something Else"
        @click="setActiveMenu('somethingElse')"
      />
    </div>
    <NuxtLayout name="card" class="card flex center-both">
      <div class="inner-container">
        <UserDataElement
          v-show="activeMenu === 'userData'"
          :userStore="userStore"
        />
        <UserHistoryElement
          v-show="activeMenu === 'userHistory'"
          :userStore="userStore"
        />
      </div>
    </NuxtLayout>
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
      activeMenu: "userData",
    };
  },
  methods: {
    setActiveMenu(menu) {
      this.activeMenu = menu;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  /* min-height: calc(100vh - 50px); */
  /* min-height: 100%; */
  color: var(--main-white);
  padding-top: 150px;
}
.menu > * {
  margin: 0 10px;
  width: 200px;
}
.card {
  max-width: fit-content;
}
.inner-container {
  width: 100%;
  min-height: 40vh;
  min-width: 400px;
  max-width: 90vw;
}
</style>