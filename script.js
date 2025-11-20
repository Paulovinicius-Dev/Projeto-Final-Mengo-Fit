document.addEventListener('DOMContentLoaded', () => {

    
    // Funcionalidade do carrossel 
    
    const track = document.getElementById('carouselTrack');
    if (track) {
        const slides = Array.from(track.children);
        const dotsContainer = document.getElementById('carouselDots');
        const dots = Array.from(dotsContainer.children);
        let slideIndex = 0;
        const intervalTime = 5000; 
        const moveToSlide = (targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.offsetLeft + 'px)';
            slideIndex = slides.indexOf(targetSlide);
        };

        // Função para atualizar os pontos de navegação

        const updateDots = (targetIndex) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[targetIndex].classList.add('active');
        };

        // Função principal de Mudar foto automaticamente 

        const nextSlide = () => {
            const totalSlides = slides.length;
            let nextIndex = (slideIndex + 1) % totalSlides;
            
            const nextSlideElement = slides[nextIndex];
            
            moveToSlide(nextSlideElement);
            updateDots(nextIndex);
        };

        // Navegação pelos Pontos (Dots)

        dotsContainer.addEventListener('click', e => {
            if (!e.target.matches('.dot')) return;
            const targetDot = e.target;
            const targetIndex = parseInt(targetDot.getAttribute('data-slide')); 
            const targetSlide = slides[targetIndex];
            moveToSlide(targetSlide);
            updateDots(targetIndex);

            // Reinicia o intervalo após navegação manual

            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, intervalTime);
        });

        // Inicia o avanço automático

        let autoSlideInterval = setInterval(nextSlide, intervalTime);
    }
    

    // CALCULADORA DE IMC

    const formIMC = document.getElementById('formIMC');
    const resultadoIMC = document.getElementById('resultadoIMC');

    // Função para calcular e classificar o IMC

    function calcularIMC(peso, altura) {
        if (peso > 0 && altura > 0) {
            const imc = peso / (altura * altura);
            const imcArredondado = imc.toFixed(2);
            
            let classificacao = '';

            // Tabela de Classificação IMC 

            if (imc < 18.5) {
                classificacao = '<span style="color: red;">Abaixo do peso 😥</span>';
            } else if (imc >= 18.5 && imc <= 24.9) {
                classificacao = '<span style="color: green;">Peso normal 😉</span>';
            } else if (imc >= 25 && imc <= 29.9) {
                classificacao = '<span style="color: orange;">Sobrepeso 😟</span>';
            } else if (imc >= 30 && imc <= 34.9) {
                classificacao = '<span style="color: red;">Obesidade Grau I 😔</span>';
            } else if (imc >= 35 && imc <= 39.9) {
                classificacao = '<span style="color: red;">Obesidade Grau II (severa) 🥺</span>';
            } else {
                classificacao = '<span style="color: red;">Obesidade Grau III (mórbida) 😭</span>';
            }

            return `Seu IMC é <strong>${imcArredondado}</strong>. Classificação: <strong>${classificacao}</strong>`;

        } else {
            return 'Por favor, insira valores válidos para peso e altura.';
        }
    }

    // Envio do formulário
    if (formIMC) {
        formIMC.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const objetivo = document.getElementById('objetivo').value;
            
            const resultadoTexto = calcularIMC(peso, altura);
            
            // Adiciona a mensagem depois da escolha do objetivo do usuário 

            let mensagemObjetivo = '';
            if (objetivo) {
                switch (objetivo) {
                    case 'perder':
                        mensagemObjetivo = '<br>Seu foco é **Perder Peso**. Consulte nossos planos Plus/Premium para acompanhamento de aulas e personal!';
                        break;
                    case 'ganhar':
                        mensagemObjetivo = '<br>Seu foco é **Ganhar Massa Muscular**. O Plano Premium com Personal Trainer é o mais indicado!';
                        break;
                    case 'saude':
                        mensagemObjetivo = '<br>Seu foco é **Saúde e Bem-Estar**. Nossas aulas de Yoga e Pilates são perfeitas para você!';
                        break;
                }
            }
            
            // Atualiza o div de resultado
            resultadoIMC.innerHTML = resultadoTexto + mensagemObjetivo;
        });
    }

    // Rolagem mais suave 

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});