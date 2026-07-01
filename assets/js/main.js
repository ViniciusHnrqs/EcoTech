document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const updateThemeIcon = (isDark) => {
        const path = window.location.pathname.toLowerCase();
        const isSubdir = path.includes('/seção inicial/') || path.includes('/cursos/') || path.includes('/se%c3%a7%c3%a3o%20inicial/');
        const pathPrefix = isSubdir ? '../' : '';
        themeIcon.src = isDark ? `${pathPrefix}assets/img/brilho.png` : `${pathPrefix}assets/img/icons8-modo-escuro-50.png`;
    };

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const isDark = body.classList.contains('dark-theme');
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        updateThemeIcon(true);
    }

    const calcBtn = document.querySelector('.calculator-section .btn-primary');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const input = document.getElementById('paper-usage');
            const resultDiv = document.getElementById('calc-result');
            const sheetsSpan = document.getElementById('res-sheets');
            const treesSpan = document.getElementById('res-trees');

            const dailySheets = parseFloat(input.value);
            if (isNaN(dailySheets) || dailySheets < 0) return;

            const yearlySheets = dailySheets * 260; 
            const treesSaved = (yearlySheets / 8.33).toFixed(2);

            sheetsSpan.innerText = yearlySheets.toLocaleString();
            treesSpan.innerText = treesSaved;
            resultDiv.style.display = 'flex';
        });
    }

    //Atividades
    const btnAtividades = document.getElementById('btn-atividades');
    const quizSection = document.getElementById('quiz-section');
    const quizForm = document.getElementById('quiz-form');

    if (btnAtividades && quizSection && quizForm) {
        const isCloudCourse = document.body.classList.contains('theme-cloud');
        const isTecCourse = document.body.classList.contains('theme-tec');

        // Banco de perguntas base
        const perguntasExcel = [
            { q: "Qual a principal vantagem ambiental de migrar arquivos físicos para o Excel?", options: ["Aumento do consumo de energia", "Redução drástica do uso de papel e desmatamento", "Facilidade em imprimir mais cópias"], correct: 1 },
            { q: "No Excel, qual símbolo é obrigatório para iniciar qualquer cálculo ou função?", options: ["%", "$", "="], correct: 2 },
            { q: "Como a 'Digitalização de Processos' impacta a eficiência de uma equipe de engenharia?", options: ["Torna o acesso aos dados mais lento", "Reduz erros manuais e facilita o compartilhamento sustentável", "Aumenta a necessidade de espaço físico"], correct: 1 },
            { q: "O salvamento automático na nuvem (OneDrive/SharePoint) ajuda o meio ambiente porque:", options: ["Evita a impressão de versões intermediárias de documentos", "Consome mais bateria do notebook", "Apaga arquivos antigos sozinho"], correct: 0 },
            { q: "Qual destas é uma prática de Excel sustentável?", options: ["Imprimir todas as abas da planilha", "Usar Dashboards digitais para monitorar consumo de recursos", "Compartilhar via Pendrive apenas"], correct: 1 }
        ];

        const perguntasCloud = [
            { q: "O que caracteriza a 'Desmaterialização' no contexto de TI Verde?", options: ["A destruição física de servidores", "A substituição de produtos e processos físicos por digitais", "A criação de novos hardwares"], correct: 1 },
            { q: "Qual a vantagem da nuvem para o ciclo de vida do hardware?", options: ["Exige que você compre um PC novo todo mês", "Reduz a carga de processamento local, estendendo a vida útil do PC", "Nenhuma, a nuvem estraga o SSD"], correct: 1 },
            { q: "Servidores em nuvem de grandes empresas (Google/Microsoft) costumam ser mais sustentáveis porque:", options: ["Ficam desligados à noite", "Utilizam inteligência artificial para otimizar o resfriamento e energia", "Não usam eletricidade"], correct: 1 },
            { q: "O compartilhamento de links em vez de anexos de e-mail ajuda a:", options: ["Reduzir a redundância de dados e o consumo de storage nos servidores", "Aumentar o tráfego de spam", "Deixar o computador mais pesado"], correct: 0 },
            { q: "Trabalhar em documentos colaborativos em tempo real evita:", options: ["O uso de internet", "A criação de múltiplas cópias desnecessárias e lixo digital", "O salvamento dos dados"], correct: 1 }
        ];

        const perguntasTec = [
            { q: "O que é o 'E-waste' ou Lixo Eletrônico?", options: ["Pilhas de papel velho", "Equipamentos eletrônicos descartados de forma incorreta", "Vírus de computador"], correct: 1 },
            { q: "Para uma Engenharia Sustentável, qual a melhor ação ao notar um PC lento?", options: ["Comprar um computador novo imediatamente", "Fazer um upgrade de SSD/RAM e limpeza interna", "Jogar no lixo comum"], correct: 1 },
            { q: "Qual componente do PC contém metais pesados que poluem o solo se descartados incorretamente?", options: ["Gabinete de plástico", "Placas de circuito e baterias", "Cabo de força"], correct: 1 },
            { q: "A arquitetura de hardware eficiente (como CPUs modernas) foca em:", options: ["Aumentar o consumo de energia", "Melhor desempenho com menor dissipação de calor e energia", "Ser apenas mais bonita"], correct: 1 },
            { q: "O que é a Logística Reversa de eletrônicos?", options: ["Vender o PC para um amigo", "O fabricante recolher o produto antigo para reciclagem correta", "Comprar peças usadas"], correct: 1 }
        ];

        const bancoPerguntas = isTecCourse ? perguntasTec : (isCloudCourse ? perguntasCloud : perguntasExcel);

        // Inicializa o questionário 
        const renderQuiz = () => {
            quizForm.innerHTML = bancoPerguntas.map((p, i) => `
                <div class="question-card">
                    <p><strong>Questão ${i+1}:</strong> ${p.q}</p>
                    ${p.options.map((opt, optIdx) => `
                        <label class="option-item">
                            <input type="radio" name="q${i}" value="${optIdx}" required> ${opt}
                        </label>
                    `).join('')}
                </div>
            `).join('') + `<button type="submit" class="btn-submit">Enviar Respostas</button>`;
        };

        btnAtividades.addEventListener('click', (e) => {
            e.preventDefault();
            // Alterna a exibição da seção das atividades
            if (quizSection.style.display === 'none') {
                renderQuiz();
                quizSection.style.display = 'block';
                quizSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                quizSection.style.display = 'none';
            }
        });

        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let score = 0;

            bancoPerguntas.forEach((p, i) => {
                const radios = quizForm[`q${i}`];
                const selectedValue = quizForm[`q${i}`].value;
                const card = radios[0].closest('.question-card');

                // Reseta feedbacks anteriores
                card.style.borderLeft = "5px solid var(--primary)";
                card.style.backgroundColor = "";
                const existingFeedback = card.querySelector('.feedback-erro');
                if (existingFeedback) existingFeedback.remove();

                if (parseInt(selectedValue) === p.correct) {
                    score++;
                    card.style.borderLeft = "5px solid #2ecc71";
                    card.style.backgroundColor = "rgba(46, 204, 113, 0.08)";
                } else {
                    card.style.borderLeft = "5px solid #e74c3c";
                    card.style.backgroundColor = "rgba(231, 76, 60, 0.08)";

                    const feedback = document.createElement('p');
                    feedback.className = 'feedback-erro';
                    feedback.style.color = "#e74c3c";
                    feedback.style.fontWeight = "bold";
                    feedback.style.marginTop = "10px";
                    feedback.textContent = `Incorreto. Resposta certa: ${p.options[p.correct]}`;
                    card.appendChild(feedback);
                }
            });

            // Exibe resultado
            const resultDiv = document.getElementById('result-container');
            const resultScore = document.getElementById('result-score');
            const resultMessage = document.getElementById('result-message');

            resultDiv.style.display = 'block';
            resultScore.textContent = `Você acertou ${score} de ${bancoPerguntas.length}!`;
            
            if (score === bancoPerguntas.length) {
                const nomeCurso = isTecCourse ? 'Informática Básica' : (isCloudCourse ? 'Nuvem' : 'Excel');
                resultMessage.textContent = `Excelente! Você dominou todos os conceitos ambientais de ${nomeCurso}!`;
            } else if (score >= 3) {
                resultMessage.textContent = "Bom trabalho! Continue revisando os conceitos para fixar tudo!";
            } else {
                resultMessage.textContent = "Recomendamos assistir à aula novamente e tentar refazer as atividades.";
            }

            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Troca de aulas
    const aulaItems = document.querySelectorAll('.playlist-sidebar .aula-item');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const summaryList = document.getElementById('summary-list');
    const videoPlayerContainer = document.querySelector('.video-player');

    if (aulaItems.length > 0 && videoPlayerContainer && videoTitle && videoDescription && summaryList) {
        const isCloudCourse = document.body.classList.contains('theme-cloud');
        const isTecCourse = document.body.classList.contains('theme-tec');

        const catalogoExcel = {
            1: {
                titulo: "Aula 01 - Introdução ao Excel",
                videoSrc: "https://www.youtube.com/embed/H1iII84J1GA",
                descricao: "Nesta aula, exploramos como o uso correto de planilhas pode eliminar o fluxo de papel em escritórios, além de introduzir conceitos básicos de organização de dados.",
                resumo: [
                    "<strong>Digitalização no excel:</strong> Entenda como substituir arquivos físicos por planilhas inteligentes.",
                    "<strong>Primeiro contato:</strong> Como abrir seu primeiro arquivo e configurar o salvamento automático na nuvem.",
                    "<strong>Conhecendo a interface:</strong> Conheça as células, colunas e linhas (a base de tudo).",
                    "<strong>Comandos básicos:</strong> Conheça comandos e atalhos básicos dentro do software."
                ]
            },
            2: {
                titulo: "Aula 02 - Planilha de Gastos",
                videoSrc: "https://www.youtube.com/embed/gIcrhE7D3yY",
                descricao: "Nesta aula, aprendemos a construir uma planilha de controle de gastos, aplicando fórmulas básicas e entendendo o impacto da redução de desperdício nos recursos.",
                resumo: [
                    "<strong>Fórmulas Básicas:</strong> Aprenda operações matemáticas como Soma, Subtração, Multiplicação e Divisão.",
                    "<strong>Estoque e Controle:</strong> Como gerenciar recursos e inventário de forma eficiente.",
                    "<strong>Sustentabilidade prática:</strong> Entenda a relação entre a economia de insumos e a redução de perdas financeiras e ambientais."
                ]
            },
            3: {
                titulo: "Aula 03 - Planilha Completa e Dashboards",
                videoSrc: "https://www.youtube.com/embed/n3H5d_iF0tI",
                descricao: "Nesta aula final do módulo, construímos uma planilha completa com gráficos interativos (Dashboards) para visualização clara de indicadores de sustentabilidade.",
                resumo: [
                    "<strong>Gráficos Ambientais:</strong> Como criar representações visuais impactantes de dados de consumo.",
                    "<strong>Dashboards Interativos:</strong> Organização de múltiplos painéis para tomada de decisão eficiente.",
                    "<strong>Conclusão do Módulo:</strong> Consolidação de todo o aprendizado e emissão simbólica do conhecimento."
                ]
            }
        };

        const catalogoCloud = {
            1: {
                titulo: "Aula 01 - O que é Nuvem?",
                videoSrc: "https://www.youtube.com/embed/1C75EDD1qfA",
                descricao: "Nesta aula, compreendemos o conceito de nuvem, suas principais vantagens ambientais e a segurança por trás da desmaterialização.",
                resumo: [
                    "<strong>Conceito de nuvem:</strong> Entenda o que é o armazenamento descentralizado.",
                    "<strong>Vantagens sustentáveis:</strong> Como a nuvem ajuda a diminuir a pegada de carbono.",
                    "<strong>Segurança de dados:</strong> Mitos e verdade sobre a segurança da nuvem."
                ]
            },
            2: {
                titulo: "Aula 02 - Ferramentas",
                videoSrc: "https://www.youtube.com/embed/K7qgIek5P98",
                descricao: "Nesta aula, conhecemos as principais ferramentas do mercado (Google Drive e OneDrive) e como o compartilhamento e colaboração em tempo real reduzem perdas.",
                resumo: [
                    "<strong>Google Drive e OneDrive:</strong> Primeiros passos e configurações recomendadas.",
                    "<strong>Compartilhamento:</strong> Links rápidos no lugar de arquivos de e-mail duplicados.",
                    "<strong>Trabalho colaborativo:</strong> Como trabalhar em equipe em um mesmo documento sem gerar lixo digital."
                ]
            },
            3: {
                titulo: "Aula 03 - Organização",
                videoSrc: "https://www.youtube.com/embed/l592k-G4sX4",
                descricao: "Na última aula, aprendemos a organizar pastas inteligentes na nuvem, garantindo produtividade e sustentabilidade ao extinguir papéis físicos.",
                resumo: [
                    "<strong>Pastas inteligentes:</strong> Criação de fluxos de trabalho desmaterializados.",
                    "<strong>Sincronização automática:</strong> Mantenha seus arquivos sempre seguros na nuvem.",
                    "<strong>Fim dos arquivos físicos:</strong> O passo a passo para a transição digital completa."
                ]
            }
        };

        const catalogoTec = {
            1: {
                titulo: "Aula 01 - Hardware Básico",
                videoSrc: "https://www.youtube.com/embed/3c7bNguY978",
                descricao: "Conheça as peças essenciais do computador, o ciclo de vida do hardware e as práticas para evitar a poluição tecnológica através da redução de lixo eletrônico (e-waste).",
                resumo: [
                    "<strong>Peças do computador:</strong> Conheça os componentes essenciais e o funcionamento básico do PC.",
                    "<strong>Ciclo de vida:</strong> Como a obsolescência programada afeta o planeta.",
                    "<strong>Redução de lixo eletrônico:</strong> Práticas corretas para descarte e reuso de componentes."
                ]
            },
            2: {
                titulo: "Aula 02 - Manutenção e Upgrades",
                videoSrc: "https://www.youtube.com/embed/sN4_qfR_P2U",
                descricao: "Descubra como a manutenção preventiva física e a realização de upgrades estratégicos de SSD e memória RAM estendem a vida útil das máquinas, combatendo o desperdício.",
                resumo: [
                    "<strong>Manutenção Preventiva:</strong> Limpeza física interna para evitar superaquecimento e queima de peças.",
                    "<strong>Upgrades Estratégicos:</strong> Como estender a vida útil do seu PC instalando mais RAM ou um SSD.",
                    "<strong>Combate ao Desperdício:</strong> A importância de consertar e atualizar antes de pensar em descartar."
                ]
            },
            3: {
                titulo: "Aula 03 - Otimização de Software e Energia",
                videoSrc: "https://www.youtube.com/embed/tC-4D2dK2eQ",
                descricao: "Aprenda a otimizar o sistema operacional, configurar planos de energia eficientes e adotar um uso consciente dos recursos para prolongar o hardware e poupar energia elétrica.",
                resumo: [
                    "<strong>Otimização de Software:</strong> Limpeza de arquivos temporários e programas em segundo plano para ganho de desempenho.",
                    "<strong>Eficiência Energética:</strong> Configuração correta de suspensão e hibernação para reduzir consumo de eletricidade.",
                    "<strong>Uso Consciente:</strong> Práticas de desligamento e hábitos que poupam a integridade física dos componentes."
                ]
            }
        };

        const catalogoAulas = isTecCourse ? catalogoTec : (isCloudCourse ? catalogoCloud : catalogoExcel);

        const atualizarPlayerVideo = (videoSrc) => {
            if (!videoSrc) {
                videoPlayerContainer.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted);">Vídeo não disponível</div>`;
                return;
            }

            // Se for link do YouTube (padrão, share link ou embed)
            if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') || videoSrc.includes('embed')) {
                let embedUrl = videoSrc;
                if (!embedUrl.includes('/embed/')) {
                    let videoId = '';
                    if (embedUrl.includes('youtu.be/')) {
                        videoId = embedUrl.split('youtu.be/')[1].split(/[?#]/)[0];
                    } else if (embedUrl.includes('v=')) {
                        videoId = embedUrl.split('v=')[1].split('&')[0];
                    }
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
                videoPlayerContainer.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%; min-height:360px; border-radius:8px;"></iframe>`;
            } else if (videoSrc.endsWith('.mp4')) {
                // Se for arquivo local .mp4
                videoPlayerContainer.innerHTML = `<video id="course-video" controls style="width:100%; height:100%; border-radius:8px;"><source id="video-source" src="${videoSrc}" type="video/mp4"></video>`;
                const courseVideo = document.getElementById('course-video');
                if (courseVideo) {
                    courseVideo.load();
                    courseVideo.play().catch(() => console.log("Play automático suspenso pelo navegador."));
                }
            } else {
                videoPlayerContainer.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted);">Formato de vídeo não suportado</div>`;
            }
        };

        // Carrega o primeiro vídeo ao iniciar a página
        if (catalogoAulas[1]) {
            atualizarPlayerVideo(catalogoAulas[1].videoSrc);
        }

        aulaItems.forEach(item => {
            item.addEventListener('click', () => {
                const aulaId = item.getAttribute('data-aula');
                const aulaData = catalogoAulas[aulaId];

                if (aulaData) {
                    // Atualiza a aula ativa
                    aulaItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');

                    // Esconde a área de questionário se estiver aberta ao trocar de aula
                    if (quizSection) {
                        quizSection.style.display = 'none';
                        const resDiv = document.getElementById('result-container');
                        if (resDiv) resDiv.style.display = 'none';
                    }

                    // Atualiza título e descrição
                    videoTitle.textContent = aulaData.titulo;
                    videoDescription.textContent = aulaData.descricao;

                    // Atualiza o player de vídeo
                    atualizarPlayerVideo(aulaData.videoSrc);

                    // Atualiza a lista de resumos
                    summaryList.innerHTML = aulaData.resumo.map(itemText => `
                        <li style="margin-bottom: 10px; display: flex; align-items: flex-start; gap: 10px;">
                            <span>✔</span> <div>${itemText}</div>
                        </li>
                    `).join('');
                }
            });
        });
    }
});
