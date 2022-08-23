import { describe, expect, it,beforeAll,afterAll,vi } from 'vitest'
import {ref} from 'vue'
import {useRefDebounced} from '@elonehoo/vue-hooks'

describe("useRefDebounced", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  it("should work", () => {
    const r = useRefDebounced("a", 1);

    expect(r.value).toBe("a");

    r.value = "b";

    // should not been updated yet
    expect(r.value).toBe("a");

    expect(r.value).toBe("a");
  });

  it("should allow use only a delay", () => {
    const r = useRefDebounced(1);
    expect(r.value).toBe(undefined);

    r.value = 1;

    // should not been updated yet
    expect(r.value).toBe(undefined);

    expect(r.value).toBe(undefined);
  });

  it("should update the passed ref with delay", () => {
    const v = ref("a");
    const r = useRefDebounced(v, 1);
    expect(r.value).toBe("a");

    r.value = "b";

    // should not been updated yet
    expect(r.value).toBe("a");
    expect(v.value).toBe("a");

    expect(r.value).toBe("a");
    expect(v.value).toBe("a");
  });
});
