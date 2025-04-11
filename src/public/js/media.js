document.addEventListener('DOMContentLoaded', () => {
    // 监听表单提交
    document.getElementById('mediaForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveMediaSettings();
    });
});


async function saveMediaSettings() {
    const enableStrm = document.getElementById('enableStrm').checked
    const enableEmby = document.getElementById('enableEmby').checked
    const settings = {
        strm: {
            enable: enableStrm,
        },
        emby: {
            enable: enableEmby,
            serverUrl: document.getElementById('embyServer').value,
            apiKey: document.getElementById('embyApiKey').value,
        }
    };

    try {
        const response = await fetch('/api/settings/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });

        const result = await response.json();
        if (result.success) {
            alert('保存成功');
        } else {
            alert('保存失败: ' + result.error);
        }
    } catch (error) {
        alert('保存失败: ' + error.message);
    }
}