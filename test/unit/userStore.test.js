import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { useUserStore } from '../../stores/userStore'
import { registerWithEmail, postLoginForm } from '../../composables/userAuth'


const testUser = {
  firstName: "test_first_name",
  lastName: 'test_last_name',
  email: "test_email@gmail.com",
  phone: 12345678,
  address: "test address 87"
}



const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  userStore = useUserStore();
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

  afterEach(() => {
    userStore.$reset()
  })

  it('pass firstName to the getTable the result should be the first name', () => {
    expect(userStore.getTable("firstName")).toBe(testUser.firstName)
  })


})

