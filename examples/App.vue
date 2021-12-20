<template>
  <div id="app">
    <div class="components">
      <h3>Button按钮</h3>
      <div class="components-container">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
      <h3>带有图标的按钮</h3>
      <div class="components-container">
        <el-button type="primary" icon="coin-dollar" @click="handerButton"
          >可点击</el-button
        >
        <el-button type="success" icon="coin-dollar" icon-position="right"
          >主要按钮</el-button
        >
      </div>
      <h3>禁用按钮</h3>
      <div class="components-container">
        <el-button type="primary" @click="handerButton" :disabled="true"
          >禁用按钮</el-button
        >
        <el-button type="info" :disabled="true">信息按钮</el-button>
        <el-button type="danger" :disabled="true">危险按钮</el-button>
      </div>
      <h3>按钮组</h3>
      <div class="components-container">
        <el-button-group>
          <el-button type="success" icon="coin-dollar" icon-position="right"
            >主要按钮</el-button
          >
          <el-button type="success" icon="folder-open" icon-position="right"
            >主要按钮</el-button
          >
        </el-button-group>
      </div>
      <h3>Icon</h3>
      <div class="components-container">
        <el-icon icon="home3"></el-icon>
        <el-icon icon="copy"></el-icon>
        <el-icon icon="folder-open"></el-icon>
      </div>
      <h3>Input</h3>
      <div class="components-container">
        <!-- 普通 -->
        <el-input
          v-model="val"
          type="text"
          placeholder="请输入内容"
          name="username"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    let val = ref("input");
    const handerButton = () => {
      console.log(11111);

      console.log(val.value);
    };
    return {
      val,
      handerButton,
    };
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
