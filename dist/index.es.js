import { defineComponent, ref, computed, onMounted, onBeforeUnmount, watch, createElementBlock, openBlock, createElementVNode, Fragment, renderList, normalizeClass, renderSlot } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
const LeftImg = "data:image/png;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNUNCMEZFIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cGF0aCBkPSJNMTUgMTJsLTYtNnYxMmw2LTZ6IiBmaWxsPSIjNUNCMEZFIi8+Cjwvc3ZnPgo=";
const RightImg = "data:image/png;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNUNCMEZFIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cGF0aCBkPSJNOSAxMmw2LTZ2MTJsLTYtNnoiIGZpbGw9IiM1Q0IwRkUiLz4KPC9zdmc+Cg==";
const dragProps = {
  // x轴的开始和结束时间
  timeRange: {
    type: Array,
    default: () => [dayjs().subtract(1, "day"), dayjs()]
  },
  // 开始图标
  startIcon: {
    type: String,
    default: LeftImg
  },
  // 结束图标
  endIcon: {
    type: String,
    default: RightImg
  },
  // 拖拽点的大小
  symbolSize: {
    type: Number,
    default: 20
  },
  // 目前是有值的柱子
  valueData: {
    type: Array,
    default: () => []
  },
  // 当前时间范围
  activeTime: {
    type: Array,
    default: () => [0, 12]
  },
  // X轴的间隔
  interval: {
    type: Number,
    default: 4
  },
  // 是否自动计算间隔, 如果为true，则interval会被忽略
  autoInterval: {
    type: Boolean,
    default: true
  },
  // 是否支持点击修改位置
  needClick: {
    type: Boolean,
    default: true
  },
  // 最大选择范围（小时）
  maxRange: {
    type: Number,
    default: 7 * 24
    // 3天 = 72小时
  },
  // 最小选择范围（小时）
  minRange: {
    type: Number,
    default: 3
    // 3小时
  },
  // 覆盖颜色
  coverColor: {
    type: String,
    default: "rgba(160,210,255,0.14)"
    // 默认颜色
  },
  // 线段颜色
  lineColor: {
    type: String,
    default: "#5CB0FE"
    // 默认线条颜色
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "drag-chart",
  props: {
    ...dragProps
  },
  emits: ["update:activeTime", "outOfRange"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit = __emit;
    const chartRef = ref();
    let myChart;
    const getDiffDays = (startDate = props2.timeRange[0], endDate = props2.timeRange[props2.timeRange.length - 1]) => {
      return dayjs(endDate).diff(startDate, "day") + 1;
    };
    const MaxTick = computed(() => {
      const diffDays = getDiffDays();
      return diffDays * 24;
    });
    const xAxisData = computed(() => {
      const result = [];
      const startDate = dayjs(props2.timeRange[0]);
      const diffDays = getDiffDays();
      for (let i = 0; i <= diffDays; i++) {
        const currentDate = startDate.add(i, "day");
        for (let j = 0; j < 24; j++) {
          result.push(currentDate.hour(j).format("YYYY-MM-DD HH:00:00"));
        }
      }
      return result;
    });
    const data = computed({
      get() {
        return getInitialData();
      },
      set(val) {
        emit("update:activeTime", val);
      }
    });
    const getInitialData = () => {
      if (!props2.activeTime || props2.activeTime.length !== 2) {
        return [
          [0, 0],
          [xAxisData.value.length - 1, 0]
        ];
      }
      if (dayjs(props2.activeTime[0]).isBefore(dayjs(props2.timeRange[0])) || dayjs(props2.activeTime[1]).isAfter(
        dayjs(props2.timeRange[props2.timeRange.length - 1])
      )) {
        emit("outOfRange", {
          type: "activeTime",
          value: props2.activeTime,
          timeRange: props2.timeRange,
          message: "activeTime is out of timeRange"
        });
        return [
          [0, 0],
          [24, 0]
        ];
      }
      const x1 = xAxisData.value.findIndex(
        (x) => dayjs(x).isSame(
          dayjs(props2.activeTime[0]),
          "hour"
        )
      );
      const x2 = xAxisData.value.findIndex(
        (x) => dayjs(x).isSame(
          dayjs(props2.activeTime[1]),
          "hour"
        )
      );
      return [
        [x1, 0],
        [x2, 0]
      ];
    };
    const handlerResize = () => {
      if (myChart) {
        myChart.resize({
          width: "auto",
          height: "auto"
        });
      }
    };
    useResizeObserver(chartRef, handlerResize);
    const intervalReal = computed(() => {
      return Math.floor((MaxTick.value - 1) / 12) + 1;
    });
    const barData = computed(() => {
      if (!props2.valueData || props2.valueData.length === 0) {
        return [];
      }
      const filteredData = props2.valueData.reduce((acc, cur) => {
        const lastItem = acc[acc.length - 1];
        if (lastItem && dayjs(lastItem).hour() === dayjs(cur).hour()) {
          return acc;
        }
        return [
          ...acc,
          dayjs(cur).set("minute", 0).set("second", 0).format("YYYY-MM-DD HH:mm:ss")
        ];
      }, []);
      const start = dayjs(props2.timeRange[0]);
      const end = dayjs(props2.timeRange[props2.timeRange.length - 1]);
      const filteredDatas = filteredData.filter((item) => {
        const date = dayjs(item);
        return date.isAfter(start) && date.isBefore(end);
      });
      return filteredDatas;
    });
    const generateInitialPoints = (x1, x2) => {
      const points = [];
      for (let x = x1; x <= x2; x += 1) {
        points.push([x, 2]);
      }
      return points;
    };
    const validateRange = (leftX, rightX) => {
      const currentRange = Math.abs(rightX - leftX);
      if (currentRange < props2.minRange) {
        const center = (leftX + rightX) / 2;
        const halfMinRange = props2.minRange / 2;
        leftX = Math.max(0, center - halfMinRange);
        rightX = Math.min(MaxTick.value, center + halfMinRange);
        if (rightX - leftX < props2.minRange) {
          if (leftX === 0) {
            rightX = Math.min(MaxTick.value, props2.minRange);
          } else if (rightX === MaxTick.value) {
            leftX = Math.max(0, MaxTick.value - props2.minRange);
          }
        } else {
          emit("outOfRange", {
            type: "min",
            currentRange,
            minRange: props2.minRange
          });
        }
      }
      if (currentRange > props2.maxRange) {
        const center = (leftX + rightX) / 2;
        const halfMaxRange = props2.maxRange / 2;
        leftX = Math.max(0, center - halfMaxRange);
        rightX = Math.min(MaxTick.value, center + halfMaxRange);
        if (leftX === 0 && rightX - leftX > props2.maxRange) {
          rightX = props2.maxRange;
        } else if (rightX === MaxTick.value && rightX - leftX > props2.maxRange) {
          leftX = MaxTick.value - props2.maxRange;
        } else {
          console.log(`当前范围: ${currentRange}, 最大范围: ${props2.maxRange}`);
          emit("outOfRange", {
            type: "max",
            currentRange,
            minRange: props2.minRange
          });
        }
      }
      return {
        leftX: Math.round(leftX),
        rightX: Math.round(rightX)
      };
    };
    const updatePosition = () => {
      myChart.setOption({
        graphic: data.value.map((item) => ({
          position: myChart.convertToPixel("grid", item)
        }))
      });
    };
    const showTooltip = (dataIndex) => {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex
      });
    };
    const hideTooltip = () => {
      myChart.dispatchAction({
        type: "hideTip"
      });
    };
    const updateChartData = () => {
      const x1 = Math.min(data.value[0][0], data.value[1][0]);
      const x2 = Math.max(data.value[0][0], data.value[1][0]);
      const initialPoints = generateInitialPoints(x1, x2);
      const point0X = data.value[0][0];
      const point1X = data.value[1][0];
      const isPoint0First = point0X < point1X;
      myChart.setOption({
        series: [
          {
            id: "a",
            data: data.value,
            z: 80,
            silent: true,
            animation: false,
            symbolSize: 0
          },
          {
            id: "lineRange",
            data: initialPoints,
            type: "line",
            areaStyle: {
              color: props2.coverColor
            },
            symbolSize: 0,
            markLine: getBorderStyle(initialPoints),
            z: 90,
            silent: true,
            animation: false
          }
        ]
      });
      myChart.setOption({
        graphic: data.value.map((item, idx) => ({
          position: myChart.convertToPixel("grid", item),
          type: "image",
          style: {
            image: (isPoint0First ? idx === 0 : idx === 1) ? props2.startIcon : props2.endIcon,
            width: props2.symbolSize,
            height: props2.symbolSize,
            x: -props2.symbolSize / 2,
            y: -props2.symbolSize / 2
          },
          invisible: false,
          z: 100
        }))
      });
    };
    const updateActiveTime = () => {
      emit(
        "update:activeTime",
        data.value.map((item) => xAxisData.value[item[0]])
      );
    };
    const onDragEnd = (dataIndex, pos) => {
      const newPos = myChart.convertFromPixel("grid", pos);
      newPos[0] = Math.round(Math.min(Math.max(newPos[0], 0), MaxTick.value));
      newPos[1] = data.value[dataIndex][1];
      data.value[dataIndex] = newPos;
      const leftX = Math.min(data.value[0][0], data.value[1][0]);
      const rightX = Math.max(data.value[0][0], data.value[1][0]);
      const { leftX: validLeftX, rightX: validRightX } = validateRange(
        leftX,
        rightX
      );
      const leftPointIndex = data.value[0][0] <= data.value[1][0] ? 0 : 1;
      const rightPointIndex = leftPointIndex === 0 ? 1 : 0;
      data.value[leftPointIndex] = [validLeftX, 0];
      data.value[rightPointIndex] = [validRightX, 0];
      updateChartData();
      updateActiveTime();
    };
    const onPointDragging = (dataIndex, pos) => {
      const newPos = myChart.convertFromPixel("grid", pos);
      newPos[0] = Math.min(Math.max(newPos[0], 0), MaxTick.value);
      newPos[1] = data.value[dataIndex][1];
      data.value[dataIndex] = newPos;
      updateChartData();
    };
    const handleWheel = (e) => {
      if (!e.ctrlKey && !e.shiftKey) return;
      e.preventDefault();
      const delta = e.deltaY;
      const currentRange = Math.abs(data.value[1][0] - data.value[0][0]);
      if (e.shiftKey) {
        const moveStep = 2;
        const moveAmount = delta > 0 ? moveStep : -moveStep;
        let newStart2 = data.value[0][0] + moveAmount;
        let newEnd2 = data.value[1][0] + moveAmount;
        if (newStart2 < 0) {
          newStart2 = 0;
          newEnd2 = currentRange;
        }
        if (newEnd2 > MaxTick.value) {
          newEnd2 = MaxTick.value;
          newStart2 = MaxTick.value - currentRange;
        }
        data.value[0] = [newStart2, 0];
        data.value[1] = [newEnd2, 0];
        updateChartData();
        updateActiveTime();
        return;
      }
      const scaleFactor = 0.1;
      if (currentRange <= props2.minRange && delta > 0) return;
      if (currentRange >= props2.maxRange && delta < 0) return;
      let newRange = delta > 0 ? Math.min(
        props2.maxRange,
        Math.min(MaxTick.value, currentRange * (1 + scaleFactor))
      ) : Math.max(props2.minRange, currentRange * (1 - scaleFactor));
      const center = (data.value[0][0] + data.value[1][0]) / 2;
      let newStart = Math.round(center - newRange / 2);
      let newEnd = Math.round(center + newRange / 2);
      if (newStart < 0) {
        newStart = 0;
        newEnd = Math.min(MaxTick.value, Math.round(newRange));
      }
      if (newEnd > MaxTick.value) {
        newEnd = MaxTick.value;
        newStart = Math.max(0, Math.round(MaxTick.value - newRange));
      }
      const { leftX: validLeftX, rightX: validRightX } = validateRange(
        newStart,
        newEnd
      );
      data.value[0] = [validLeftX, 0];
      data.value[1] = [validRightX, 0];
      updateChartData();
      updateActiveTime();
    };
    const getChartOption = () => {
      const x1 = Math.min(data.value[0][0], data.value[1][0]);
      const x2 = Math.max(data.value[0][0], data.value[1][0]);
      const initialPoints = generateInitialPoints(x1, x2);
      const datalist = barData.value.map(
        (item) => {
          const index2 = xAxisData.value.findIndex(
            (x) => dayjs(x).isSame(dayjs(item), "hour")
          );
          return [index2, 1];
        }
      );
      const seriesData = [
        {
          id: "lineRange",
          type: "line",
          data: initialPoints,
          areaStyle: {
            color: props2.coverColor
          },
          lineStyle: {
            color: props2.lineColor,
            width: 1
          },
          symbol: "none",
          markLine: getBorderStyle(initialPoints),
          z: 100,
          silent: true,
          animation: false
        },
        {
          id: "barData",
          type: "bar",
          data: datalist,
          barWidth: 20,
          itemStyle: {
            color: "#C2E2FF",
            borderRadius: [3, 3, 0, 0]
          },
          z: 0,
          silent: true,
          animation: false
        }
      ];
      return {
        tooltip: {
          triggerOn: "none",
          formatter: function(params) {
            const result = xAxisData.value[Math.round(params.data[0])];
            return dayjs(result).format("MM/DD HH:mm");
          }
        },
        grid: {
          top: "50%",
          left: "50",
          right: "50"
        },
        xAxis: {
          min: 0,
          max: MaxTick.value,
          interval: props2.autoInterval ? intervalReal.value : props2.interval,
          type: "value",
          // boundaryGap: "0%",
          boundaryGap: ["0%", "100%"],
          axisLine: { onZero: false },
          axisTick: { inside: true },
          splitLine: { show: false },
          axisLabel: {
            formatter: function(value) {
              let result = xAxisData.value[value];
              const hour = dayjs(result).hour();
              if (hour == 0) {
                return `{datebox|}{date|${dayjs(result).format("MM/DD")}}`;
              }
              return `{time|${hour}:00}`;
            },
            rich: {
              datebox: {
                width: 40
              },
              date: {
                color: "#333333",
                backgroundColor: "rgba(51,51,51,0.08)",
                padding: 4,
                borderRadius: 10
              },
              time: {
                color: "#666"
              }
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        },
        series: [
          {
            id: "a",
            type: "line",
            smooth: true,
            data: data.value,
            areaStyle: {},
            symbolSize: 0
          },
          ...seriesData
        ]
      };
    };
    const getBorderStyle = (initialPoints) => {
      return {
        symbol: "none",
        animation: false,
        z: 0,
        lineStyle: {
          color: props2.lineColor,
          width: 1,
          type: "solid"
        },
        data: [
          // 左侧竖线
          [
            { coord: [initialPoints[0][0], 0] },
            { coord: [initialPoints[0][0], initialPoints[0][1]] }
          ],
          // 右侧竖线
          [
            { coord: [initialPoints[initialPoints.length - 1][0], 0] },
            {
              coord: [
                initialPoints[initialPoints.length - 1][0],
                initialPoints[initialPoints.length - 1][1]
              ]
            }
          ]
          // 底部横线
          // [
          //   { coord: [initialPoints[0][0], 0] },
          //   { coord: [initialPoints[initialPoints.length - 1][0], 0] },
          // ],
        ]
      };
    };
    const onChartClick = (params) => {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInData = myChart.convertFromPixel(
        { seriesIndex: 0 },
        pointInPixel
      );
      if (!pointInData || pointInData.length < 2) return;
      const clickX = Math.round(
        Math.min(Math.max(pointInData[0], 0), MaxTick.value)
      );
      const leftPointX = Math.min(data.value[0][0], data.value[1][0]);
      const rightPointX = Math.max(data.value[0][0], data.value[1][0]);
      const distanceToLeft = Math.abs(clickX - leftPointX);
      const distanceToRight = Math.abs(clickX - rightPointX);
      const isCloserToLeft = distanceToLeft <= distanceToRight;
      const leftPointIndex = data.value[0][0] <= data.value[1][0] ? 0 : 1;
      const rightPointIndex = leftPointIndex === 0 ? 1 : 0;
      let newLeftX = leftPointX;
      let newRightX = rightPointX;
      if (isCloserToLeft) {
        const maxLeftX = rightPointX - props2.minRange;
        const minLeftX = Math.max(0, rightPointX - props2.maxRange);
        newLeftX = Math.max(minLeftX, Math.min(clickX, maxLeftX));
      } else {
        const minRightX = leftPointX + props2.minRange;
        const maxRightX = Math.min(MaxTick.value, leftPointX + props2.maxRange);
        newRightX = Math.min(maxRightX, Math.max(clickX, minRightX));
      }
      const { leftX: validLeftX, rightX: validRightX } = validateRange(
        newLeftX,
        newRightX
      );
      data.value[leftPointIndex] = [validLeftX, 0];
      data.value[rightPointIndex] = [validRightX, 0];
      updateChartData();
      updateActiveTime();
    };
    const setGraphic = () => {
      myChart.setOption({
        graphic: data.value.map((item, dataIndex) => ({
          type: "image",
          position: myChart.convertToPixel("grid", item),
          style: {
            image: dataIndex === 0 ? props2.startIcon : props2.endIcon,
            width: props2.symbolSize,
            height: props2.symbolSize,
            x: -props2.symbolSize / 2,
            y: -props2.symbolSize / 2
          },
          invisible: false,
          draggable: "horizontal",
          ondrag: function(dx, dy) {
            onPointDragging(dataIndex, [this.x, this.y]);
          },
          ondragend: function() {
            onDragEnd(dataIndex, [this.x, this.y]);
          },
          onmousemove: function() {
            showTooltip(dataIndex);
          },
          onmouseout: function() {
            hideTooltip();
          },
          z: 200
        }))
      });
    };
    onMounted(() => {
      myChart = echarts.init(chartRef.value, null, {
        renderer: "svg"
      });
      myChart.setOption(getChartOption());
      setTimeout(() => {
        setGraphic();
      }, 0);
      window.addEventListener("resize", updatePosition);
      if (props2.needClick) {
        myChart.getZr().on("click", onChartClick);
      }
      chartRef.value.addEventListener("wheel", handleWheel, { passive: false });
    });
    onBeforeUnmount(() => {
      var _a;
      window.removeEventListener("resize", updatePosition);
      myChart.getZr().off("click", onChartClick);
      (_a = chartRef.value) == null ? void 0 : _a.removeEventListener("wheel", handleWheel);
    });
    watch(
      () => props2.timeRange,
      (newValue) => {
        if (!myChart) return;
        myChart.setOption(getChartOption());
        updatePosition();
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "chartRef",
        ref: chartRef,
        style: { "min-width": "100px", "min-height": "10px", "height": "100%", "width": "100%" },
        class: "chart-wrap"
      }, null, 512);
    };
  }
});
const components$2 = [_sfc_main$1];
const install$2 = (app) => {
  components$2.forEach((component) => {
    app.component(component.name || component.__name || "DragChart", component);
  });
};
const DragChartInstaller = { install: install$2 };
const props = {
  imgList: {
    type: Array,
    default: () => [],
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: () => false
  },
  // 当 autoPlay 为 true 时, 生效
  playTime: {
    type: [String, Number],
    default: () => 2
  },
  keysControl: {
    type: Boolean,
    default: () => true
  },
  // 是否支持无线滚动
  infinite: {
    type: Boolean,
    default: () => false
  }
};
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "swiper-simple",
  data() {
    return {
      offset: 0,
      swiperContainer: null,
      scrollIndex: 0,
      timer: null,
      imgs: []
    };
  },
  props: {
    ...props
  },
  mounted() {
    this.$nextTick(() => {
      this.imgs = [...this.imgList];
      this.swiperContainer = document.querySelector(".swiper-container");
      if (this.keysControl) {
        window.addEventListener("keydown", this.keydown);
      }
      if (this.autoPlay) {
        this.play();
      } else {
        this.stop();
      }
    });
  },
  destroyed() {
    window.removeEventListener("keydown", this.keydown);
  },
  methods: {
    start() {
    },
    pauze() {
    },
    play() {
      this.timer = setInterval(() => {
        this.nextPage(true);
      }, this.playTime * 1e3);
    },
    stop() {
      if (this.timer) {
        this.clearInterval(this.timer);
      }
    },
    keydown(e) {
      if (!this.swiperContainer) {
        console.warn("please keep sure that dom is loaded");
        return;
      }
      if (e.keyCode === 39) {
        this.nextPage();
      }
      if (e.keyCode === 37) {
        this.prevPage();
      }
    },
    nextPage() {
      this.scrollIndex++;
      if (this.scrollIndex > this.imgs.length - 1) {
        if (this.infinite) {
          this.imgs = this.imgs.concat(this.imgs);
          this.$nextTick(() => {
            this.nextFn();
          });
        } else {
          this.scrollIndex = this.imgs.length - 1;
        }
        return;
      }
      this.nextFn();
    },
    nextFn() {
      this.offset = -400 * this.scrollIndex;
      this.swiperContainer.style.transform = `translateX(${this.offset}px)`;
      this.scrollIntoViews();
    },
    prevPage() {
      this.scrollIndex--;
      if (this.scrollIndex < 0) {
        this.scrollIndex = 0;
        return;
      }
      this.offset = -400 * this.scrollIndex;
      this.swiperContainer.style.transform = `translateX(${this.offset}px)`;
      this.scrollIntoViews();
    },
    jumpByIndex(index2) {
      this.scrollIndex = index2 + 1;
      this.prevPage();
      this.scrollIntoViews();
    },
    scrollIntoViews() {
      const pages = document.querySelector(".pagenation");
      const currentPageEl = [...pages.childNodes][this.scrollIndex];
      if (!currentPageEl) {
        return;
      }
      currentPageEl.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
const _hoisted_1 = { class: "swiper-wrapper" };
const _hoisted_2 = {
  class: "swiper-container",
  ref: "con"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "pagenation" };
const _hoisted_5 = ["src", "onClick"];
const _hoisted_6 = { class: "btn" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.imgs, (img, index2) => {
        return openBlock(), createElementBlock("div", {
          class: "swiper-item",
          key: index2
        }, [
          createElementVNode("img", {
            src: img,
            alt: ""
          }, null, 8, _hoisted_3)
        ]);
      }), 128))
    ], 512),
    createElementVNode("div", _hoisted_4, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.imgs, (img, index2) => {
        return openBlock(), createElementBlock("div", {
          class: "page-item",
          key: index2
        }, [
          createElementVNode("img", {
            src: img,
            class: normalizeClass({ active: $data.scrollIndex == index2 }),
            onClick: ($event) => $options.jumpByIndex(index2),
            alt: ""
          }, null, 10, _hoisted_5)
        ]);
      }), 128))
    ]),
    createElementVNode("div", _hoisted_6, [
      renderSlot(_ctx.$slots, "leftBtn", {}, () => [
        createElementVNode("button", {
          class: "btn-left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.prevPage && $options.prevPage(...args))
        }, "←")
      ], true),
      renderSlot(_ctx.$slots, "rightBtn", {}, () => [
        createElementVNode("button", {
          class: "btn-right",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.nextPage && $options.nextPage(...args))
        }, "→")
      ], true)
    ])
  ]);
}
const SwiperSimple = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bcf19a6c"]]);
const components$1 = [SwiperSimple];
const install$1 = (app) => {
  components$1.forEach((component) => {
    app.component(component.name || component.__name || "SwiperSimple", component);
  });
};
const SwiperSimpleInstaller = { install: install$1 };
const components = [DragChartInstaller, SwiperSimpleInstaller];
const install = (app) => {
  components.forEach((component) => {
    app.use(component);
  });
};
const index = {
  install,
  version: "0.1.0"
};
export {
  _sfc_main$1 as DragChart,
  SwiperSimple,
  index as default,
  install
};
//# sourceMappingURL=index.es.js.map
