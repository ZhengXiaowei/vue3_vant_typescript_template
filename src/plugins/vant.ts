import { App } from "vue";
import { Button } from "vant";

const install = (app: App<Element>) => {
  return app.use(Button);
};

export default install;
