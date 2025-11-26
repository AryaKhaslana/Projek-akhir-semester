    const apiKey = MY_CONFIG.apiKey;
    const gridContainer = document.getElementById('api-game');
    const loadingDiv = document.getElementById('loading');

    async function fetchGames(query = '') {
        let url;
        
        if (query) {
            url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=12`;
        } else {
            url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2025-12-31&ordering=-added&page_size=12`;
        }

        loadingDiv.style.display = 'block';
        gridContainer.innerHTML = '';

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            loadingDiv.style.display = 'none';

            if (data.results.length === 0) {
                gridContainer.innerHTML = '<h3 style="text-align:center; color:white; width:100%;">Game tidak ditemukan</h3>';
                return;
            }

            data.results.forEach(game => {
                const card = document.createElement('div');
                card.className = 'api-card'; 
                
                card.innerHTML = `
                    <img src="${game.background_image || 'https://via.placeholder.com/300'}" alt="${game.name}">
                    <div class="api-card-title">${game.name}</div>
                `;

                card.onclick = function() {
                    window.location.href = `detail.html?id=${game.id}`;
                };

                gridContainer.appendChild(card);
            });

        } catch (error) {
            console.error(error);
            loadingDiv.innerText = "Gagal memuat data.";
        }
    }

    function handleSearch(event) {
        if (event.key === 'Enter') {
            const query = document.getElementById('search-input').value;
            fetchGames(query);
        }
    }

    fetchGames();