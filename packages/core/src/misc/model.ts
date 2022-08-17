import { Ref, computed, getCurrentInstance } from 'vue'

export function useModel<TProps, PropName extends keyof TProps>(
  props: TProps,
  name: PropName
): Ref<TProps[PropName]>;
export function useModel(props: Record<string, any>, name: string): Ref<any> {

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "useModel must be called from the setup or lifecycle hook methods."
    );
  }

  return computed({
    get() {
      return props[name];
    },
    set(v) {
      instance.emit(`update:${name}`, v);
    },
  });
}

