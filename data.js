// 统一数据层
const STORAGE_KEY = 'class280_site';

function getData() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) { return {}; }
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 初始化：只加缺失的字段，不覆盖已有数据
function ensureData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        // 已有数据，只补充缺失字段
        const data = JSON.parse(raw);
        let changed = false;
        
        if (!data.modules) {
            data.modules = [
                { id: 'book', name: '历史书', icon: '📖' },
                { id: 'notice', name: '公告栏', icon: '📋' },
                { id: 'submit', name: '创作投稿', icon: '✍️' },
                { id: 'novel', name: '小说', icon: '📖' }
            ];
            changed = true;
        }
        if (!data.novels) { data.novels = []; changed = true; }
        if (!data.bookChapters) { data.bookChapters = []; changed = true; }
        if (!data.notices) { data.notices = []; changed = true; }
        if (!data.submissions) { data.submissions = []; changed = true; }
        if (!data.suggestions) { data.suggestions = []; changed = true; }
        if (!data.genericContent) { data.genericContent = {}; changed = true; }
        
        if (changed) {
            saveData(data);
        }
        return;
    }
    
    // 完全没有数据，才初始化
    const data = {
        modules: [
            { id: 'book', name: '历史书', icon: '📖' },
            { id: 'notice', name: '公告栏', icon: '📋' },
            { id: 'submit', name: '创作投稿', icon: '✍️' },
            { id: 'novel', name: '小说', icon: '📖' }
        ],
        bookChapters: [],
        notices: [],
        novels: [],
        submissions: [],
        suggestions: [],
        genericContent: {}
    };
    saveData(data);
}

ensureData();