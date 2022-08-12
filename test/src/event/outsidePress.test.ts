import {createVue} from '../utils'
import { useOutsidePress } from '@elonehoo/vue-hooks'
import { describe, expect, it, vi,beforeAll,beforeEach,afterAll } from 'vitest'

describe("onOutsidePress", () => {
  const addEventListenerMock = vi.fn();
  let addEventListener: any;
  beforeAll(() => {
    addEventListener = document.addEventListener;
    document.addEventListener = addEventListenerMock;
  });

  beforeEach(() => {
    addEventListenerMock.mockClear();
  });

  afterAll(() => {
    document.addEventListener = addEventListener;
  });

  it.skip("should work mousedown", () => {
    const element = document.createElement("div");
    let handler: (a: any) => void = {} as any;

    addEventListenerMock.mockImplementation((_, h) => {
      handler = h;
    });

    let callback = vi.fn();
    const { mount } = createVue({
      template: "<div></div>",
      setup() {
        useOutsidePress(element, callback);
      }
    });
    mount();

    expect(callback).not.toHaveBeenCalled();

    expect(addEventListenerMock).toHaveBeenLastCalledWith(
      "mousedown",
      expect.any(Function),
      { passive: true }
    );

    // inside
    handler({
      target: element
    });
    expect(callback).not.toHaveBeenCalled();

    // outside
    handler({
      target: document.createElement("div")
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
