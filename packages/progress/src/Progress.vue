<template>
  <div class="progress">
    <div class="progress-content" :style="progressStyle"></div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
export default {
  name: "el-progress",
  props: {
    percentage: {
      type: Number,
      default: 50,
    },
    color: {
      type: String,
      default: "#409eff",
    },
    format: {
      type: String,
      default: "format",
    },
  },
  setup(props) {
    const state = reactive({
      success: {
        width: 100,
        backgroundColor: "#67c23a",
      },
      fail: {
        width: 0,
        backgroundColor: "#f56c6c",
      },
    });

    const progressStyle = computed(() => {
      if (state[props.format]) return state[props.format];
      return {
        width: props.percentage + "%",
        backgroundColor: props.color,
      };
    });

    return {
      ...toRefs(state),
      progressStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.progress {
  width: 300px;
  height: 6px;
  border-radius: 6px;
  background: #ebeef5;
  &-content {
    height: 100%;
    border-radius: 6px;
    transition: all 0.4s;
  }
}
</style>
