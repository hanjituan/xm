import { defineComponent, ref, computed, onMounted, onBeforeUnmount, watch, createElementBlock, openBlock, nextTick, readonly, createElementVNode, createCommentVNode, Fragment, renderList, normalizeClass, renderSlot, toDisplayString, normalizeStyle } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
const LeftImg = "data:image/png;base64,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";
const RightImg = "data:image/png;base64,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";
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "drag-chart",
  props: {
    ...dragProps
  },
  emits: ["update:activeTime", "outOfRange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const chartRef = ref();
    let myChart;
    const getDiffDays = (startDate = props.timeRange[0], endDate = props.timeRange[props.timeRange.length - 1]) => {
      return dayjs(endDate).diff(startDate, "day") + 1;
    };
    const MaxTick = computed(() => {
      const diffDays = getDiffDays();
      return diffDays * 24;
    });
    const xAxisData = computed(() => {
      const result = [];
      const startDate = dayjs(props.timeRange[0]);
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
      if (!props.activeTime || props.activeTime.length !== 2) {
        return [
          [0, 0],
          [xAxisData.value.length - 1, 0]
        ];
      }
      if (dayjs(props.activeTime[0]).isBefore(dayjs(props.timeRange[0])) || dayjs(props.activeTime[1]).isAfter(
        dayjs(props.timeRange[props.timeRange.length - 1])
      )) {
        emit("outOfRange", {
          type: "activeTime",
          value: props.activeTime,
          timeRange: props.timeRange,
          message: "activeTime is out of timeRange"
        });
        return [
          [0, 0],
          [24, 0]
        ];
      }
      const x1 = xAxisData.value.findIndex(
        (x) => dayjs(x).isSame(
          dayjs(props.activeTime[0]),
          "hour"
        )
      );
      const x2 = xAxisData.value.findIndex(
        (x) => dayjs(x).isSame(
          dayjs(props.activeTime[1]),
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
      if (!props.valueData || props.valueData.length === 0) {
        return [];
      }
      const filteredData = props.valueData.reduce((acc, cur) => {
        const lastItem = acc[acc.length - 1];
        if (lastItem && dayjs(lastItem).hour() === dayjs(cur).hour()) {
          return acc;
        }
        return [
          ...acc,
          dayjs(cur).set("minute", 0).set("second", 0).format("YYYY-MM-DD HH:mm:ss")
        ];
      }, []);
      const start = dayjs(props.timeRange[0]);
      const end = dayjs(props.timeRange[props.timeRange.length - 1]);
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
      if (currentRange < props.minRange) {
        const center = (leftX + rightX) / 2;
        const halfMinRange = props.minRange / 2;
        leftX = Math.max(0, center - halfMinRange);
        rightX = Math.min(MaxTick.value, center + halfMinRange);
        if (rightX - leftX < props.minRange) {
          if (leftX === 0) {
            rightX = Math.min(MaxTick.value, props.minRange);
          } else if (rightX === MaxTick.value) {
            leftX = Math.max(0, MaxTick.value - props.minRange);
          }
        } else {
          emit("outOfRange", {
            type: "min",
            currentRange,
            minRange: props.minRange
          });
        }
      }
      if (currentRange > props.maxRange) {
        const center = (leftX + rightX) / 2;
        const halfMaxRange = props.maxRange / 2;
        leftX = Math.max(0, center - halfMaxRange);
        rightX = Math.min(MaxTick.value, center + halfMaxRange);
        if (leftX === 0 && rightX - leftX > props.maxRange) {
          rightX = props.maxRange;
        } else if (rightX === MaxTick.value && rightX - leftX > props.maxRange) {
          leftX = MaxTick.value - props.maxRange;
        } else {
          console.log(`当前范围: ${currentRange}, 最大范围: ${props.maxRange}`);
          emit("outOfRange", {
            type: "max",
            currentRange,
            minRange: props.minRange
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
              color: props.coverColor
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
            image: (isPoint0First ? idx === 0 : idx === 1) ? props.startIcon : props.endIcon,
            width: props.symbolSize,
            height: props.symbolSize,
            x: -props.symbolSize / 2,
            y: -props.symbolSize / 2
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
      if (currentRange <= props.minRange && delta > 0) return;
      if (currentRange >= props.maxRange && delta < 0) return;
      let newRange = delta > 0 ? Math.min(
        props.maxRange,
        Math.min(MaxTick.value, currentRange * (1 + scaleFactor))
      ) : Math.max(props.minRange, currentRange * (1 - scaleFactor));
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
            color: props.coverColor
          },
          lineStyle: {
            color: props.lineColor,
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
          interval: props.autoInterval ? intervalReal.value : props.interval,
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
          color: props.lineColor,
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
        const maxLeftX = rightPointX - props.minRange;
        const minLeftX = Math.max(0, rightPointX - props.maxRange);
        newLeftX = Math.max(minLeftX, Math.min(clickX, maxLeftX));
      } else {
        const minRightX = leftPointX + props.minRange;
        const maxRightX = Math.min(MaxTick.value, leftPointX + props.maxRange);
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
            image: dataIndex === 0 ? props.startIcon : props.endIcon,
            width: props.symbolSize,
            height: props.symbolSize,
            x: -props.symbolSize / 2,
            y: -props.symbolSize / 2
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
      if (props.needClick) {
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
      () => props.timeRange,
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
const components$2 = [_sfc_main$2];
const install$2 = (app) => {
  components$2.forEach((component) => {
    app.component(component.name || component.__name || "DragChart", component);
  });
};
const DragChartInstaller = { install: install$2 };
const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = ["src", "onClick"];
const _hoisted_3$1 = {
  key: 1,
  class: "btn"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "swiper-simple",
  props: {
    imgList: {},
    autoPlay: { type: Boolean },
    playTime: {},
    keysControl: { type: Boolean },
    infinite: { type: Boolean },
    hoverPause: { type: Boolean },
    showPagination: { type: Boolean },
    showNavigation: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const propsData = __props;
    const offset = ref(0);
    const swiperContainerRef = ref(null);
    const paginationRef = ref(null);
    const scrollIndex = ref(0);
    const realIndex = ref(0);
    const timer = ref(null);
    const imgs = ref([]);
    const displayImgs = ref([]);
    const isHovered = ref(false);
    const isPaused = ref(false);
    const initDisplayImgs = () => {
      if (propsData.infinite && imgs.value.length > 0) {
        displayImgs.value = [
          imgs.value[imgs.value.length - 1],
          // 最后一张图片
          ...imgs.value,
          // 原始图片
          imgs.value[0]
          // 第一张图片
        ];
        scrollIndex.value = 1;
        realIndex.value = 0;
      } else {
        displayImgs.value = [...imgs.value];
        scrollIndex.value = 0;
        realIndex.value = 0;
      }
    };
    const play = () => {
      timer.value = setInterval(() => {
        nextPage(true);
      }, Number(propsData.playTime) * 1e3);
    };
    const stop = () => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    };
    const onMouseEnter = () => {
      if (propsData.hoverPause && propsData.autoPlay) {
        isHovered.value = true;
        isPaused.value = true;
        stop();
      }
    };
    const onMouseLeave = () => {
      if (propsData.hoverPause && propsData.autoPlay && isPaused.value) {
        isHovered.value = false;
        isPaused.value = false;
        play();
      }
    };
    const keydown = (e) => {
      if (!swiperContainerRef.value) {
        console.warn("please keep sure that dom is loaded");
        return;
      }
      if (e.keyCode === 39) {
        nextPage();
      }
      if (e.keyCode === 37) {
        prevPage();
      }
    };
    const nextPage = (isAutoPlay = false) => {
      if (!propsData.infinite) {
        if (realIndex.value >= imgs.value.length - 1) {
          return;
        }
        realIndex.value++;
        scrollIndex.value = realIndex.value;
      } else {
        scrollIndex.value++;
        realIndex.value++;
        if (realIndex.value >= imgs.value.length) {
          realIndex.value = 0;
        }
        if (scrollIndex.value >= displayImgs.value.length - 1) {
          offset.value = -400 * scrollIndex.value;
          if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
          }
          setTimeout(() => {
            scrollIndex.value = 1;
            if (swiperContainerRef.value) {
              swiperContainerRef.value.style.transition = "none";
              swiperContainerRef.value.style.transform = `translateX(-400px)`;
              swiperContainerRef.value.offsetHeight;
              swiperContainerRef.value.style.transition = "all ease 0.3s";
            }
          }, 300);
          if (!isAutoPlay) {
            scrollIntoViews();
          }
          return;
        }
      }
      offset.value = -400 * scrollIndex.value;
      if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
      }
      if (!isAutoPlay) {
        scrollIntoViews();
      }
    };
    const prevPage = () => {
      if (!propsData.infinite) {
        if (realIndex.value <= 0) {
          return;
        }
        realIndex.value--;
        scrollIndex.value = realIndex.value;
      } else {
        scrollIndex.value--;
        realIndex.value--;
        if (realIndex.value < 0) {
          realIndex.value = imgs.value.length - 1;
        }
        if (scrollIndex.value <= 0) {
          offset.value = -400 * scrollIndex.value;
          if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
          }
          setTimeout(() => {
            scrollIndex.value = displayImgs.value.length - 2;
            if (swiperContainerRef.value) {
              swiperContainerRef.value.style.transition = "none";
              swiperContainerRef.value.style.transform = `translateX(${-400 * scrollIndex.value}px)`;
              swiperContainerRef.value.offsetHeight;
              swiperContainerRef.value.style.transition = "all ease 0.3s";
            }
          }, 300);
          scrollIntoViews();
          return;
        }
      }
      offset.value = -400 * scrollIndex.value;
      if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
      }
      scrollIntoViews();
    };
    const jumpByIndex = (index2) => {
      realIndex.value = index2;
      if (propsData.infinite) {
        scrollIndex.value = index2 + 1;
      } else {
        scrollIndex.value = index2;
      }
      offset.value = -400 * scrollIndex.value;
      if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
      }
      scrollIntoViews();
    };
    const scrollIntoViews = () => {
      if (!propsData.showPagination || !paginationRef.value) return;
      const currentPageEl = paginationRef.value.children[realIndex.value];
      if (!currentPageEl) {
        return;
      }
      const container = paginationRef.value;
      const elementLeft = currentPageEl.offsetLeft;
      const elementWidth = currentPageEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const elementRight = elementLeft + elementWidth;
      const containerRight = containerScrollLeft + containerWidth;
      let newScrollLeft = containerScrollLeft;
      if (elementRight > containerRight) {
        newScrollLeft = elementLeft - containerWidth + elementWidth;
      } else if (elementLeft < containerScrollLeft) {
        newScrollLeft = elementLeft;
      }
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    };
    onMounted(() => {
      nextTick(() => {
        imgs.value = [...propsData.imgList];
        initDisplayImgs();
        if (propsData.infinite && imgs.value.length > 0) {
          offset.value = -400 * scrollIndex.value;
          if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transition = "none";
            swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
            swiperContainerRef.value.offsetHeight;
            swiperContainerRef.value.style.transition = "all ease 0.3s";
          }
        }
        if (propsData.keysControl) {
          window.addEventListener("keydown", keydown);
        }
        if (propsData.autoPlay) {
          play();
        } else {
          stop();
        }
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keydown);
      stop();
    });
    watch(
      () => propsData.imgList,
      (newValue) => {
        imgs.value = [...newValue];
        initDisplayImgs();
        if (propsData.infinite && imgs.value.length > 0) {
          offset.value = -400 * scrollIndex.value;
          if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
          }
        } else {
          offset.value = 0;
          if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transform = `translateX(0px)`;
          }
        }
      },
      { deep: true }
    );
    watch(
      () => propsData.autoPlay,
      (newValue) => {
        if (newValue) {
          if (!isHovered.value) {
            play();
          }
        } else {
          stop();
        }
      }
    );
    __expose({
      nextPage,
      prevPage,
      jumpByIndex,
      play,
      stop,
      // 只读的状态
      realIndex: readonly(realIndex),
      scrollIndex: readonly(scrollIndex),
      isPlaying: computed(() => timer.value !== null)
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "swiper-wrapper",
        onMouseenter: onMouseEnter,
        onMouseleave: onMouseLeave
      }, [
        createElementVNode("div", {
          class: "swiper-container",
          ref_key: "swiperContainerRef",
          ref: swiperContainerRef
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(displayImgs.value, (img, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "swiper-item",
              key: `${img}-${index2}`
            }, [
              createElementVNode("img", {
                src: img,
                alt: ""
              }, null, 8, _hoisted_1$1)
            ]);
          }), 128))
        ], 512),
        propsData.showPagination ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "pagenation",
          ref_key: "paginationRef",
          ref: paginationRef
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(imgs.value, (img, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "page-item",
              key: index2
            }, [
              createElementVNode("img", {
                src: img,
                class: normalizeClass({ active: realIndex.value == index2 }),
                onClick: ($event) => jumpByIndex(index2),
                alt: ""
              }, null, 10, _hoisted_2$1)
            ]);
          }), 128))
        ], 512)) : createCommentVNode("", true),
        propsData.showNavigation ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          renderSlot(_ctx.$slots, "leftBtn", {}, () => [
            createElementVNode("button", {
              class: "btn-left",
              onClick: _cache[0] || (_cache[0] = () => prevPage())
            }, "←")
          ], true),
          renderSlot(_ctx.$slots, "rightBtn", {}, () => [
            createElementVNode("button", {
              class: "btn-right",
              onClick: _cache[1] || (_cache[1] = () => nextPage())
            }, "→")
          ], true)
        ])) : createCommentVNode("", true)
      ], 32);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const SwiperSimple = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a6295b6c"]]);
const components$1 = [SwiperSimple];
const install$1 = (app) => {
  components$1.forEach((component) => {
    app.component(component.__name || "SwiperSimple", component);
  });
};
const SwiperSimpleInstaller = {
  install: install$1,
  SwiperSimple
};
const _hoisted_1 = { class: "tabs-wraper flex flex-wrap p-1 rounded" };
const _hoisted_2 = ["data-ref", "onClick"];
const _hoisted_3 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Tabs"
  },
  __name: "tabs",
  props: {
    tabs: { default: () => [
      {
        value: "line",
        label: "折线",
        url: "https://imagecdn.ymm56.com/ymmfile/static/resource/aecd539e-515f-41e8-b126-7ac38102cafd.webp"
      },
      {
        value: "table",
        label: "表格视图",
        url: "https://imagecdn.ymm56.com/ymmfile/static/resource/13428291-7a45-4430-8fa9-70f8d0dea937.webp"
      },
      {
        value: "sl",
        label: "罗罗诺亚·索隆"
      },
      {
        value: "zfz",
        label: "King·尊"
      },
      {
        value: "lf",
        label: "蒙奇·D·路飞"
      },
      {
        value: "one",
        label: "one"
      },
      {
        value: "two",
        label: "two"
      },
      {
        value: "three",
        label: "three"
      },
      {
        value: "gogogo",
        label: "gogogo"
      }
    ] },
    modelValue: { default: "line" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const activeTab = ref("");
    const activeTabStyle = computed(() => {
      const { width = 0, height = 0, top = 0, left = 0 } = getActiveTabStyle() || {};
      return {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: width + "px",
        height: height + "px",
        overflow: "hidden",
        background: "#fff",
        transition: "all ease 0.2s",
        transform: `translate(${left}px, ${top}px)`,
        zIndex: 1
      };
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          activeTab.value = val;
        }
      },
      { immediate: true }
    );
    const selectTab = (item) => {
      activeTab.value = item.value;
      emit("update:modelValue", item.value);
      emit("change", item.value);
    };
    const getActiveTabStyle = () => {
      if (!activeTab.value && activeTab.value !== "0") return;
      const currentItem = document.querySelector(`[data-ref="tab_${activeTab.value}"]`);
      if (!currentItem) return;
      return currentItem.getBoundingClientRect();
    };
    onMounted(() => {
      if (props.modelValue) {
        activeTab.value = props.modelValue;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (item, index2) => {
          return openBlock(), createElementBlock("li", {
            "data-ref": `tab_${item.value}`,
            key: `${item.value}${index2}`,
            class: normalizeClass([{ active: item.value == activeTab.value }, "item-tab px-4 py-2 cursor-pointer flex items-center justify-center rounded"]),
            onClick: ($event) => selectTab(item)
          }, [
            renderSlot(_ctx.$slots, "default", {
              item,
              index: index2
            }, () => [
              item.url ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "w-4 mr-1",
                src: item.url,
                alt: ""
              }, null, 8, _hoisted_3)) : createCommentVNode("", true),
              createElementVNode("span", null, toDisplayString(item.label), 1)
            ], true)
          ], 10, _hoisted_2);
        }), 128)),
        createElementVNode("li", {
          style: normalizeStyle(activeTabStyle.value)
        }, null, 4)
      ]);
    };
  }
});
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ab5e2ed"]]);
Tabs.install = (app) => {
  app.component(Tabs.name || "Tabs", Tabs);
};
const components = [DragChartInstaller, SwiperSimpleInstaller, Tabs];
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
  _sfc_main$2 as DragChart,
  SwiperSimple,
  Tabs,
  index as default,
  install
};
//# sourceMappingURL=index.es.js.map
