const apiKey = MY_CONFIG.apiKey;
        
        async function getDetail() {
            const params = new URLSearchParams(window.location.search);
            const gameId = params.get('id');

            if (!gameId) {
                window.location.href = 'index.html';
                return;
            }

            const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                document.getElementById('loading-text').style.display = 'none';
                document.getElementById('content-area').style.display = 'flex';

                document.getElementById('d-img').src = data.background_image || 'https://via.placeholder.com/500';
                document.getElementById('d-title').innerText = data.name;
                document.getElementById('d-desc').innerText = data.description_raw || "Deskripsi tidak tersedia.";
                document.getElementById('d-release').innerText = data.released || "-";
                document.getElementById('d-rating').innerText = `⭐ ${data.rating}/5`;
                document.getElementById('d-playtime').innerText = `${data.playtime} Jam`;
                document.getElementById('d-link').href = data.website || "#";

                if (data.developers && data.developers.length > 0) {
                    document.getElementById('d-dev').innerText = data.developers.map(d => d.name).join(', ');
                } else {
                    document.getElementById('d-dev').innerText = "-";
                }

            } catch (error) {
                console.error(error);
                document.getElementById('loading-text').innerText = "Gagal mengambil data.";
            }
        }

        getDetail();