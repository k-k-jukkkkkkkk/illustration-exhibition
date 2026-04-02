// =============================================
// 自動で images フォルダを読み込むバージョン
// =============================================

const USERNAME = "k-j-jukkkkkkk";   // ← ここをあなたのGitHubユーザー名に変更
const REPO = "illustration-exhibition";   // ← リポジトリ名（変更してなければこのままでOK）

// 作品を自動で読み込んで表示する関数
async function loadImagesFromGitHub() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:40px;">画像を読み込み中...</p>';

    try {
        const response = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/contents/images`);
        
        if (!response.ok) {
            throw new Error('フォルダが見つかりません');
        }

        const files = await response.json();

        // 画像ファイルだけをフィルタリング
        const artworks = files
            .filter(file => file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i))
            .map((file, index) => ({
                id: index + 1,
                title: file.name.replace(/\.[^/.]+$/, ""),   // ファイル名から拡張子を削除してタイトルに
                desc: "自動読み込みされた作品です。タイトルは後で編集できます。",
                category: "digital",
                img: `images/${file.name}`
            }));

        if (artworks.length === 0) {
            grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:40px;">imagesフォルダに画像がありません</p>';
            return;
        }

        renderArtworks(artworks);

    } catch (error) {
        console.error("画像読み込みエラー:", error);
        grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; padding:40px; color:#ff6b6b;">
            画像の自動読み込みに失敗しました。<br>
            手動で作品を追加するか、imagesフォルダに画像があるか確認してください。
        </p>`;
    }
}

// 作品を表示する関数（元のコードからほぼそのまま）
function renderArtworks(artworks) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    artworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.innerHTML = `
            <img src="${art.img}" alt="${art.title}">
            <div class="art-overlay">
                <h3>${art.title}</h3>
            </div>
        `;
        card.addEventListener('click', () => {
            document.getElementById('modal-img').src = art.img;
            document.getElementById('modal-title').textContent = art.title;
            document.getElementById('modal-desc').textContent = art.desc;
            document.getElementById('modal').style.display = 'flex';
        });
        grid.appendChild(card);
    });
}

// ページが読み込まれたら自動実行
document.addEventListener('DOMContentLoaded', () => {
    loadImagesFromGitHub();

    // フィルターボタンは一旦無効化（自動読み込み版ではシンプルに）
    // 必要なら後で拡張できます
    console.log('%c✅ 自動画像読み込みモードで起動しました！', 'color:#d4af77; font-size:16px');
});
