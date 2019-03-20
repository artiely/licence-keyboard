import licenceKeyboard from "./index.vue";

const components = [licenceKeyboard];
const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;
  components.map(component => Vue.component(component.name, component));
};
export default {
  install,
  licenceKeyboard
};
