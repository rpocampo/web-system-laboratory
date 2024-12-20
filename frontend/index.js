// API URL
const API_URL = 'http://localhost:5000/api/song';

// DOM Elements
const songList = document.getElementById('songList');
const addForm = document.getElementById('addSongForm');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const editSongTitle = document.getElementById('editSongTitle');
const editSongArtist = document.getElementById('editSongArtist');
const saveChangesBtn = document.getElementById('saveChanges');
const searchInput = document.getElementById('searchInput');

let currentSongId = null;
let allSongs = []; // Store all songs for filtering

// Fetch all songs
async function fetchSongs() {
    try {
        const response = await fetch(`${API_URL}/all`);
        allSongs = await response.json(); // Store all songs
        displaySongs(allSongs);
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Display songs in the list
function displaySongs(songs) {
    songList.innerHTML = songs.map(song => `
        <li class="list-group-item d-flex justify-content-between align-items-center bg-white text-dark shadow-sm mb-2 rounded">
            <div style="width: 30%">
                <p class="mb-0 fw-semibold">${song.Name}</p>
            </div>
            <div style="width: 30%">
                <small class="d-block text-muted">${song.Artist}</small>
            </div>
            <div>
                <button class="badge bg-warning btn-edit rounded-pill me-2 border-0" 
                        data-bs-toggle="modal" 
                        data-bs-target="#editModal"
                        onclick="prepareEdit('${song._id}', '${song.Name}', '${song.Artist}')">
                    Edit
                </button>
                <button class="badge bg-danger btn-delete rounded-pill border-0" 
                        onclick="confirmDelete('${song._id}', '${song.Name}')">
                    Delete
                </button>
            </div>
        </li>
    `).join('');
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSongs = allSongs.filter(song => 
        song.Name.toLowerCase().includes(searchTerm) || 
        song.Artist.toLowerCase().includes(searchTerm)
    );
    displaySongs(filteredSongs);
}

// Delete confirmation
function confirmDelete(id, songName) {
    if (confirm(`Are you sure you want to delete "${songName}"?`)) {
        deleteSong(id);
    }
}

// Add new song
async function addSong(e) {
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: songTitle.value,
                Artist: songArtist.value
            })
        });
        if (response.ok) {
            songTitle.value = '';
            songArtist.value = '';
            fetchSongs();
        }
    } catch (error) {
        console.error('Error adding song:', error);
    }
}

// Delete song
async function deleteSong(id) {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchSongs();
        }
    } catch (error) {
        console.error('Error deleting song:', error);
    }
}

// Prepare edit modal
function prepareEdit(id, name, artist) {
    currentSongId = id;
    editSongTitle.value = name;
    editSongArtist.value = artist;
}

// Update song
async function updateSong() {
    try {
        const response = await fetch(`${API_URL}/update/${currentSongId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: editSongTitle.value,
                Artist: editSongArtist.value
            })
        });
        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            modal.hide();
            fetchSongs();
        }
    } catch (error) {
        console.error('Error updating song:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchSongs);
addForm.addEventListener('submit', addSong);
saveChangesBtn.addEventListener('click', updateSong);
searchInput.addEventListener('input', handleSearch); // Add search event listener