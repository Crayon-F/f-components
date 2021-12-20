<template>
  <div class="el-icon">
    <span :class="iconClass"></span>
  </div>
</template>
<script>
import { defineComponent, setup, computed } from "vue";
export default {
  name: "el-icon",
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const handerIcon = (evt) => {
      emit("click", evt);
    };
    const iconClass = computed(() => {
      console.log(props.icon);

      return `icon-${props.icon}`;
    });
    return {
      iconClass,
      handerIcon,
    };
  },
};
</script>
<style>
@import "../../icomoon/style.css";
.el-icon {
  display: inline-block;
  vertical-align: text-bottom;
}
</style>
