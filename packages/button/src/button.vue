<template>
  <button :class="buttonClass" :disabled="disabled">
    <el-icon class="icon" :icon="icon" v-if="icon"></el-icon>
    <!-- 默认如果没有内容，不显示 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
import { defineComponent, setup, computed } from "vue";
import { buttonProps } from "./button";
export default {
  name: "el-button",
  props: buttonProps,
  setup(props, { emit }) {
    const buttonClass = computed(() => {
      let res = ["el-button"];
      let buttonType = props.type
        ? `el-button--${props.type}`
        : "el-button--default";
      let iconPosition = props.iconPosition
        ? `el-button--${props.iconPosition}`
        : "el-button--left";
      let buttonDisabled = "";
      if (props.disabled) {
        buttonDisabled = `el-button--${props.type}-disabled`;
      }
      res = [...res, buttonType, iconPosition, buttonDisabled];
      return res;
    });

    return {
      buttonClass,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./packages/styles/_var.scss";

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  @each $type,
    $color
      in (
        primary: $primary,
        success: $success,
        warning: $warning,
        info: $info,
        danger: $danger
      )
  {
    &--#{$type} {
      color: #fff;
      background: $color;
      border-color: $color;
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-hover,
        success: $success-hover,
        warning: $warning-hover,
        info: $info-hover,
        danger: $danger-hover
      )
  {
    &--#{$type}:hover {
      color: #fff;
      background: $color;
      border-color: $color;
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-disabled,
        success: $success-disabled,
        warning: $warning-disabled,
        info: $info-disabled,
        danger: $danger-disabled
      )
  {
    &--#{$type}-disabled {
      color: #fff;
      background: $color;
      border-color: $color;
    }
  }
  .icon + span {
    margin-left: 4px;
  }
  &--left {
    .icon {
      order: 1;
    }
    span {
      order: 2;
    }
  }
  &--right {
    .icon {
      order: 2;
    }
    span {
      order: 1;
      margin-right: 4px;
    }
  }
}
</style>
