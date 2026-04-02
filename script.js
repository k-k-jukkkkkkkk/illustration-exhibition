// =============================================
// 幻想的な金の粒子背景付き イラスト展示サイト
// =============================================

const artworks = [
    {
        id: 1,
        title: "作品タイトル1",
        desc: "ここに説明を書いてください",
        category: "digital",
        img: "images/00027-56618107.png"
    },
    {
        id: 2,
        title: "作品タイトル2",
        desc: "ここに説明を書いてください",
        category: "digital",
        img: "images/あなたの次の画像.png"
    }
    // 作品を追加するときはこのブロックをコピーして追加
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

// 金の粒子アニメーションを作成
function createGoldParticles() {
    const container = document.createElement('div');
    container.className = 'gold-particles';
    document.body.appendChild(container);

    for (let i = 0; i < 80; i++) {   // 粒子の数（調整可能）
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムな位置とアニメーション時間
        const left = Math.random() * 100;
        const size = Math.random() * 4 + 2;           // 2px〜6px
        const duration = Math.random() * 25 + 20;     // 20〜45秒
        const delay = Math.random() * -40;            // 遅延で自然に
        
        particle.style.left = `${left}vw`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.6 + 0.3;
        
        container.appendChild(particle);
    }
}

// フィルター機能（カテゴリ対応）
document.addEventListener('DOMContentLoaded', () => {
    renderArtworks(artworks);
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            if (filter === 'all') {
                renderArtworks(artworks);
            } else {
                const filtered = artworks.filter(art => art.category === filter);
                renderArtworks(filtered);
            }
        });
    });

    // 金の粒子アニメーションを起動
    createGoldParticles();

    console.log('%c✨ LUMINA - 金の粒子アニメーション付きで起動しました', 'color:#d4af77; font-size:16px');
});
