document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const tagButtons = document.querySelectorAll('#tag-filters .btn[data-tag]');
    const gallery = document.getElementById('gallery');
    const columns = document.querySelectorAll('.col[data-tags]');
    const noResults = document.getElementById('no-results');
    const shuffleBtn = document.getElementById('shuffle-btn');

    let activeTag = 'all';

    function updateURL() {
        const url = new URL(window.location);
        if (activeTag === 'all') {
            url.searchParams.delete('tag');
        } else {
            url.searchParams.set('tag', activeTag);
        }
        window.history.replaceState({}, '', url);
    }

    function setActiveTag(tag) {
        activeTag = tag;
        tagButtons.forEach(btn => {
            btn.classList.remove('active', 'btn-primary');
            btn.classList.add('btn-outline-secondary');
            if (btn.dataset.tag === tag) {
                btn.classList.remove('btn-outline-secondary');
                btn.classList.add('active', 'btn-primary');
            }
        });
        updateURL();
        filterCards();
    }

    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        columns.forEach(column => {
            const name = column.dataset.name || '';
            const description = column.dataset.description || '';
            const tags = column.dataset.tags || '';

            const matchesSearch = !searchTerm ||
                name.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.includes(searchTerm);

            const matchesTag = activeTag === 'all' || tags.includes(activeTag);

            if (matchesSearch && matchesTag) {
                column.classList.remove('hidden');
                visibleCount++;
            } else {
                column.classList.add('hidden');
            }
        });

        noResults.hidden = visibleCount > 0;
    }

    function shuffleGallery() {
        const columnsArray = Array.from(columns);
        for (let i = columnsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            gallery.appendChild(columnsArray[j]);
            [columnsArray[i], columnsArray[j]] = [columnsArray[j], columnsArray[i]];
        }
        columnsArray.forEach(col => gallery.appendChild(col));
    }

    // Read tag from URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const tagFromURL = urlParams.get('tag');
    if (tagFromURL) {
        setActiveTag(tagFromURL);
    }

    searchInput.addEventListener('input', filterCards);

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveTag(button.dataset.tag);
        });
    });

    // Make card tags clickable
    document.querySelectorAll('.tag-badge').forEach(badge => {
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            setActiveTag(badge.dataset.tag);
        });
    });

    shuffleBtn.addEventListener('click', shuffleGallery);
});
