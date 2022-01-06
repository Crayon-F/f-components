<template>
  <div>
    <h3>日历组件</h3>
    <div>
      <el-date-picker v-model="datePickerVal"></el-date-picker>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let datePickerVal = ref("");
    return {
      datePickerVal,
    };
  },
};
</script>
