// ===== Supabase 配置 =====
const SUPABASE_URL = 'https://gbktpjnitqpwomcprrol.supabase.co';   // ← 替换成你的 Project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdia3Rwam5pdHFwd29tY3Bycm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MTk2NDIsImV4cCI6MjA5ODk5NTY0Mn0.TIp9NAdDRZrI16Jq_no7Ga9EpX7ooc6b5Ck7r-sNqww';                // ← 替换成你的 Anon Key

// ===== Supabase 请求封装 =====
async function supabaseRequest(table, method = 'GET', data = null, id = null) {
    const url = id 
        ? `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`
        : `${SUPABASE_URL}/rest/v1/${table}`;
    
    const options = {
        method: method,
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    };
    
    if (data && (method === 'POST' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }
    
    const res = await fetch(url, options);
    if (method === 'DELETE') return { ok: true };
    return res.json();
}

// ===== 新数据层（替换 localStorage）=====
const DB = {
    // 小说
    async getNovels() {
        return await supabaseRequest('novels') || [];
    },
    async addNovel(novel) {
        return await supabaseRequest('novels', 'POST', novel);
    },
    async likeNovel(id) {
        const novels = await supabaseRequest('novels') || [];
        const novel = novels.find(n => n.id === id);
        if (novel) {
            await supabaseRequest('novels', 'PATCH', { likes: (novel.likes || 0) + 1 }, id);
        }
    },

    // 历史书章节
    async getChapters() {
        return await supabaseRequest('chapters') || [];
    },
    async addChapter(ch) {
        return await supabaseRequest('chapters', 'POST', ch);
    },

    // 公告
    async getNotices() {
        return await supabaseRequest('notices') || [];
    },
    async addNotice(notice) {
        return await supabaseRequest('notices', 'POST', notice);
    }
};