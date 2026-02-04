document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const tagButtons = document.querySelectorAll('#tag-filters .btn[data-tag]');
    const columns = document.querySelectorAll('.col[data-tags]');
    const noResults = document.getElementById('no-results');

    let activeTag = 'all';

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

    searchInput.addEventListener('input', filterCards);

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            tagButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-secondary');
            });
            button.classList.remove('btn-outline-secondary');
            button.classList.add('active', 'btn-primary');
            activeTag = button.dataset.tag;
            filterCards();
        });
    });
});
