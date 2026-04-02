const artworks = [
    {
        id: 1,
        title: "作品タイトル1",
        desc: "ここに説明を書いてください",
        category: "digital",
        img: "images/00027-56618107.png"   // ← 正確なファイル名に変更
    },
    {
        id: 2,
        title: "作品タイトル2",
        desc: "ここに説明を書いてください",
        category: "digital",
        img: "images/もう一つのファイル名.png"
    }
    // 画像を追加したいときは、この {} のブロックをコピーして下に追加してください
];

function renderArtworks(filteredArtworks) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    filteredArtworks.forEach(art => {
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

document.addEventListener('DOMContentLoaded', () => {
    renderArtworks(artworks);
    
    // フィルター機能（必要ならそのまま残す）
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // ここはシンプル版なので一旦全表示にしています
            renderArtworks(artworks);
        });
    });
});
