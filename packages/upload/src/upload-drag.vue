<template>
  <div
    class="upload-drag"
    @drop.prevent="handerDrag"
    @dragover.prevent
    @dragleave.prevent
  >
    <el-icon icon="upload" class="upload-drag-upload"></el-icon>
    <span>文件拖到此处进行上传</span>
  </div>
</template>
<script>
export default {
  name: "el-upload-drg",
  emits: ["file"],
  setup(props, { emit }) {
    const handerDrag = (e) => {
      emit("file", e.dataTransfer.files);
    };
    return {
      handerDrag,
    };
  },
};
</script>
<style lang="scss" scoped>
.upload-drag {
  width: 360px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-upload {
    font-size: 30px;
  }
}
</style>
