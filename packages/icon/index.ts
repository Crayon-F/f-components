import { App } from 'vue'

import Icon from './src/icon.vue';

import '../util.js'

Icon.install = (app:App):void=>{
  app.component(Icon.name,Icon)
}
export default Icon;