import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { itemModificationStore } from '../../stores/itemModificationStore'
import { registerWithEmail, postLoginForm } from '../../composables/userAuth'


const testUser = OrderItemClassInstance(
    "name",
    1,
    "test_type",
    "test_propSelectors",
    "test_props",
    "test_selectedOptions",
    1,
    10,
)

let useItemModificationStore = undefined;

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  useItemModificationStore = useItemModificationStore();
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
    useItemModificationStore.$reset()
  })

  it('pass firstName to the getTable the result should be the first name', () => {
    expect(userStore.getTable("firstName")).toBe(testUser.firstName)
  })


})

