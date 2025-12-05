document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE FILTROS DOS PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Se for 'all' ou se a categoria do card incluir o filtro, mostra
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// --- FUNÇÕES DOS MODAIS ---

// 1. Abrir Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Trava a rolagem da página de trás
    } else {
        console.error("Erro: Modal não encontrado com o ID: " + modalId);
    }
}

// 2. Fechar Modal (Botão X)
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Tenta parar o vídeo primeiro
        stopVideo(modal);

        // Fecha a janela
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Libera a rolagem
    }
}

// 3. Fechar Modal (Clicando fora da janela)
window.onclick = function(event) {
    // Verifica se o elemento clicado é o fundo escuro (que tem a classe 'modal')
    if (event.target.classList.contains('modal')) {
        stopVideo(event.target); // Para o vídeo
        event.target.style.display = "none"; // Fecha
        document.body.style.overflow = "auto"; // Libera rolagem
    }
}

// 4. Função Auxiliar para Parar Vídeos (Local ou YouTube)
function stopVideo(modal) {
    if (!modal) return;

    try {
        // Para vídeo local (.mp4)
        const localVideo = modal.querySelector('video');
        if (localVideo) {
            localVideo.pause();
            localVideo.currentTime = 0; // Volta para o início
        }

        // Para vídeo do YouTube (iframe)
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src; // Reinicia o iframe para cortar o áudio
        }
    } catch (error) {
        console.log("Aviso: Erro ao tentar parar o vídeo (mas a janela fechará).", error);
    }
}