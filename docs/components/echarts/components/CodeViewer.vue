<template>
    <div class="code-section">
        <div class="code-header">
            <h4>当前配置代码</h4>
            <button @click="toggleCode" class="btn-toggle">
                {{ showCode ? "收起代码" : "展开代码" }}
            </button>
        </div>

        <div v-show="showCode" class="code-content">
            <div class="code-tabs">
                <button @click="activeTab = 'template'" :class="{ active: activeTab === 'template' }" class="tab-btn">
                    Template
                </button>
                <button @click="activeTab = 'script'" :class="{ active: activeTab === 'script' }" class="tab-btn">
                    Script
                </button>
            </div>

            <div class="code-block">
                <pre v-if="activeTab === 'template'"><code>{{ templateCode }}</code></pre>
                <pre v-if="activeTab === 'script'"><code>{{ scriptCode }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
    templateCode: String,
    scriptCode: String,
});

const showCode = ref(false);
const activeTab = ref("template");

const toggleCode = () => {
    showCode.value = !showCode.value;
};
</script>

<style scoped>
.code-section {
    margin-top: 30px;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    background: white;
}

.code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e1e4e8;
    background: #f6f8fa;
    border-radius: 8px 8px 0 0;
}

.code-header h4 {
    margin: 0;
    color: #333;
    font-size: 16px;
}

.btn-toggle {
    padding: 6px 12px;
    border: 1px solid #0366d6;
    background: white;
    color: #0366d6;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
}

.btn-toggle:hover {
    background: #0366d6;
    color: white;
}

.code-content {
    padding: 0;
}

.code-tabs {
    display: flex;
    border-bottom: 1px solid #e1e4e8;
    background: #f6f8fa;
}

.tab-btn {
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: #586069;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
}

.tab-btn.active {
    color: #0366d6;
    border-bottom-color: #0366d6;
    background: white;
}

.tab-btn:hover:not(.active) {
    color: #24292e;
    background: #e1e4e8;
}

.code-block {
    background: #1e1e1e;
    padding: 20px;
    overflow-x: auto;
    max-height: 400px;
    overflow-y: auto;
}

.code-block pre {
    margin: 0;
    color: #d4d4d4;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
}

.code-block code {
    color: #d4d4d4;
}

@media (max-width: 480px) {
    .code-tabs {
        flex-direction: column;
    }

    .code-block {
        font-size: 12px;
        padding: 15px;
    }
}
</style>
