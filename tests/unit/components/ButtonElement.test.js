import { mount } from '@vue/test-utils'
import ButtonElement from '@/components/ButtonElement.vue'

describe('ButtonElement component tests', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(ButtonElement, {
      props: {
        text: "Dummy Text",
      },
    });
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test("should mount component", async () => {
    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.find("div").isVisible()).toBeTruthy();
  })

  test('should display proper text', () => {
    expect(wrapper.text()).toMatch("Dummy Text");
  });
});


