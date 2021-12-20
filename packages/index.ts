import { App } from "vue";
import elButton from "./button";
import elIcon from './icon'

const components = [
  elButton,
  elIcon
];
const install = (app:App):void=>{
  components.map(component=>app.component(component.name,component));
}

export {
  elButton
}
export default{
  install
}