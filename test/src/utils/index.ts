export { nextTick } from 'vue'
import {
  createApp,
  Component,
  ComponentPublicInstance,
} from "vue"

export const createVue = <
  T extends Component,
  TProps extends Record<string, unknown>
>(
  component: T,
  props?: TProps
) => {
  const app = createApp(
    {
      template: `<div></div>`,
      ...component,
    },
    props
  );

  const el = document.createElement("div")

  document.body.appendChild(el);

  const mount = (): ComponentPublicInstance<TProps> => {
    return app.mount(el as any) as any;
  };

  const destroy = () => app.unmount();

  app.config.warnHandler = (err: any) => {
    throw err;
  };

  app.config.errorHandler = (err: any) => {
    throw err;
  };
  return {
    app,
    el,
    mount,
    destroy,
  };
}
