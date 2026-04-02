const artworks = [
    {
        id: 1,
        title: "夕暮れの街",
        desc: "2025年作。デジタルイラスト。静かな夕暮れの情景。",
        category: "digital",
        img: "images/artwork1.jpg"
    },
    {
        id: 2,
        title: "静寂の森",
        desc: "2025年作。水彩風デジタルアート。",
        category: "digital",
        img: "images/artwork2.jpg"
    },
    {
        id: 3,
        title: "猫の午後",
        desc: "2024年作。アナログイラスト（色鉛筆）。",
        category: "traditional",
        img: "images/artwork3.jpg"
    },
    {
        id: 4,
        title: "雨の記憶",
        desc: "2025年作。デジタル。",
        category: "digital",
        img: "images/artwork4.jpg"
    }
    // ← ここに自分の作品を追加してください！
    // 例：
    // {
    //     id: 5,
    //     title: "新しい作品タイトル",
    //     desc: "ここに説明を書きます。",
    //     category: "digital",   // または "traditional" / "other"
    //     img: "images/artwork5.jpg"
    // }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-modal');

    function renderArtworks(filteredArtworks) {
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
                modalImg.src = art.img;
                modalTitle.textContent = art.title;
                modalDesc.textContent = art.desc;
                modal.style.display = 'flex';
            });
            grid.appendChild(card);
        });
    }

    // 初期表示
    renderArtworks(artworks);

    // フィルター
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

    // モーダル閉じる
    closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    console.log('%c✅ LUMINA展示場が起動しました！', 'color:#d4af77; font-size:16px');
});