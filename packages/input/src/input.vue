<template>
  <div :class="inputClass">
    <input
      :value="modelValue"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :placeholder="placeholder"
      :name="name"
      autocomplete="off"
      @input="updateValue"
    />
    <!-- 隐藏显示密码 -->
    <el-icon
      class="el-icon"
      v-if="showPassword && modelValue"
      icon="key"
      @click="handlePasswordVisible"
    >
    </el-icon>
    <!-- 清空 -->
    <el-icon
      class="el-icon"
      v-if="modelValue && clearable"
      icon="cross"
      @click="handleClearable"
    >
    </el-icon>
    <el-icon
      class="el-icon"
      v-if="prefixIcon || suffixIcon"
      :icon="icon"
      @click="handlePasswordVisible"
    >
    </el-icon>
  </div>
</template>
<script>
//1.vue2中的value改为了modelValue
//2.$emit('input',e.target.value) 改为了emit("update:modelValue", targetValue);

import { computed, ref } from "vue";
export default {
  name: "el-input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    showPassword: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    prefixIcon: {
      type: String,
      default: "",
    },
    suffixIcon: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let passwordVisible = ref(false);
    let inputClass = computed(() => {
      let res = ["el-input"];
      if (props.showPassword || props.clearable || props.suffixIcon) {
        res.push("el-icon");
      }
      if (props.prefixIcon) {
        res.push("el-icon-prefixIcon");
      }
      return res;
    });
    const icon = computed(() => {
      return props.prefixIcon || props.suffixIcon;
    });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const updateValue = (e) => {
      const targetValue = e.target.value;
      emit("update:modelValue", targetValue);
    };
    const handleClearable = () => {
      emit("update:modelValue", "");
    };

    return {
      passwordVisible,
      inputClass,
      updateValue,
      handlePasswordVisible,
      handleClearable,
      icon,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 4px;
    height: 30px;
    width: 180px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    &:focus {
      outline: none;
      border: 1px solid #409eff;
    }
    &[disabled] {
      background: #eee;
      cursor: not-allowed;
    }
  }
  &.el-icon {
    input {
      padding-right: 20px;
    }
    .el-icon {
      position: absolute;
      top: 50%;
      right: 4px;
      transform: translate(0, -50%);
    }
  }
  &.el-icon-prefixIcon {
    input {
      padding-left: 20px;
    }
    .el-icon {
      position: absolute;
      top: 50%;
      left: 4px;
      transform: translate(0, -50%);
    }
  }
}
</style>
