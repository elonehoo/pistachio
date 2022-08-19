import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import {injectFactory} from '@elonehoo/vue-hooks'
import {createVue} from '../utils'

describe("injectFactory", () => {
  it("should work", () => {
    const key = "hello";

    const fn = vi.fn();

    const comp = {
      template: `<div/>`,
      setup() {
        injectFactory(key, fn);
      },
    };

    createVue({
      components: {
        comp,
      },
      template: `<comp/>`,
    }).mount();

    // expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should not call injectFactory", () => {
    const key = "hello";

    const fn = vi.fn();

    const comp = {
      template: `<div/>`,
      setup() {
        injectFactory(key, fn);
      },
    };

    const { app, mount } = createVue({
      components: {
        comp,
      },
      template: `<comp/>`,

      setup() {
        injectFactory(key, fn);
      },
    });

    mount();

    // expect(fn).not.toHaveBeenCalled();
  });
});
