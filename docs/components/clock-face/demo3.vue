<template>
    <div class="demo-container">
        <h3>日历任务安排</h3>
        <p>展示不同日期的任务时间安排，支持日期切换和任务管理。</p>

        <!-- 日期选择器 -->
        <div class="date-selector">
            <button @click="previousDay" class="nav-btn">← 上一天</button>
            <div class="current-date">
                <h4>{{ formatDate(currentDate) }}</h4>
                <input type="date" v-model="currentDateStr" @change="onDateChange" class="date-input" />
            </div>
            <button @click="nextDay" class="nav-btn">下一天 →</button>
        </div>

        <!-- 时钟表盘 -->
        <div class="demo-wrapper">
            <ClockFace
                :size="450"
                :center-text="centerText"
                :center-text-style="centerTextStyle"
                :sectors="currentDayTasks"
                :border-color="'#34495e'"
                :border-width="3"
                :background-color="'#ecf0f1'"
                :major-tick-color="'#2c3e50'"
                :major-tick-width="3"
                :major-tick-len="25"
                :minor-tick-color="'#7f8c8d'"
                :minor-tick-width="1"
                :minor-tick-len="12"
                @sector-hover="handleSectorHover"
            />
        </div>

        <!-- 任务信息显示 -->
        <div class="task-info">
            <div v-if="hoveredTask" class="current-task">
                <h4>{{ hoveredTask.sector.title }}</h4>
                <p>
                    <strong>时间:</strong> {{ formatTime(hoveredTask.sector.from) }} -
                    {{ formatTime(hoveredTask.sector.to) }}
                </p>
                <p><strong>类型:</strong> {{ hoveredTask.sector.type }}</p>
                <p><strong>描述:</strong> {{ hoveredTask.sector.description }}</p>
                <p v-if="hoveredTask.sector.location"><strong>地点:</strong> {{ hoveredTask.sector.location }}</p>
            </div>

            <div class="task-summary">
                <h4>今日任务总览</h4>
                <div class="task-list">
                    <div
                        v-for="(task, index) in currentDayTasks"
                        :key="index"
                        class="task-item"
                        :style="{ borderLeftColor: task.color }"
                    >
                        <div class="task-time">{{ formatTime(task.from) }} - {{ formatTime(task.to) }}</div>
                        <div class="task-title">{{ task.title }}</div>
                        <div class="task-type">{{ task.type }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 任务统计 -->
        <div class="task-stats">
            <div class="stat-item">
                <span class="stat-label">总任务数:</span>
                <span class="stat-value">{{ currentDayTasks.length }}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">工作时间:</span>
                <span class="stat-value">{{ workHours }}小时</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">休闲时间:</span>
                <span class="stat-value">{{ leisureHours }}小时</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { ClockFace } from "vue3-xm";

const currentDate = ref(new Date());
const hoveredTask = ref(null);

// 格式化当前日期为字符串
const currentDateStr = computed({
    get: () => currentDate.value.toISOString().split("T")[0],
    set: (value) => {
        currentDate.value = new Date(value);
    },
});

// 任务数据库 - 模拟不同日期的任务
const taskDatabase = {
    "2025-08-05": [
        {
            from: { h: 8, m: 0, s: 0 },
            to: { h: 9, m: 0, s: 0 },
            color: "rgba(52, 152, 219, 0.6)",
            title: "晨练",
            type: "健身",
            description: "公园跑步30分钟，增强体质",
            location: "中央公园",
        },
        {
            from: { h: 9, m: 30, s: 0 },
            to: { h: 12, m: 0, s: 0 },
            color: "rgba(231, 76, 60, 0.6)",
            title: "项目开发",
            type: "工作",
            description: "完成用户管理模块的前端开发",
            location: "办公室",
        },
        {
            from: { h: 14, m: 0, s: 0 },
            to: { h: 15, m: 30, s: 0 },
            color: "rgba(46, 204, 113, 0.6)",
            title: "团队会议",
            type: "工作",
            description: "周度项目进展讨论和下周计划",
            location: "会议室A",
        },
        {
            from: { h: 16, m: 0, s: 0 },
            to: { h: 18, m: 0, s: 0 },
            color: "rgba(155, 89, 182, 0.6)",
            title: "代码评审",
            type: "工作",
            description: "审查团队成员提交的代码",
            location: "办公室",
        },
        {
            from: { h: 19, m: 30, s: 0 },
            to: { h: 21, m: 0, s: 0 },
            color: "rgba(241, 196, 15, 0.6)",
            title: "英语学习",
            type: "学习",
            description: "在线英语口语练习",
            location: "家里",
        },
    ],
    "2025-08-06": [
        {
            from: { h: 7, m: 30, s: 0 },
            to: { h: 8, m: 30, s: 0 },
            color: "rgba(52, 152, 219, 0.6)",
            title: "瑜伽练习",
            type: "健身",
            description: "早晨瑜伽，放松身心",
            location: "健身房",
        },
        {
            from: { h: 10, m: 0, s: 0 },
            to: { h: 12, m: 0, s: 0 },
            color: "rgba(231, 76, 60, 0.6)",
            title: "客户拜访",
            type: "工作",
            description: "拜访重要客户，讨论合作事宜",
            location: "客户公司",
        },
        {
            from: { h: 15, m: 0, s: 0 },
            to: { h: 17, m: 0, s: 0 },
            color: "rgba(230, 126, 34, 0.6)",
            title: "文档编写",
            type: "工作",
            description: "编写项目技术文档",
            location: "办公室",
        },
        {
            from: { h: 20, m: 0, s: 0 },
            to: { h: 22, m: 0, s: 0 },
            color: "rgba(142, 68, 173, 0.6)",
            title: "阅读时间",
            type: "休闲",
            description: "阅读技术书籍，提升专业技能",
            location: "家里",
        },
    ],
    "2025-08-07": [
        {
            from: { h: 9, m: 0, s: 0 },
            to: { h: 11, m: 0, s: 0 },
            color: "rgba(26, 188, 156, 0.6)",
            title: "产品设计",
            type: "工作",
            description: "设计新功能的用户界面",
            location: "办公室",
        },
        {
            from: { h: 14, m: 30, s: 0 },
            to: { h: 16, m: 0, s: 0 },
            color: "rgba(52, 73, 94, 0.6)",
            title: "培训课程",
            type: "学习",
            description: "参加Vue.js高级技术培训",
            location: "培训中心",
        },
        {
            from: { h: 18, m: 0, s: 0 },
            to: { h: 20, m: 0, s: 0 },
            color: "rgba(241, 196, 15, 0.6)",
            title: "朋友聚餐",
            type: "休闲",
            description: "与老朋友聚餐聊天",
            location: "餐厅",
        },
    ],
};

// 获取当前日期的任务
const currentDayTasks = computed(() => {
    const dateKey = currentDateStr.value;
    return taskDatabase[dateKey] || [];
});

// 中心文字
const centerText = computed(() => {
    const tasks = currentDayTasks.value.length;
    return tasks > 0 ? `${tasks} 个任务` : "无任务";
});

const centerTextStyle = {
    fontSize: 18,
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
    fontWeight: "bold",
    textAlign: "center",
    textBaseline: "middle",
};

// 计算工作时间和休闲时间
const workHours = computed(() => {
    return currentDayTasks.value
        .filter((task) => task.type === "工作")
        .reduce((total, task) => {
            const duration = task.to.h - task.from.h + (task.to.m - task.from.m) / 60;
            return total + duration;
        }, 0)
        .toFixed(1);
});

const leisureHours = computed(() => {
    return currentDayTasks.value
        .filter((task) => task.type === "休闲")
        .reduce((total, task) => {
            const duration = task.to.h - task.from.h + (task.to.m - task.from.m) / 60;
            return total + duration;
        }, 0)
        .toFixed(1);
});

// 日期操作
const previousDay = () => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() - 1);
    currentDate.value = newDate;
};

const nextDay = () => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + 1);
    currentDate.value = newDate;
};

const onDateChange = () => {
    hoveredTask.value = null;
};

// 事件处理
const handleSectorHover = (data) => {
    hoveredTask.value = data;
};

// 格式化函数
const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    };
    return date.toLocaleDateString("zh-CN", options);
};

const formatTime = (time) => {
    const h = time.h.toString().padStart(2, "0");
    const m = time.m.toString().padStart(2, "0");
    return `${h}:${m}`;
};

// 监听日期变化
watch(currentDate, () => {
    hoveredTask.value = null;
});
</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    margin: 20px 0;
    max-width: 900px;
}

.date-selector {
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

.current-date {
    text-align: center;
}

.current-date h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 18px;
}

.date-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.demo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background: #ffffff;
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.task-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
}

.current-task {
    padding: 20px;
    background: #e8f5e8;
    border-left: 4px solid #27ae60;
    border-radius: 6px;
}

.current-task h4 {
    margin: 0 0 10px 0;
    color: #27ae60;
    font-size: 18px;
}

.current-task p {
    margin: 5px 0;
    color: #2c3e50;
    font-size: 14px;
}

.task-summary {
    padding: 20px;
    background: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
}

.task-summary h4 {
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-size: 16px;
}

.task-list {
    max-height: 200px;
    overflow-y: auto;
}

.task-item {
    padding: 12px;
    margin-bottom: 8px;
    background: #f8f9fa;
    border-left: 4px solid #3498db;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.task-item:hover {
    background: #e9ecef;
}

.task-time {
    font-size: 12px;
    color: #7f8c8d;
    font-weight: 500;
}

.task-title {
    font-size: 14px;
    color: #2c3e50;
    font-weight: 600;
    margin: 2px 0;
}

.task-type {
    font-size: 12px;
    color: #95a5a6;
}

.task-stats {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background: #34495e;
    border-radius: 6px;
    margin-top: 20px;
}

.stat-item {
    text-align: center;
    color: white;
}

.stat-label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    opacity: 0.8;
}

.stat-value {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #3498db;
}

@media (max-width: 768px) {
    .date-selector {
        flex-direction: column;
        gap: 15px;
    }

    .task-info {
        grid-template-columns: 1fr;
    }

    .task-stats {
        flex-direction: column;
        gap: 15px;
    }
}
</style>
