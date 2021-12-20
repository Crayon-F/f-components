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
        <el-button type="primary"
                   icon='coin-dollar'
                   @clickFn="handerButton">主要按钮</el-button>
        <el-button type="success"
                   icon='coin-dollar'
                   icon-position='right'>主要按钮</el-button>
      </div>
      <h3>Icon</h3>
      <div class="components-container">
        <el-icon icon='home3'></el-icon>
        <el-icon icon='copy'></el-icon>
        <el-icon icon='folder-open'></el-icon>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "App",
  setup() {
    const handerButton = () => {
      console.log("按钮点击事件")
    }
    return {
      handerButton,
    }
  },
})
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
  }
}
</style>
