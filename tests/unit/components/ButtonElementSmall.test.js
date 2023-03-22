import { mount } from '@vue/test-utils'
import ButtonElementSmall from '@/components/ButtonElementSmall.vue'

describe('ButtonElementSmall component tests', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(ButtonElementSmall, {
      props: {
        text: "Dummy Text",
      },
    });
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("should mount component", async () => {
    expect(wrapper.find("div").isVisible()).toBeTruthy();
    expect(wrapper.isVisible()).toBe(true)
  })

  test('should display proper text', () => {
    expect(wrapper.text()).toMatch("Dummy Text");
  });
});