const buttonType = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  "",
] as const;

export const buttonProps = {
  type: {
    type: String,
    values: buttonType,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  iconPosition: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};
