<template>
  <div id="app">
    <div class="components">
      <!-- 按钮 -->
      <elButton></elButton>
      <!-- 图标 -->
      <elIcon></elIcon>
      <!-- input -->
      <elInput></elInput>
      <!-- 上传文件 -->
      <elUpload></elUpload>
      <!-- 日历组件 -->
      <eldatePickerVal></eldatePickerVal>
    </div>
  </div>
</template>

<script lang="ts">
import elButton from "./button/index.vue";
import elIcon from "./icon/index.vue";
import elInput from "./input/index.vue";
import elUpload from "./upload/index.vue";
import eldatePickerVal from "./datePicker/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    elButton,
    elIcon,
    elInput,
    elUpload,
    eldatePickerVal,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
}
.components {
  width: 868px;
  box-sizing: border-box;
  &-container {
    padding: 20px;
    border: 1px solid #ebebeb;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
