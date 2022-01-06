<template>
  <div>
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
  </div>
</template>
<script>
import { ref, toRefs, reactive } from "vue";
export default {
  setup() {
    let action = ref("https://upload.ximalaya.com/dtres/headerThumb/upload");
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
    // 文件超出个数限制时的钩子
    const handerExceed = () => {
      console.log("超出最大上传数量");
    };
    const handerChange = (file) => {
      console.log(file);
      console.log(
        "文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用"
      );
    };
    const handerSuccess = (res) => {
      console.log(res);
      console.log("文件上传成功时的钩子");
    };
    const handerError = (err) => {
      console.log(err);
      console.log("文件上传失败时的钩子");
    };
    const handerProgress = (e) => {
      console.log(e);
      console.log("文件上传时的钩子");
    };
    // 文件上传前校验
    const handerBeforeUpload = (rawFile) => {
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
    return {
      action,
      ...toRefs(state),
      handerExceed,
      handerChange,
      handerSuccess,
      handerError,
      handerProgress,
      handerBeforeUpload,
    };
  },
};
</script>
