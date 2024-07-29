// ==UserScript==
// @name         ACRYPTOMINER
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Clique automático em botões com texto "CLAIM" com intervalo inicial de 5 segundos e depois a cada 3 minutos. Redireciona página específica.
// @author       Potsu
// @match        https://acryptominer.io/*
// @icon         https://i.pinimg.com/564x/39/a6/f1/39a6f16e8d34f95b80f262f2ded31a8a.jpg
// @grant        none
// ==/UserScript==

(function() {
    function createBanner() {
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.bottom = '20px';
        banner.style.left = '20px';
        banner.style.padding = '10px';
        banner.style.background = 'linear-gradient(135deg, #2980b9, #f39c12)';
        banner.style.backgroundSize = '200% 200%';
        banner.style.color = '#ecf0f1';
        banner.style.borderRadius = '8px';
        banner.style.zIndex = '9999';
        banner.style.display = 'flex';
        banner.style.flexDirection = 'column';
        banner.style.alignItems = 'center';
        banner.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        banner.style.fontFamily = "'Roboto', sans-serif";
        banner.style.animation = 'gradientBG 6s ease infinite';
        banner.style.width = '250px';
        banner.style.textAlign = 'center';

        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/potisu';
        githubLink.target = '_blank';
        githubLink.style.textDecoration = 'none';
        githubLink.style.color = '#ecf0f1';
        githubLink.style.display = 'flex';
        githubLink.style.alignItems = 'center';
        githubLink.style.backgroundColor = '#2980b9';
        githubLink.style.padding = '5px';
        githubLink.style.borderRadius = '8px';
        githubLink.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        githubLink.style.transition = 'background-color 0.3s, transform 0.3s';
        githubLink.style.marginBottom = '10px';

        githubLink.addEventListener('mouseover', () => {
            githubLink.style.backgroundColor = '#1f65a1';
            githubLink.style.transform = 'scale(1.05)';
        });
        githubLink.addEventListener('mouseout', () => {
            githubLink.style.backgroundColor = '#2980b9';
            githubLink.style.transform = 'scale(1)';
        });

        const githubIcon = document.createElement('img');
        githubIcon.src = 'https://cdn-icons-png.flaticon.com/512/25/25657.png';
        githubIcon.style.width = '24px';
        githubIcon.style.height = '24px';
        githubIcon.style.marginRight = '8px';
        githubIcon.style.backgroundColor = 'transparent';

        const githubText = document.createElement('span');
        githubText.textContent = 'PotsuDEV';
        githubText.style.fontSize = '16px';
        githubText.style.fontWeight = 'bold';
        githubText.style.background = 'linear-gradient(135deg, #2980b9, #f39c12)';
        githubText.style.webkitBackgroundClip = 'text';
        githubText.style.webkitTextFillColor = 'transparent';
        githubText.style.padding = '0 5px';

        githubLink.appendChild(githubIcon);
        githubLink.appendChild(githubText);

        const timerDisplay = document.createElement('div');
        timerDisplay.textContent = '00min e 00 sec';
        timerDisplay.style.fontSize = '36px';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.color = '#ecf0f1';
        timerDisplay.style.marginBottom = '8px';
        timerDisplay.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';

        const scriptStatus = document.createElement('div');
        scriptStatus.textContent = 'Script em funcionamento';
        scriptStatus.style.fontSize = '12px';
        scriptStatus.style.color = '#ecf0f1';
        scriptStatus.style.display = 'flex';
        scriptStatus.style.alignItems = 'center';
        scriptStatus.style.marginTop = '4px';

        const gearIcon = document.createElement('span');
        gearIcon.textContent = '⚙️';
        gearIcon.style.fontSize = '16px';
        gearIcon.style.animation = 'spin 2s linear infinite';
        gearIcon.style.marginLeft = '5px';
        gearIcon.style.color = '#ecf0f1';
        gearIcon.style.textShadow = '0 0 6px rgba(255, 255, 255, 0.8)';

        scriptStatus.appendChild(gearIcon);

        banner.appendChild(githubLink);
        banner.appendChild(timerDisplay);
        banner.appendChild(scriptStatus);

        document.body.appendChild(banner);

        return timerDisplay;
    }

    function removeTelegramBanner() {
        const telegramBanner = document.querySelector('a[href="https://t.me/+Mns6IsONSxliZDkx"]');
        if (telegramBanner) {
            telegramBanner.remove();
        }
    }

    const styles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes gradientBG {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    function updateTimer(timerDisplay) {
        setInterval(function() {
            let currentTime = new Date();
            let timeDifference = currentTime - getStartTime();
            let seconds = Math.floor((timeDifference / 1000) % 60);
            let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            let timeText = `${minutes}min e ${seconds} sec`;
            if (hours > 0) {
                timeText = `${hours}h ${minutes}min e ${seconds} sec`;
            }
            timerDisplay.textContent = timeText;
        }, 1000);
    }

    function initScript() {
        if (window.location.href === "https://acryptominer.io/user/dashboard") {
            window.location.href = "https://acryptominer.io/user/shortlink";
            return;
        }

        setStartTime(getStartTime());
        handleAutologinAndAutoshorts();
        const timerDisplay = createBanner();
        removeTelegramBanner();
        clickRandomClaimButton();
        updateTimer(timerDisplay);

        setTimeout(() => {
            clickRandomClaimButton();
            setInterval(clickRandomClaimButton, 3 * 60 * 1000);
        }, 5000);

        setInterval(() => {
            console.log('Atualizando a página...');
            window.location.reload();
        }, 5 * 60 * 1000);
    }

    window.addEventListener('load', initScript);

    function getStartTime() {
        const storedTime = localStorage.getItem('startTime');
        return storedTime ? new Date(storedTime) : new Date();
    }

    function setStartTime(startTime) {
        if (!localStorage.getItem('startTime')) {
            localStorage.setItem('startTime', startTime.toISOString());
        }
    }

    function handleAutologinAndAutoshorts() {
        // Implement your autologin and autoshorts logic here
    }

    function clickRandomClaimButton() {
        var botoes = document.querySelectorAll('button');
        var botoesClaim = Array.from(botoes).filter(function(botao) {
            return botao.textContent.trim().toUpperCase() === 'CLAIM';
        });

        if (botoesClaim.length > 0) {
            var indiceAleatorio = Math.floor(Math.random() * botoesClaim.length);
            var botaoAleatorio = botoesClaim[indiceAleatorio];
            botaoAleatorio.click();
            console.log('Botão CLAIM clicado:', botaoAleatorio);
        }
    }

    function removerCartoes() {
        var cartoes = document.querySelectorAll('div[class="col-md-4"]');
        cartoes.forEach(function(cartao) {
            var textoCartao = cartao.innerText;
            if (textoCartao.includes("EARNOW") ||
                textoCartao.includes("Revcut") ||
                textoCartao.includes("Shrinkme") ||
                textoCartao.includes("Shrinkearn") ||
                textoCartao.includes("CLKS") ||
                textoCartao.includes("1212") ||
                textoCartao.includes("RSSHORT") ||
                textoCartao.includes("FOODSHORT") ||
                textoCartao.includes("FC.LC")) {
                cartao.style.display = "none";
            }
        });
    }
    removerCartoes();
})();
