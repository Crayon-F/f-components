<template>
  <div>
    <h3>Input</h3>
    <div class="components-container">
      <!-- 普通 -->
      <el-input
        v-model="val"
        type="text"
        placeholder="请输入内容"
        name="username"
        @change="handerInpChange"
      ></el-input>
    </div>
    <h3>Input密码文本切换</h3>
    <div class="components-container">
      <!-- 密码文本切换 -->
      <el-input
        v-model="val"
        type="text"
        placeholder="请输入内容"
        name="username"
        show-password
      ></el-input>
    </div>
    <h3>Input清空</h3>
    <div class="components-container">
      <!-- 清空 -->
      <el-input
        v-model="val"
        type="text"
        placeholder="请输入内容"
        name="username"
        clearable
      ></el-input>
    </div>
    <h3>Input前后icon</h3>
    <div class="components-container">
      <!-- 前icon -->
      <el-input
        v-model="val"
        type="text"
        placeholder="请输入内容"
        name="username"
        prefixIcon="search"
      ></el-input>
      <!-- 后icon -->
      <el-input
        v-model="val"
        type="text"
        placeholder="请输入内容"
        name="username"
        suffixIcon="copy"
      ></el-input>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let val = ref("input");
    const handerInpChange = (e) => {
      console.log("inputChange", e.target.value);
    };
    return {
      val,
      handerInpChange,
    };
  },
};
</script>
