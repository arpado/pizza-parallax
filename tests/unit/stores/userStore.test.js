import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import * as userAuth from '@/composables/userAuth'
import { clearUserData } from '@/stores/userStore'
import { loginData, userData, activeUser } from './inputData/userStoreTestInput'
import { expect } from 'vitest'

// const testUser = {
//   firstName: "test_first_name",
//   lastName: 'test_last_name',
//   email: "test_email@gmail.com",
//   phone: 12345678,
//   address: "test address 87"
// }

// const userStore = null;

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  // let userStore = useUserStore();
  // return userStore
}

beforeEach(() => {
  setup()
})

afterEach(() => {
  vi.clearAllMocks()
  vi.restoreAllMocks()
})

// describe('Sanity check', () => {
//   test("Sanity check", () => {
//     expect(true).toBe(true);
//   });
// })


describe('getTable test cases', () => {

  test('pass firstName to the getTable the result should be the "users" table, pass email res should be "profiles"', () => {
  let userStore = useUserStore();
    expect(userStore.getTable("firstName")).toBe("users")
    expect(userStore.getTable("email")).toBe("profiles")
  })
})

describe('login tests', () => {

  test.only('should return active user', async() => {
    let userStore = useUserStore();
    vi.spyOn(userAuth, 'postLoginForm').mockImplementation(() => {return loginData})
    vi.spyOn(userAuth, 'getUserData').mockImplementation(() => {return userData})

    await userStore.login()
    expect(userStore.user).toMatchObject(activeUser)
  });
});

describe('logout tests', () => {

  test('should return logout message', async() => {
  let userStore = useUserStore();
    // let postSignOut = jest.fn(true)
    //  clearUserData = jest.fn().mockImplementationOnce(() => { return true })

    //  jest.mock('clearUserData');
    //  userStore.logout().clearUserData.get.mockResolvedValue(true);

    // postSignOut.mockImplementation(true);
    // clearUserData.mockImplementation(() => true);
    // jest.mock(userStore, () => ({
    //   clearUserData: () => { return true }
    // }));

    // vi.spyOn(userStore, 'logout').mockImplementationOnce(() => {return {message: "User has logged out!"} })
    vi.spyOn(userAuth, 'postSignOut').mockImplementationOnce()
    let result = await userStore.logout()
    expect(result).toMatchObject({message: "User has logged out!"})
  });
});

