<template>
  <div>
    <h3>scroll组件</h3>
    <div class="components-container">
      <ul
        class="infinite-list"
        v-infinite-scroll="handerLoad"
        infinite-scroll-disabled="disabled"
        infinite-scroll-delay="delay"
        infinite-scroll-distance="distance"
        infinite-scroll-immediate="immediate"
        style="overflow: auto"
      >
        <li v-for="i in count" :key="i" class="infinite-list-item">
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "infinite-scroll",
  setup() {
    let count = ref(4);
    let disabled = ref(false); //是否禁用
    let delay = ref(200); //节流时延，单位为ms
    let distance = ref(30); //触发加载的距离阈值，单位为px
    let immediate = ref(false); //是否立即执行加载方法，以防初始状态下内容无法撑满容器。
    let handerLoad = () => {
      count.value += 2;
    };
    return {
      count,
      handerLoad,
      disabled,
      delay,
      distance,
      immediate,
    };
  },
};
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.components-container {
  width: 100%;
  .infinite-list {
    width: 100%;
    height: 300px;
  }
  .infinite-list-item {
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
