<template>
  <div class="date-picker" v-click-outside="onClickOutside">
    <el-input
      v-model="formateDate"
      type="text"
      placeholder="请输入内容"
      name="username"
      @focus="handerFocus"
      @change="changeVal"
    />
    <div class="date-picker-container" v-if="isVisible">
      <div v-if="model === 'year'">
        <div class="date-picker-container-header">
          <span class="header-left" @click="setFullYear(-10)">
            <el-icon icon="chevrons-left"></el-icon>
          </span>
          <div class="header-date">
            <span class="year" @click="model = 'year'"> {{ startYear }}</span
            >年 - {{ startYear + 9 }}年
          </div>
          <span class="header-right" @click="setFullYear(10)">
            <el-icon icon="chevrons-right"></el-icon>
          </span>
        </div>
        <div class="month-row" v-for="i in 3" :key="`row${i}`">
          <div
            class="month-column"
            v-for="j in 4"
            :key="`column${j}`"
            @click="selectYear(yearList[(i - 1) * 4 + (j - 1)])"
          >
            {{ yearList[(i - 1) * 4 + (j - 1)] }}
          </div>
        </div>
      </div>
      <div v-if="model === 'month'">
        <div class="date-picker-container-header">
          <span class="header-left" @click="setFullYear(-1)">
            <el-icon icon="chevrons-left"></el-icon>
          </span>
          <div class="header-date">
            <span class="year" @click="model = 'year'">
              {{ tmpTimer.year }}</span
            >年
          </div>
          <span class="header-right" @click="setFullYear(1)">
            <el-icon icon="chevrons-right"></el-icon>
          </span>
        </div>
        <div class="month-row" v-for="i in 3" :key="`row${i}`">
          <div
            class="month-column"
            v-for="j in 4"
            :key="`column${j}`"
            @click="selectMonth(monthList[(i - 1) * 4 + (j - 1)])"
          >
            {{ monthList[(i - 1) * 4 + (j - 1)].label }}
          </div>
        </div>
      </div>
      <div v-if="model === 'day'">
        <div class="date-picker-container-header">
          <span class="header-left" @click="setFullYear(-1)">
            <el-icon icon="chevrons-left"></el-icon>
          </span>
          <span>
            <el-icon icon="chevron-left" @click="setFullMonth(-1)"></el-icon>
          </span>
          <div class="header-date">
            <span class="year" @click="model = 'year'">
              {{ tmpTimer.year }}</span
            >年
            <span class="month" @click="model = 'month'">{{
              tmpTimer.month
            }}</span
            >月
          </div>
          <span @click="setFullMonth(1)">
            <el-icon icon="chevron-right"></el-icon>
          </span>
          <span class="header-right" @click="setFullYear(1)">
            <el-icon icon="chevrons-right"></el-icon>
          </span>
        </div>
        <div class="day-header">
          <span
            class="day-header-item"
            v-for="(item, index) in weeks"
            :key="index"
            >{{ item }}</span
          >
        </div>
        <div class="day-row" v-for="i in 6" :key="`row${i}`">
          <div
            :class="[
              'day-column',
              {
                isCurrentTody: isCurrentTody(visibelDay[(i - 1) * 7 + (j - 1)]),
                isSelectTody: isSelectTody(visibelDay[(i - 1) * 7 + (j - 1)]),
              },
            ]"
            v-for="j in 7"
            :key="`column${j}`"
            @click="selectDay(visibelDay[(i - 1) * 7 + (j - 1)])"
          >
            {{ filtersDay(visibelDay[(i - 1) * 7 + (j - 1)]) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
import { monthList } from "./moth";
import { computed, ref, reactive, toRefs, watch } from "vue";

const getYearMonthDay = (str) => {
  let date = new Date(str);
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
  let day = date.getDate();
  return [year, month, day];
};

export default {
  name: "el-date-picker",
  props: {
    modelValue: {
      type: [String, Date],
      default: () => new Date(),
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  setup(props, { emit }) {
    let [year, month, day] = getYearMonthDay(props.modelValue || new Date());

    let isVisible = ref(false);
    let model = ref("day");
    let state = reactive({
      timer: {
        year,
        month,
        day,
      },
      tmpTimer: {
        year,
        month,
        day,
      },
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      monthList,
    });
    const formateDate = computed(() => {
      if (props.modelValue) {
        let [year, month, day] = getYearMonthDay(props.modelValue);
        // console.log(state.timer.year);
        return `${year}-${(month + "").padStart(2, 0)}-${(day + "").padStart(
          2,
          0
        )}`;
      }
      return "";
    });
    const visibelDay = computed(() => {
      // 获取当前月份的1号
      let firstDay = new Date(state.tmpTimer.year, state.tmpTimer.month - 1, 1);
      // 获取当前1号是周几
      let weekFirst = firstDay.getDay();
      // 是周几就往前推迟几天
      let start = firstDay - weekFirst * 60 * 60 * 24 * 1000;
      // 开始循环42天
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    });
    // 年份开始
    const startYear = computed(() => {
      // 当前用户选择的tmpTimer.year的年份 - 当前年份%10
      // 例：2022 - 2022%10 = 2020
      return state.tmpTimer.year - (state.tmpTimer.year % 10);
    });
    // 计算年份
    const yearList = computed(() => {
      let arr = [];
      let star = startYear.value;
      let end = star + 9;
      for (let i = star; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        let [year, month, day] = getYearMonthDay(newVal);
        state.tmpTimer = { year, month, day };
        state.timer = { year, month, day };
      }
    );
    const filtersDay = (s) => {
      let date = new Date(s);
      let day = date.getDate();
      return day;
    };
    const isCurrentTody = (date) => {
      let [year, month, day] = getYearMonthDay(date);
      let [y, m, d] = getYearMonthDay(new Date());
      return year === y && month === m && day === d;
    };
    const setFullYear = (cont) => {
      // 获取当前的年份
      let oldDate = new Date(state.tmpTimer.year, state.tmpTimer.month - 1);
      // 将当前的年份+1或-1
      let newDate = oldDate.setFullYear(oldDate.getFullYear() + cont);
      // 重新获取
      let [year] = getYearMonthDay(newDate);

      state.tmpTimer.year = year;
    };
    const setFullMonth = (cont) => {
      // 获取当前的月份
      let oldDate = new Date(state.tmpTimer.year, state.tmpTimer.month - 1);
      // 将当前的月份+1或-1
      let newDate = oldDate.setMonth(oldDate.getMonth() + cont);

      // 重新获取
      let [year, month] = getYearMonthDay(newDate);

      state.tmpTimer.year = year;
      state.tmpTimer.month = month;
    };
    const selectYear = (cont) => {
      state.tmpTimer.year = cont;
      model.value = "month";
    };
    const selectMonth = ({ value }) => {
      state.tmpTimer.month = value;
      model.value = "day";
    };
    const selectDay = (current) => {
      emit("update:modelValue", current);
    };
    const isSelectTody = (current) => {
      let [year, month, day] = getYearMonthDay(current);
      let { year: y, month: m, day: d } = state.timer;

      return year === y && month === m && day === d;
    };
    const handerFocus = () => {
      isVisible.value = true;
      model.value = "day";
    };
    const onClickOutside = () => {
      console.log("自定义属性");
      // isVisible.value = false;
    };
    const changeVal = (e) => {
      let val = e.target.value;
      let regExg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (regExg.test(val)) {
        let date = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
        emit("update:modelValue", date);
      } else {
        e.target.value = formateDate.value;
      }
    };
    return {
      isVisible,
      model,
      handerFocus,
      onClickOutside,
      ...toRefs(state),
      visibelDay,
      filtersDay,
      isCurrentTody,
      setFullYear,
      setFullMonth,
      selectDay,
      formateDate,
      isSelectTody,
      changeVal,
      selectMonth,
      yearList,
      startYear,
      selectYear,
    };
  },
};
</script>
<style lang="scss" scoped>
.date-picker {
  display: inline-block;
  position: relative;
  .date-picker-container {
    position: absolute;
    top: 42px;
    left: 0;
    width: 280px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 10px;
    &-header {
      display: flex;
      margin: 12px;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      color: #606266;
    }
    .header-left {
      margin-right: 10px;
    }
    .header-date {
      margin: 0 10px;
    }
    .header-right {
      margin-left: 10px;
    }
    .year,
    .month {
      margin: 4px;
    }
    .day-header-item {
      display: inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #606266;
      border-bottom: 1px solid #ebeef5;
    }
    .day-row {
      display: flex;
    }
    .day-column {
      width: 40px;
      height: 30px;
      line-height: 30px;
      padding: 3px 0;
      text-align: center;
      color: #c0c4cc;
      font-size: 12px;
      cursor: pointer;
      &.isCurrentTody {
        color: coral;
      }
      &.isSelectTody {
        background: coral;
        border-radius: 100%;
        color: #fff;
      }
    }
    .month-row {
      display: flex;
    }
    .month-column {
      padding: 20px 3px;
      width: 60px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      font-size: 12px;
      color: #606266;
      cursor: pointer;
    }
  }
}
</style>
