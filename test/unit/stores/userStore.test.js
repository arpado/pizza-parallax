import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { registerWithEmail, postLoginForm } from '@/composables/userAuth'


const testUser = {
  firstName: "test_first_name",
  lastName: 'test_last_name',
  email: "test_email@gmail.com",
  phone: 12345678,
  address: "test address 87"
}

// const userStore = null;

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  // let userStore = useUserStore();
  // return userStore
}

describe('Sanity check to see how a basic test works', () => {
  test("Sanity check", () => {
    expect(true).toBe(true);
  });
})


describe('getTable test cases', () => {
  beforeEach(() => {
    setup()
  })

  // afterEach(() => {
  //   userStore.$reset()
  // })

  test('pass firstName to the getTable the result should be the "users" table, pass email res should be "profiles"', () => {
  let userStore = useUserStore();
    expect(userStore.getTable("firstName")).toBe("users")
    expect(userStore.getTable("email")).toBe("profiles")
  })
})

