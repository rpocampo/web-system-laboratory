document.addEventListener('DOMContentLoaded', function() {
    const playerList = document.getElementById('nbaplayers');
    const addBtn = document.getElementById('addBtn');
    const playerNameInput = document.getElementById('playername');
    const teamInput = document.getElementById('team');
    const searchInput = document.querySelector('input[type="text"][placeholder="Search here..."]');

    addBtn.addEventListener('click', function() {
        const playerName = playerNameInput.value.trim();
        const teamName = teamInput.value.trim();

        if (playerName && teamName) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="Player">
                    <span>${playerName}</span>
                    <small>${teamName}</small>
                </div>
                <button class="delete">Delete</button>
            `;
            playerList.appendChild(li);

            
            playerNameInput.value = '';
            teamInput.value = '';

          
            li.querySelector('.delete').addEventListener('click', function() {
                li.remove();
            });
        }
    });

   
    playerList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        }
    });

   
    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const players = playerList.getElementsByTagName('li');

        Array.from(players).forEach(function(player) {
            const playerName = player.querySelector('span').textContent.toLowerCase();

            if (playerName.includes(searchValue)) {
                player.style.display = '';
            } else {
                player.style.display = 'none';
            }
        });
    });
});
