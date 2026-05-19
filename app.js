// MOCK DATA (Array de objetos en memoria de JavaScript)
const posts = [
    {
        id: 1,
        title: "Favoritos al título mundial: El análisis táctico",
        subtitle: "Un repaso profundo por las selecciones que prometen dominar el torneo.",
        date: "2026-05-10",
        tags: ["Previas", "Táctica"],
        content: `El mundial está a la vuelta de la esquina y los directores técnicos ya tienen sus pizarras totalmente preparadas. Analizamos el despliegue del último campeón que busca revalidar su corona con un sistema de presión alta y transiciones veloces.

        Por otro lado, los equipos sudamericanos apuestan por la tenencia de balón y el talento individual en el último tercio de la cancha. Se espera una batalla táctica sin precedentes en el mediocampo.
        
        Las transiciones de defensa a ataque serán la clave de bóveda de este torneo. Aquellos combinados capaces de replegarse con orden y castigar en pocos toques marcarán la diferencia en las fases eliminatorias.`
    },
    {
        id: 2,
        title: "La caída de un gigante en el Grupo B",
        subtitle: "Crónica de un partido histórico que rompe todos los pronósticos de la fase de clasificación.",
        date: "2026-05-12",
        tags: ["Grupos", "Crónicas"],
        content: `Nadie vio venir este resultado. En un partido vibrante de principio a fin, el combinado catalogado como la 'cenicienta' del grupo derrotó al tetracampeón con un contragolpe fulminante en el minuto 89.

        El planteamiento defensivo de la escuadra ganadora fue simplemente perfecto, cerrando todas las líneas de pase por dentro y forzando centros predecibles. El gigante herido ahora se ve obligado a ganar sus próximos dos partidos si no quiere regresar a casa temprano.
        
        Las caras de incredulidad en el estadio lo decían todo. Este hermoso deporte sigue demostrando que la historia en el papel no juega dentro del campo de juego.`
    },
    {
        id: 3,
        title: "10 curiosidades tecnológicas de los nuevos estadios",
        subtitle: "Desde césped retráctil inteligente hasta sistemas de climatización eco-sustentables.",
        date: "2026-05-13",
        tags: ["Curiosidades"],
        content: `La infraestructura de esta edición mundialista redefine lo que conocemos como un recinto deportivo moderno. Cada uno de los estadios cuenta con un sistema de enfriamiento localizado impulsado por energía solar que mantiene las tribunas a unos estables 21 grados centígrados.

        Además, los asientos incorporan sensores de comunicación de campo cercano (NFC) donde los aficionados pueden ordenar comida directo a su butaca o revisar repeticiones de jugadas polémicas en tiempo real a través de la red local del estadio. 
        
        Por si fuera poco, el agua utilizada para el mantenimiento y riego de los campos de juego proviene en un 90% de procesos de desalinización locales y filtrado avanzado de aguas residuales de las mismas instalaciones.`
    },
    {
        id: 4,
        title: "El perfil de Liam Rossi: La promesa oculta",
        subtitle: "De jugar en las calles de su ciudad natal a convertirse en el arma secreta de su selección.",
        date: "2026-05-14",
        tags: ["Curiosidades", "Previas"],
        content: `Con apenas 19 años de edad, Liam Rossi se ha ganado la titularidad y la emblemática camiseta número 10 de su país a base de desparpajo técnico, regate vertical letal y una lectura de juego impropia de su juventud.

        Su director técnico destaca principalmente su asombrosa fortaleza mental frente a la adversidad: 'No le teme al escenario ni a la presión de millones de personas observándolo'. Los ojeadores de los clubes más grandes de Europa ya se encuentran apostados en las cabinas de prensa siguiendo minuciosamente cada uno de sus movimientos. Este mundial puede ser el inicio de su consagración internacional.`
    },
    {
        id: 5,
        title: "Los sistemas defensivos que definirán el torneo",
        subtitle: "Por qué los bloques bajos y el marcaje mixto están ganando terreno en la élite internacional.",
        date: "2026-05-15",
        tags: ["Táctica", "Previas"],
        content: `En las últimas ligas internacionales se ha observado una notable tendencia hacia la solidez del bloque defensivo. Los entrenadores mundialistas coinciden en que la prioridad absoluta es no encajar goles tempranos en torneos de eliminación directa.

        Veremos planteamientos tácticos extremadamente rígidos en la fase de grupos, donde obtener un empate puede ser el boleto de entrada a los octavos de final. Las defensas de HTML de cinco hombres con carrileros de alta proyección serán la norma.`
    },
    {
        id: 6,
        title: "Grandes leyendas: El mundial que lo cambió todo",
        subtitle: "Crónica nostálgica de las mayores hazañas deportivas de la historia de la copa.",
        date: "2026-05-16",
        tags: ["Crónicas", "Grupos"],
        content: `Recordar es volver a vivir. Este artículo nos lleva en un viaje al pasado para recordar la mítica final donde se quebraron todos los récords de audiencia global. Aquellos astros del balón dejaron una huella imborrable que sirve de inspiración para las generaciones actuales.

        Hoy el juego es más físico y tecnológico, pero el espíritu competitivo y el romance que genera ver a un jugador eludir rivales en el césped sigue siendo exactamente el mismo.`
    }
];

// CONTROL DE ESTADO LOCAL
let currentFilterTag = "";  
let currentSearchQuery = ""; 
let currentArticleId = null; 

// SELECTORES DEL DOM
const postsGrid = document.getElementById("posts-grid");
const chipsContainer = document.getElementById("chips-container");
const searchInput = document.getElementById("search-input");
const homeView = document.getElementById("home-view");
const detailView = document.getElementById("detail-view");
const controlsSection = document.getElementById("controls-section");
const articleContent = document.getElementById("article-content");

const backBtn = document.getElementById("back-btn");
const prevPostBtn = document.getElementById("prev-post-btn");
const nextPostBtn = document.getElementById("next-post-btn");
const relatedPostsGrid = document.getElementById("related-posts-grid");

// UTILIDADES Y CÁLCULOS
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const totalWords = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(totalWords / wordsPerMinute);
    return `${readingTime} min de lectura`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// RENDERIZADORES
function renderChips() {
    const uniqueTags = new Set();
    posts.forEach(post => post.tags.forEach(tag => uniqueTags.add(tag)));

    let chipsHtml = `<button class="chip ${currentFilterTag === "" ? "active" : ""}" data-tag="">Todos</button>`;
    uniqueTags.forEach(tag => {
        chipsHtml += `<button class="chip ${currentFilterTag === tag ? "active" : ""}" data-tag="${tag}">${tag}</button>`;
    });

    chipsContainer.innerHTML = chipsHtml;

    const chips = chipsContainer.querySelectorAll(".chip");
    chips.forEach(chip => {
        chip.addEventListener("click", (e) => {
            currentFilterTag = e.target.getAttribute("data-tag");
            renderChips(); 
            renderHome();  
        });
    });
}

function renderHome() {
    postsGrid.innerHTML = "";

    const filteredPosts = posts.filter(post => {
        const matchesTag = currentFilterTag === "" || post.tags.includes(currentFilterTag);
        const matchesSearch = post.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                              post.tags.some(tag => tag.toLowerCase().includes(currentSearchQuery.toLowerCase()));
        return matchesTag && matchesSearch;
    });

    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px 0; color: var(--text-muted);">
                <p style="font-size: 1.1rem;">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>`;
        return;
    }

    filteredPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-top">
                <div class="card-meta">
                    <span>${formatDate(post.date)}</span>
                    <span class="card-meta-dot"></span>
                    <span>${calculateReadingTime(post.content)}</span>
                </div>
                <h2 class="card-title">${post.title}</h2>
                <p class="card-excerpt">${post.subtitle}</p>
            </div>
            <div class="card-tags">
                ${post.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
        `;
        card.addEventListener("click", () => showDetail(post.id));
        postsGrid.appendChild(card);
    });
}

function showDetail(id) {
    currentArticleId = id;
    const postIndex = posts.findIndex(p => p.id === id);
    const post = posts[postIndex];

    if (!post) return;

    homeView.classList.add("hidden");
    controlsSection.classList.add("hidden");
    detailView.classList.remove("hidden");

    const bodyHtml = post.content
        .split('\n\n')
        .map(p => `<p>${p.trim()}</p>`)
        .join('');

    articleContent.innerHTML = `
        <header class="article-header">
            <h2 class="article-title">${post.title}</h2>
            <div class="article-meta-info">
                Publicado el <strong>${formatDate(post.date)}</strong>
                <span style="color: var(--border);">|</span>
                <span>Estimación: <strong>${calculateReadingTime(post.content)}</strong></span>
            </div>
        </header>
        <div class="article-body">${bodyHtml}</div>
        <div class="card-tags" style="margin-top: 30px;">
            ${post.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
    `;

    prevPostBtn.disabled = postIndex === 0;
    nextPostBtn.disabled = postIndex === posts.length - 1;

    renderRelatedPosts(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderRelatedPosts(currentPost) {
    relatedPostsGrid.innerHTML = "";

    const related = posts.filter(post => {
        if (post.id === currentPost.id) return false;
        return post.tags.some(tag => currentPost.tags.includes(tag));
    }).slice(0, 3);

    if (related.length === 0) {
        relatedPostsGrid.innerHTML = `
            <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic; grid-column: 1/-1;">
                No hay artículos relacionados disponibles para esta categoría.
            </p>`;
        return;
    }

    related.forEach(post => {
        const rCard = document.createElement("div");
        rCard.className = "card";
        rCard.innerHTML = `
            <div class="card-top">
                <div class="card-meta">${formatDate(post.date)}</div>
                <h2 class="card-title" style="font-size: 1.15rem;">${post.title}</h2>
            </div>
            <div class="card-tags">
                ${post.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
        `;
        rCard.addEventListener("click", () => showDetail(post.id));
        relatedPostsGrid.appendChild(rCard);
    });
}

function showHome() {
    detailView.classList.add("hidden");
    homeView.classList.remove("hidden");
    controlsSection.classList.remove("hidden");
    currentArticleId = null;
    renderHome();
}

// ESCUCHADORES DE EVENTOS
searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    renderHome();
});

backBtn.addEventListener("click", showHome);

prevPostBtn.addEventListener("click", () => {
    const currentIndex = posts.findIndex(p => p.id === currentArticleId);
    if (currentIndex > 0) showDetail(posts[currentIndex - 1].id);
});

nextPostBtn.addEventListener("click", () => {
    const currentIndex = posts.findIndex(p => p.id === currentArticleId);
    if (currentIndex < posts.length - 1) showDetail(posts[currentIndex + 1].id);
});

// INICIALIZACIÓN
renderChips();
renderHome();
