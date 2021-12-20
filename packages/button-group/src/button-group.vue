<template>
  <div class="group-button">
    <slot></slot>
  </div>
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "el-button-group",
  setup(props, context) {
    onMounted(() => {
      const childList = context.slots.default();
      for (let i = 0; i < childList.length; i++) {
        let item = childList[i];
        if (item.type.name !== "el-button") {
          console.error("只支持button组件");
        }
      }
    });
  },
};
</script>
<style lang="scss">
.group-button {
  display: flex;
  align-items: center;
  vertical-align: middle;
  .el-button {
    border-radius: 0;
    border: 1px solid #fff;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: none;
    }
  }
}
</style>
