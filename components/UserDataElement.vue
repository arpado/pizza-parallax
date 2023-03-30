<template>
  <div class="flex column center-both">
    <h3>User Profile:</h3>
    <!-- <ul>
      <li v-for="(item, index) in setUserData" :key="index">{{item.name}}: {{ item.data }}</li>
    </ul> -->
    <div class="data-container flex column" v-if="userStore.user">
      <div class="data-unit" v-for="item in setUserData" :key="item.id">
        <h5>{{ item.name }}</h5>
        <div
          :class="item.id"
          class="flex justify-between"
          v-if="activeSetup === item.id"
        >
          <div class="flex ">
            <input
              class="input-field"
              type="text"
              v-model="item.data"
            />
            <!-- v-model="userStore.user[item.id]" -->
          <ButtonElementSmall @click="toggleSetup(item.id)" text="Cancel" />
          <ButtonElementSmall @click="
                userStore.updateUser(
                  key,
                  userStore.user[item.id],
                  userStore.user.id
                )
              " text="Save" />

            <!-- <button @click="toggleSetup(item.id)">Cancel</button>
            <button
              @click="
                userStore.updateUser(
                  key,
                  userStore.user[item.id],
                  userStore.user.id
                )
              "
            >
              Save
            </button> -->
          </div>
        </div>
        <div class="flex justify-between" v-else>
          <!-- <span>{{ item.id }}</span>  -->
          <span>{{ item.data }}</span>
          <!-- <a @click="toggleSetup(item.id)">Modify data</a> -->
          <ButtonElementSmall @click="toggleSetup(item.id)" text="Modify data" />
        </div>
      </div>
      <!-- THE OPTION TO DELETE USER ACCOUNT IS REMOVED FOR NOW -->
      <!-- <div class="delete-user">
        <button @click="deleteUser">Delete Account</button>
      </div> -->
    </div>
    <div v-else>
      <h3>No user logged in!</h3>
    </div>
  </div>
</template>

<script>
// import { useUserStore } from "@/stores/userStore";

export default {
//   setup() {
//     const userStore = useUserStore();
//     return { userStore };
//   },
  data() {
    return {
      activeSetup: null,
    };
  },
  props: ['userStore'],
  methods: {
    toggleSetup(key) {
      if (this.activeSetup === key) {
        this.activeSetup = null;
        return;
      }
      this.activeSetup = key;
    },

    // REMOVED FOR NOW
    // deleteUser() {
    //   if (confirm('Are you sure?')) {
    //     this.userStore.deleteUser()
    //   }
    // }
  },
  computed: {
    setUserData() {
      return [
        {
          name: "First Name",
          id: "firstName",
          description: "",
          data: (this.userStore.user.firstName || null)
        },
        {
          name: "Last Name",
          id: "lastName",
          description: "",
          data: this.userStore.user.lastName
        },
        {
          name: "Address",
          id: "address",
          description: "",
          data: this.userStore.user.address
        },
        {
          name: "Phone Number",
          id: "phone",
          description: "",
          data: (this.userStore.user.phone || 'No Phone Number Given!')
        },
        {
          name: "Email Address",
          id: "email",
          description: "",
          data: this.userStore.user.email
        }
      ]
    }
  }
};
</script>

<style scoped>
/* .main-container {
  width: 100%;
  min-height: 100%;
  min-width: 400px;
  max-width: 90vw;
} */
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