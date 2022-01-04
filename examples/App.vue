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
      <h3>上传组件</h3>
      <div class="components-container">
        <!-- 
      name: 上传的文件字段名 
      action：必选参数，上传的地址
      limit：最大允许上传个数
      multiple：是否支持多选文件
      accpet:接受上传的文件类型（thumbnail-mode 模式下此参数无效）
      file-list:上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
      drag: 支持拖拽上传
      on-exceed：文件超出个数限制时的钩子
      on-change：文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      on-success：文件上传成功时的钩子
      on-error：文件上传失败时的钩子
      on-progress：文件上传时的钩子
    -->
        <el-upload
          name="file"
          :action="action"
          :limit="3"
          accpet="image/png"
          :file-list="fileList"
          :multiple="true"
          :drag="true"
          :on-exceed="handerExceed"
          :on-change="handerChange"
          :on-success="handerSuccess"
          :on-error="handerError"
          :on-progress="handerProgress"
          :before-upload="handerBeforeUpload"
        >
          <el-button type="primary">上传组件</el-button>
          <template #tip>
            <span>只能上传jpg/png文件，且不超过500kb</span>
          </template>
        </el-upload>
      </div>
      <h3>日历组件</h3>
      <div>
        <el-date-picker v-model="datePickerVal"></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    let val = ref("input");
    let action = ref("https://upload.ximalaya.com/dtres/headerThumb/upload");
    let datePickerVal = ref("");
    const state = reactive({
      fileList: [
        {
          name: "小红",
          url: "xxx",
        },
        {
          name: "小名",
          url: "xxx",
        },
      ],
    });
    const handerInpChange = (e: any) => {
      console.log("inputChange", e.target.value);
    };
    // 文件超出个数限制时的钩子
    const handerExceed = () => {
      console.log("超出最大上传数量");
    };
    const handerChange = (file: any) => {
      console.log(file);
      console.log(
        "文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用"
      );
    };
    const handerSuccess = (res: any) => {
      console.log(res);
      console.log("文件上传成功时的钩子");
    };
    const handerError = (err: any) => {
      console.log(err);
      console.log("文件上传失败时的钩子");
    };
    const handerProgress = (e: any) => {
      console.log(e);
      console.log("文件上传时的钩子");
    };
    // 文件上传前校验
    const handerBeforeUpload = (rawFile: any) => {
      // 校验大小
      const isLt500k = rawFile.size / 1024 < 100000;
      const isPng = rawFile.type === "image/png";
      if (!isLt500k) {
        console.log("文件超过500k");
        return false;
      }
      if (!isPng) {
        console.log("上传头像图片只能是 PNG 格式!");
        return false;
      }
      return true;
    };
    const handerButton = () => {
      console.log(11111);

      console.log(val.value);
    };
    return {
      val,
      handerButton,
      action,
      datePickerVal,
      ...toRefs(state),
      handerExceed,
      handerChange,
      handerSuccess,
      handerError,
      handerProgress,
      handerBeforeUpload,
      handerInpChange,
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
