<template>
    <div class="demo-container">
        <h3>月历任务表盘</h3>
        <p>展示整个月的任务安排，每天一个时钟表盘，测试多表盘性能。</p>

        <!-- 月份选择器 -->
        <div class="month-selector">
            <button @click="previousMonth" class="nav-btn">← 上个月</button>
            <div class="current-month">
                <h4>{{ formatMonth(currentDate) }}</h4>
                <input type="month" v-model="currentMonthStr" @change="onMonthChange" class="month-input" />
            </div>
            <button @click="nextMonth" class="nav-btn">下个月 →</button>
        </div>

        <!-- 月历网格 -->
        <div class="calendar-grid">
            <!-- 星期标题 -->
            <div class="weekday-header">
                <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
            </div>

            <!-- 日期表盘网格 -->
            <div class="calendar-days">
                <div
                    v-for="day in calendarDays"
                    :key="`${day.date}-${day.isCurrentMonth}`"
                    class="day-container"
                    :class="{
                        'other-month': !day.isCurrentMonth,
                        today: day.isToday,
                        'has-tasks': day.tasks.length > 0,
                    }"
                >
                    <div class="day-header">
                        <span class="day-number">{{ day.dayNumber }}</span>
                        <span class="task-count" v-if="day.tasks.length > 0">{{ day.tasks.length }}个任务</span>
                    </div>

                    <!-- 每天的时钟表盘 -->
                    <div class="clock-container">
                        <ClockFace
                            :size="120"
                            :center-text="day.tasks.length > 0 ? day.tasks.length.toString() : ''"
                            :center-text-style="miniClockTextStyle"
                            :sectors="day.tasks"
                            :border-color="day.isToday ? '#e74c3c' : '#95a5a6'"
                            :border-width="day.isToday ? 2 : 1"
                            :background-color="day.isCurrentMonth ? '#ffffff' : '#f8f9fa'"
                            :major-tick-color="'#bdc3c7'"
                            :major-tick-width="1"
                            :major-tick-len="8"
                            :minor-tick-color="'#ecf0f1'"
                            :minor-tick-width="0.5"
                            :minor-tick-len="4"
                            @sector-hover="(data) => handleSectorHover(data, day.date)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- 悬停任务详情 -->
        <div v-if="hoveredTask" class="task-detail">
            <h4>{{ hoveredTask.sector.title }}</h4>
            <p><strong>日期:</strong> {{ hoveredTask.date }}</p>
            <p>
                <strong>时间:</strong> {{ formatTime(hoveredTask.sector.from) }} -
                {{ formatTime(hoveredTask.sector.to) }}
            </p>
            <p><strong>类型:</strong> {{ hoveredTask.sector.type }}</p>
            <p><strong>描述:</strong> {{ hoveredTask.sector.description }}</p>
            <p v-if="hoveredTask.sector.location"><strong>地点:</strong> {{ hoveredTask.sector.location }}</p>
        </div>

        <!-- 月度统计 -->
        <div class="month-stats">
            <div class="stat-card">
                <h4>本月统计</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">总任务数</span>
                        <span class="stat-value">{{ monthStats.totalTasks }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">工作日数</span>
                        <span class="stat-value">{{ monthStats.workDays }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">平均每日任务</span>
                        <span class="stat-value">{{ monthStats.avgTasksPerDay }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">总工作时间</span>
                        <span class="stat-value">{{ monthStats.totalWorkHours }}h</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 性能监控 -->
        <div class="performance-info">
            <p><strong>性能测试:</strong> 当前渲染 {{ calendarDays.length }} 个时钟表盘</p>
            <p><strong>渲染时间:</strong> {{ renderTime }}ms</p>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { ClockFace } from "vue3-xm";

const currentDate = ref(new Date());
const hoveredTask = ref(null);
const renderTime = ref(0);

// 星期标题
const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// 格式化当前月份为字符串
const currentMonthStr = computed({
    get: () => {
        const year = currentDate.value.getFullYear();
        const month = (currentDate.value.getMonth() + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
    },
    set: (value) => {
        const [year, month] = value.split("-");
        currentDate.value = new Date(parseInt(year), parseInt(month) - 1, 1);
    },
});

// 生成随机任务数据
const generateRandomTasks = (date) => {
    const tasks = [];
    const taskTypes = [
        {
            type: "工作",
            color: "rgba(231, 76, 60, 0.6)",
            titles: ["项目开发", "团队会议", "代码评审", "客户拜访", "文档编写"],
        },
        { type: "学习", color: "rgba(52, 73, 94, 0.6)", titles: ["英语学习", "培训课程", "技术研究", "读书时间"] },
        { type: "健身", color: "rgba(52, 152, 219, 0.6)", titles: ["晨练", "瑜伽练习", "健身房", "跑步"] },
        { type: "休闲", color: "rgba(142, 68, 173, 0.6)", titles: ["朋友聚餐", "看电影", "阅读", "购物"] },
    ];

    // 根据日期生成一定的随机性，但保持一致性
    const seed = date.getDate() + date.getMonth() * 31;
    const random = ((seed * 9301 + 49297) % 233280) / 233280;

    // 周末和工作日不同的任务密度
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const taskCount = isWeekend ? Math.floor(random * 3) + 1 : Math.floor(random * 4) + 2;

    for (let i = 0; i < taskCount; i++) {
        const typeIndex = Math.floor((random * (i + 1)) % taskTypes.length);
        const type = taskTypes[typeIndex];
        const titleIndex = Math.floor((random * (i + 2)) % type.titles.length);

        const startHour = Math.floor((random * (i + 3)) % 12) + 8; // 8-19点
        const duration = Math.floor((random * (i + 4)) % 3) + 1; // 1-3小时

        tasks.push({
            from: { h: startHour, m: 0, s: 0 },
            to: { h: startHour + duration, m: 0, s: 0 },
            color: type.color,
            title: type.titles[titleIndex],
            type: type.type,
            description: `${type.titles[titleIndex]}相关活动`,
            location: type.type === "工作" ? "办公室" : type.type === "健身" ? "健身房" : "其他",
        });
    }

    return tasks.sort((a, b) => a.from.h - b.from.h);
};

// 生成月历数据
const calendarDays = computed(() => {
    const startTime = performance.now();

    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 获取日历网格的开始日期（包含上月的一些日期）
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // 获取日历网格的结束日期（包含下月的一些日期）
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6周 = 42天

    const days = [];
    const today = new Date();

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const currentD = new Date(d);
        const isCurrentMonth = currentD.getMonth() === month;
        const isToday = currentD.toDateString() === today.toDateString();

        days.push({
            date: currentD.toISOString().split("T")[0],
            dayNumber: currentD.getDate(),
            isCurrentMonth,
            isToday,
            tasks: isCurrentMonth ? generateRandomTasks(currentD) : [],
        });
    }

    nextTick(() => {
        renderTime.value = Math.round(performance.now() - startTime);
    });

    return days;
});

// 月度统计
const monthStats = computed(() => {
    const currentMonthDays = calendarDays.value.filter((day) => day.isCurrentMonth);
    const totalTasks = currentMonthDays.reduce((sum, day) => sum + day.tasks.length, 0);
    const workDays = currentMonthDays.filter((day) => day.tasks.length > 0).length;
    const avgTasksPerDay = workDays > 0 ? (totalTasks / workDays).toFixed(1) : 0;

    const totalWorkHours = currentMonthDays.reduce((sum, day) => {
        return (
            sum +
            day.tasks
                .filter((task) => task.type === "工作")
                .reduce((taskSum, task) => {
                    return taskSum + (task.to.h - task.from.h);
                }, 0)
        );
    }, 0);

    return {
        totalTasks,
        workDays,
        avgTasksPerDay,
        totalWorkHours,
    };
});

// 小时钟样式
const miniClockTextStyle = {
    fontSize: 12,
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
    fontWeight: "bold",
    textAlign: "center",
    textBaseline: "middle",
};

// 月份操作
const previousMonth = () => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() - 1);
    currentDate.value = newDate;
};

const nextMonth = () => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() + 1);
    currentDate.value = newDate;
};

const onMonthChange = () => {
    hoveredTask.value = null;
};

// 事件处理
const handleSectorHover = (data, date) => {
    if (data) {
        hoveredTask.value = {
            ...data,
            date: new Date(date).toLocaleDateString("zh-CN"),
        };
    } else {
        hoveredTask.value = null;
    }
};

// 格式化函数
const formatMonth = (date) => {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("zh-CN", options);
};

const formatTime = (time) => {
    const h = time.h.toString().padStart(2, "0");
    const m = time.m.toString().padStart(2, "0");
    return `${h}:${m}`;
};

// 监听月份变化
watch(currentDate, () => {
    hoveredTask.value = null;
});

onMounted(() => {
    console.log("月历视图已加载，包含", calendarDays.value.length, "个时钟表盘");
});
</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    margin: 20px 0;
    max-width: 1200px;
}

.month-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.nav-btn {
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.nav-btn:hover {
    background: #2980b9;
}

.current-month {
    text-align: center;
}

.current-month h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 20px;
}

.month-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.calendar-grid {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weekday-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: #34495e;
    color: white;
}

.weekday {
    padding: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: #ecf0f1;
}

.day-container {
    background: white;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}

.day-container.other-month {
    background: #f8f9fa;
    opacity: 0.6;
}

.day-container.today {
    background: #fff5f5;
    box-shadow: inset 0 0 0 2px #e74c3c;
}

.day-container.has-tasks {
    background: #f0f8ff;
}

.day-container:hover {
    transform: scale(1.02);
    z-index: 10;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.day-header {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ecf0f1;
}

.day-number {
    font-weight: bold;
    font-size: 14px;
    color: #2c3e50;
}

.task-count {
    font-size: 10px;
    color: #7f8c8d;
    background: #ecf0f1;
    padding: 2px 6px;
    border-radius: 10px;
}

.clock-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

.task-detail {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 250px;
    max-width: 350px;
}

.task-detail h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 16px;
}

.task-detail p {
    margin: 5px 0;
    font-size: 14px;
    color: #34495e;
}

.month-stats {
    margin-top: 30px;
}

.stat-card {
    background: white;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 20px;
}

.stat-card h4 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 18px;
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
}

.stat-item {
    text-align: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 6px;
}

.stat-label {
    display: block;
    font-size: 12px;
    color: #7f8c8d;
    margin-bottom: 8px;
    font-weight: 500;
}

.stat-value {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #3498db;
}

.performance-info {
    margin-top: 20px;
    padding: 15px;
    background: #e8f5e8;
    border-left: 4px solid #27ae60;
    border-radius: 4px;
    font-size: 14px;
    color: #2c3e50;
}

.performance-info p {
    margin: 2px 0;
}

@media (max-width: 1200px) {
    .calendar-days {
        grid-template-columns: repeat(7, 1fr);
    }

    .day-container {
        min-height: 140px;
    }

    .clock-container {
        padding: 3px;
    }
}

@media (max-width: 768px) {
    .month-selector {
        flex-direction: column;
        gap: 15px;
    }

    .day-container {
        min-height: 120px;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .task-detail {
        position: static;
        margin-top: 20px;
    }
}

@media (max-width: 480px) {
    .calendar-days {
        gap: 0;
    }

    .day-container {
        min-height: 100px;
    }

    .weekday {
        padding: 10px 5px;
        font-size: 12px;
    }

    .day-header {
        padding: 5px;
        flex-direction: column;
        gap: 2px;
    }

    .day-number {
        font-size: 12px;
    }

    .task-count {
        font-size: 9px;
        padding: 1px 4px;
    }
}
</style>
