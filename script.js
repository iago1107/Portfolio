document.addEventListener('DOMContentLoaded', () => {
    // Lógica de Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});



// Fecha o Modal (Botão X)
// Abre o Modal (com Lazy Load de vídeo)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Trava a rolagem

        // CÓDIGO NOVO: Carrega o vídeo apenas ao abrir
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            const dataSrc = iframe.getAttribute('data-src');
            // Só carrega se o src ainda estiver vazio e tivermos um data-src salvo
            if (dataSrc && !iframe.src) {
                iframe.src = dataSrc;
            }
        }
    }
}