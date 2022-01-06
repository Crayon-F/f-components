<template>
  <div>
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
  </div>
</template>
<script>
export default {
  setup() {
    const handerButton = () => {
      console.log("button-click");
    };
    return {
      handerButton,
    };
  },
};
</script>
