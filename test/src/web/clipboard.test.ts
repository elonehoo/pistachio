import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createVue } from '../utils'
import { UseClipboard, useClipboard } from '@elonehoo/pistachio'

describe("clipboard tets", () => {
  it("not supported on node vitest", () => {
    // TODO write mocks

    // @ts-ignore
    let clipboard: UseClipboard = undefined;

    createVue({
      setup() {
        clipboard = useClipboard();
      },
    }).mount();
    expect(clipboard.supported).toBe(false);
  });
});
