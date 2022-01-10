<template>
  <div class="el-icon">
    <span :class="iconClass"
          @click="trunk"></span>
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
  setup (props, { emit }) {
    const handerIcon = (evt) => {
      emit("click", evt);
    };
    const iconClass = computed(() => {
      return `icon-${props.icon}`;
    });
    const trunk = () => {
      window.fn('弄了一下午呢')
    }
    return {
      iconClass,
      handerIcon,
      trunk
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
