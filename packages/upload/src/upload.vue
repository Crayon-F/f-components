<template>
  <div class="el-upload">
    <template v-if="drag">
      <el-upload-drag @file="fileLoad"></el-upload-drag>
    </template>
    <template v-else>
      <div class="el-upload-btn" @click="uploadBtn">
        <slot></slot>
      </div>
      <input
        type="file"
        :name="name"
        :accpet="accpet"
        :multiple="multiple"
        ref="inp"
        class="inp"
        @change="handerInput"
      />
    </template>
    <div class="tip">
      <slot name="tip"></slot>
    </div>
    <ul>
      <li v-for="item in fileList" :key="item.uid">
        <span>{{ item.name }}</span>
        <el-progress
          :percentage="item.percentage"
          :format="item.status"
        ></el-progress>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, watch, toRefs } from "vue";
import ajax from "./ajax";
import uploadDrag from "./upload-drag";
export default defineComponent({
  name: "el-upload",
  components: {
    "el-upload-drag": uploadDrag,
  },
  props: {
    drag: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "file",
    },
    accpet: String,
    action: String,
    limit: Number,
    fileList: Array,
    multiple: Boolean,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
    httpRequest: {
      type: Function,
      default: ajax,
    },
  },
  setup(props) {
    const inp = ref(null);
    const tmpIndex = ref(1);
    const state = reactive({
      fileList: [],
      reqs: {},
    });

    watch(
      () => props.fileList,
      (newVal) => {
        state.fileList = newVal.map((i) => {
          return {
            status: "success", //上传的状态
            uid: Math.random(),
            percentage: 100,
            ...i,
          };
        });
      },
      { immediate: true }
    );
    const uploadBtn = () => {
      inp.value.click();
    };

    const handerInput = ($event) => {
      const files = $event.target.files;
      fileLoad(files);
    };

    const fileLoad = (files) => {
      console.log("----", files);

      // 判断文件是否超出最大限制
      if (props.limit && props.fileList.length + files.length > props.limit) {
        return props.onExceed && props.onExceed();
      }
      [...files].forEach((files) => {
        // 开始上传
        uploadStart(files);
      });
    };

    const uploadStart = (files) => {
      // 首先检查用户上传前的规则
      let isBeforeAvatarUpload = props.beforeUpload(files);
      // 如果beforeUpload || 已经校验通过了
      if (!props.beforeUpload || isBeforeAvatarUpload) {
        props.onChange && props.onChange(files);
        files.uid = Math.random() + tmpIndex.value++;
        let file = {
          status: "ready", //上传的状态
          name: files.name,
          size: files.size,
          percentage: 0, //上传的进度
          uid: files.uid,
          raw: files,
          type: files.type,
        };
        state.fileList.push(file);

        uploadPost(files);
      }
    };

    const getCurrentFile = (file) => {
      return state.fileList.find((i) => i.uid === file.uid);
    };

    const handerProgress = (ev, rawFile) => {
      let current = getCurrentFile(rawFile);
      current.status = "uploading";
      current.percentage = ev.percent;
      props.onProgress(ev, rawFile);
    };

    const handerSuccess = (res, rawFile) => {
      let current = getCurrentFile(rawFile);
      current.status = "success";
      props.onSuccess(res, rawFile);
      props.onChange(current);
    };

    const handerError = (err, rawFile) => {
      let current = getCurrentFile(rawFile);
      current.status = "fail";
      props.onChange(current);
      props.onError(err, rawFile);
    };

    const uploadPost = (files) => {
      const options = {
        filename: props.name,
        action: props.action,
        file: files,
        onProgress: (e) => {
          handerProgress(e, files);
        },
        onSuccess: (res) => {
          handerSuccess(res, files);
        },
        onError: (err) => {
          handerError(err, files);
        },
      };

      let req = props.httpRequest(options);
      let uid = files.uid;
      state.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    };

    return {
      handerInput,
      uploadBtn,
      inp,
      ...toRefs(state),
      fileLoad,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-upload {
  &-btn {
    display: inline-block;
  }
  .inp {
    display: none;
  }
}
.item-content {
  display: flex;
}
</style>
