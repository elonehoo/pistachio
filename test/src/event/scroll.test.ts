import type { IWindow } from 'happy-dom'
import {createVue,nextTick} from '../utils'
import { useScroll, ScrollResult,promisedTimeout } from '@elonehoo/vue-hooks'
import { describe, expect, it, vi,beforeEach,afterAll,afterEach,test } from 'vitest'

declare global {
  interface Window extends IWindow {}
}

describe('scroll',()=>{
  it("should add the correct event", async () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe("scroll");
        handler = listener;
      }),
      removeEventListener: vi.fn(),
      scrollTop: 0,
      scrollLeft: 0,
      tagName: "div",
    } as any;
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined = undefined;
    let use: ScrollResult | undefined = undefined;

    createVue({
      template: "<div></div>",
      setup() {
        use = useScroll(element);
      },
    }).mount();

    expect(element.addEventListener).toHaveBeenCalled();

    expect(use).toMatchObject({
      scrollTop: { value: 0 },
      scrollLeft: { value: 0 },
    });

    (element as any).scrollTop = 50;
    (element as any).scrollLeft = 50;

    handler!({});
    await nextTick();

    expect(use).toMatchObject({
      scrollTop: { value: 50 },
      scrollLeft: { value: 50 },
    });
  });

  it("should removeEventListener if `remove` is called", () => {
    const element: Element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollTop: 0,
      scrollLeft: 0,
      tagName: "div",
    } as any;
    let use: ScrollResult | undefined = undefined;

    createVue({
      template: "<div></div>",
      setup() {
        use = useScroll(element);
      },
    }).mount();
    expect(element.removeEventListener).not.toHaveBeenCalled();

    use!.remove();

    expect(element.removeEventListener).toHaveBeenCalled();
  });

  it("should debounce if wait is passed", async () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe("scroll");
        handler = listener;
      }),
      removeEventListener: vi.fn(),
      scrollTop: 0,
      scrollLeft: 0,
      tagName: "div",
    } as any;
    let use: ScrollResult | undefined = undefined;
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined = undefined;
    const wait = 50;

    createVue({
      template: "<div></div>",
      setup() {
        use = useScroll(element, wait);
      },
    }).mount();
    expect(element.addEventListener).toHaveBeenCalled();

    for (let i = 0; i < 10; i++) {
      (element as any).scrollTop = 10 + i;
      (element as any).scrollLeft = 10 + i;

      handler!({});
    }

    await nextTick();

    // still waiting to set the values
    expect(use).toMatchObject({
      scrollTop: { value: 0 },
      scrollLeft: { value: 0 },
    });

    await promisedTimeout(wait);
    expect(use).toMatchObject({
      scrollTop: { value: 19 },
      scrollLeft: { value: 19 },
    });
  });

  it("should pass options to the event listener", () => {
    const element: Element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollTop: 0,
      scrollLeft: 0,
      tagName: "div",
    } as any;
    const options = {
      passive: true,
    };

    createVue({
      template: "<div></div>",
      setup() {
        return useScroll(element, options);
      },
    }).mount();
    expect(element.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      options
    );
  });

  it("should pass options to the event listener and be debounced", async () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe("scroll");
        handler = listener;
      }),
      removeEventListener: vi.fn(),
      scrollTop: 0,
      scrollLeft: 0,
      tagName: "div",
    } as any;
    let use: ScrollResult | undefined = undefined;
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined = undefined;
    const wait = 50;
    const options = {
      passive: true,
    };

    createVue({
      template: "<div></div>",
      setup() {
        use = useScroll(element, options, wait);
      },
    }).mount();
    expect(element.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      options
    );

    for (let i = 0; i < 10; i++) {
      element.scrollTop = 10 + i;
      element.scrollLeft = 10 + i;

      handler!({});
    }

    await nextTick();

    // still waiting to set the values
    expect(use).toMatchObject({
      scrollTop: { value: 0 },
      scrollLeft: { value: 0 },
    });

    await promisedTimeout(wait);
    expect(use).toMatchObject({
      scrollTop: { value: 19 },
      scrollLeft: { value: 19 },
    });
  });

  describe("methods", () => {
    const methods = ["scrollBy", "scrollTo", "scrollIntoView"];
    const element = document.createElement("div");
    methods.forEach((m) => {
      // @ts-ignore
      element[m] = vi.fn();
    });

    const prevMethods = {};

    beforeEach(() => {
      methods.forEach((m) => {
        //@ts-ignore
        element[m].mockClear();
      });
    });

    afterAll(() => {});

    afterEach(() => {
      methods.forEach((m) => {
        //@ts-ignore
        window[m] = prevMethods[m];
      });
    });

    test.each(methods)("call %s", (method) => {
      const args = {};
      const use = useScroll(element);
      // @ts-ignore
      use[method](args);
      //@ts-ignore
      expect(element[method]).toHaveBeenCalledTimes(1);
    });

    test.each(methods)("not fail if %s doesnt exist", (method) => {
      const use = useScroll({});
      // @ts-ignore
      use[method]();
    });
  });
})
