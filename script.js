// ==UserScript==
// @name         Slimd Auto Spammer
// @namespace    http://local.skribbl.cheat
// @version      5.5
// @description  Slimd panel with auto spammer for Skribbl.io
// @author       You
// @match        *://skribbl.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){
    'use strict';

    const pageFont = window.getComputedStyle(document.body).fontFamily || 'sans-serif';
    const slimdGifURL = 'https://raw.githubusercontent.com/Kaisen-Tech/SkribblSlimd/refs/heads/main/slimd2.gif';

    // === LOGO INJECTOR ===
    function addSlimdLogo() {
        const logoContainer = document.querySelector('.logo-big');
        if (logoContainer && !document.getElementById('slimd-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.id = 'slimd-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.style.marginTop = '10px';

            const text = document.createElement('span');
            text.textContent = 'Slimd';
            text.style.fontSize = '24px';
            text.style.fontWeight = 'bold';
            text.style.color = '#fff';
            text.style.marginRight = '10px';

            const gif = document.createElement('img');
            gif.src = slimdGifURL;
            gif.style.height = '40px';

            wrapper.appendChild(text);
            wrapper.appendChild(gif);
            logoContainer.parentNode.insertBefore(wrapper, logoContainer.nextSibling);
        }
    }

    addSlimdLogo();

    // === STARTUP ALERT ===
    function isChromebook() {
        return /CrOS/.test(navigator.userAgent);
    }

    function showStartupAlert() {
        const eggOn = localStorage.getItem('slimd_egg_enabled') !== 'false'; // default ON
        if (isChromebook() && eggOn) {
            alert('October 31, 2018. The Shibuya Incident.');
        } else {
            alert('Slimd successfully started!');
        }
    }

    showStartupAlert();

    // === CONSOLE ASCII ART ===
    console.log(
        '%c███████╗██╗  ██╗██████╗ ██╗██████╗ ██████╗ ██╗     \n' +
        '██╔════╝██║ ██╔╝██╔══██╗██║██╔══██╗██╔══██╗██║     \n' +
        '███████╗█████╔╝ ██████╔╝██║██████╔╝██████╔╝██║     \n' +
        '╚════██║██╔═██╗ ██╔══██╗██║██╔══██╗██╔══██╗██║     \n' +
        '███████║██║  ██╗██║  ██║██║██████╔╝██████╔╝███████╗\n' +
        '╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝\n' +
        '%c  ██████  ██▓     ██▓ ███▄ ▄███▓▓█████▄ \n' +
        '▒██    ▒ ▓██▒    ▓██▒▓██▒▀█▀ ██▒▒██▀ ██▌\n' +
        '░ ▓██▄   ▒██░    ▒██▒▓██    ▓██░░██   █▌\n' +
        '  ▒   ██▒▒██░    ░██░▒██    ▒██ ░▓█▄   ▌\n' +
        '▒██████▒▒░██████▒░██░▒██▒   ░██▒░▒████▓ \n' +
        '▒ ▒▓▒ ▒ ░░ ▒░▓  ░░▓  ░ ▒░   ░  ░ ▒▒▓  ▒ \n' +
        '░ ░▒  ░ ░░ ░ ▒  ░ ▒ ░░  ░      ░ ░ ▒  ▒ \n' +
        '░  ░  ░    ░ ░    ▒ ░░      ░    ░ ░  ░ \n' +
        '      ░      ░  ░ ░         ░      ░    \n' +
        '                                 ░      ',
        'color: #ffffff; font-family: monospace;',
        'color: #00b450; font-family: monospace;'
    );

    // === MINI ICON ===
    const miniIcon = document.createElement('div');
    Object.assign(miniIcon.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        cursor: 'move',
        zIndex: '9999',
        backgroundImage: `url(${slimdGifURL})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '5px'
    });

    document.body.appendChild(miniIcon);

    let miniDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    miniIcon.addEventListener('mousedown', e => {
        miniDragging = true;
        offsetX = e.clientX - miniIcon.offsetLeft;
        offsetY = e.clientY - miniIcon.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mouseup', () => miniDragging = false);

    document.addEventListener('mousemove', e => {
        if (!miniDragging) return;
        miniIcon.style.left = (e.clientX - offsetX) + 'px';
        miniIcon.style.top = (e.clientY - offsetY) + 'px';
    });

    // === MAIN PANEL ===
    const panel = document.createElement('div');

    Object.assign(panel.style, {
        position: 'fixed',
        top: '50px',
        right: '50px',
        width: '400px',
        height: '210px',
        backgroundImage: 'url(https://skribbl.io/img/background.png)',
        backgroundSize: 'cover',
        color: 'black',
        fontFamily: pageFont,
        fontSize: '14px',
        borderRadius: '10px',
        padding: '10px',
        zIndex: '999999',
        boxShadow: '0 0 12px black',
        overflow: 'hidden'
    });

    const tint = document.createElement('div');
    Object.assign(tint.style, {
        position: 'absolute',
        inset: '0',
        backgroundColor: 'rgba(0, 180, 80, 1)',
        mixBlendMode: 'color',
        pointerEvents: 'none',
        zIndex: '0',
        borderRadius: '10px'
    });
    panel.appendChild(tint);

    const content = document.createElement('div');
    Object.assign(content.style, {
        position: 'relative',
        zIndex: '1'
    });
    panel.appendChild(content);

    document.body.appendChild(panel);
    panel.style.display = 'none';

    // === HEADER ===
    const header = document.createElement('div');
    Object.assign(header.style, {
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
    });

    const icon = document.createElement('img');
    icon.src = slimdGifURL;
    Object.assign(icon.style, {
        width: '24px',
        height: '24px',
        marginRight: '5px'
    });
    header.appendChild(icon);

    const title = document.createElement('span');
    title.innerText = 'Slimd';
    title.style.color = 'black';
    header.appendChild(title);

    const minBtn = document.createElement('button');
    Object.assign(minBtn.style, {
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer'
    });
    const minBtnIcon = document.createElement('img');
    minBtnIcon.src = 'https://skribbl.io/img/setting_6.gif';
    Object.assign(minBtnIcon.style, {
        width: '20px',
        height: '10px',
        filter: 'brightness(0)'
    });
    minBtn.appendChild(minBtnIcon);
    minBtn.onclick = () => {
        panel.style.display = 'none';
        miniIcon.style.display = 'block';
    };
    header.appendChild(minBtn);
    content.appendChild(header);

    // === TABS ===
    const tabBar = document.createElement('div');
    Object.assign(tabBar.style, {
        display: 'flex',
        gap: '5px',
        marginBottom: '8px'
    });

    function makeTab(label) {
        const btn = document.createElement('button');
        btn.textContent = label;
        Object.assign(btn.style, {
            cursor: 'pointer',
            color: 'black',
            fontWeight: 'bold',
            padding: '2px 10px',
            borderRadius: '5px',
            border: '1px solid black',
            background: 'rgba(255,255,255,0.3)'
        });
        return btn;
    }

    const tabSpammer = makeTab('Spammer');
    const tabHat = makeTab('Hat Picker');
    const tabSettings = makeTab('Settings');
    tabBar.appendChild(tabSpammer);
    tabBar.appendChild(tabHat);
    tabBar.appendChild(tabSettings);
    content.appendChild(tabBar);

    // === SPAMMER TAB ===
    const spammerPane = document.createElement('div');

    const msgInput = document.createElement('input');
    msgInput.placeholder = 'Message';
    msgInput.style.width = '60%';
    msgInput.style.color = 'black';
    spammerPane.appendChild(msgInput);

    const intervalInput = document.createElement('input');
    intervalInput.type = 'number';
    intervalInput.placeholder = 'Interval ms';
    intervalInput.style.width = '25%';
    intervalInput.style.marginLeft = '5px';
    intervalInput.style.color = 'black';
    spammerPane.appendChild(intervalInput);

    spammerPane.appendChild(document.createElement('br'));
    spammerPane.appendChild(document.createElement('br'));

    const statusText = document.createElement('div');
    statusText.textContent = 'Selected Input: None';
    statusText.style.color = 'black';
    statusText.style.marginBottom = '8px';
    spammerPane.appendChild(statusText);

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    startBtn.style.color = 'black';
    spammerPane.appendChild(startBtn);

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    stopBtn.style.marginLeft = '5px';
    stopBtn.style.color = 'black';
    spammerPane.appendChild(stopBtn);

    content.appendChild(spammerPane);

    // === HAT PICKER TAB ===
    const hatPane = document.createElement('div');
    hatPane.style.display = 'none';

    const hatLabel = document.createElement('div');
    hatLabel.textContent = 'Enter hat index (0–28):';
    hatLabel.style.color = 'black';
    hatLabel.style.marginBottom = '6px';
    hatPane.appendChild(hatLabel);

    const hatInput = document.createElement('input');
    hatInput.type = 'number';
    hatInput.min = '0';
    hatInput.max = '28';
    hatInput.placeholder = '0 - 28';
    hatInput.style.width = '80px';
    hatInput.style.color = 'black';
    hatPane.appendChild(hatInput);

    const hatApplyBtn = document.createElement('button');
    hatApplyBtn.textContent = 'Apply';
    hatApplyBtn.style.marginLeft = '8px';
    hatApplyBtn.style.color = 'black';
    hatPane.appendChild(hatApplyBtn);

    const hatRemoveBtn = document.createElement('button');
    hatRemoveBtn.textContent = 'Remove Hat';
    hatRemoveBtn.style.marginLeft = '8px';
    hatRemoveBtn.style.color = 'black';
    hatPane.appendChild(hatRemoveBtn);

    const hatNote = document.createElement('div');
    hatNote.textContent = '⚠️ This only shows for you. Page will refresh.';
    Object.assign(hatNote.style, {
        color: 'black',
        fontSize: '11px',
        marginTop: '8px',
        opacity: '0.85'
    });
    hatPane.appendChild(hatNote);

    content.appendChild(hatPane);

    // === SETTINGS TAB ===
    const settingsPane = document.createElement('div');
    settingsPane.style.display = 'none';

    const eggLabel = document.createElement('div');
    eggLabel.textContent = 'Chromebook startup easter egg:';
    eggLabel.style.color = 'black';
    eggLabel.style.marginBottom = '6px';
    settingsPane.appendChild(eggLabel);

    const eggToggleBtn = document.createElement('button');
    eggToggleBtn.style.color = 'black';
    eggToggleBtn.style.cursor = 'pointer';
    settingsPane.appendChild(eggToggleBtn);

    const eggNote = document.createElement('div');
    eggNote.textContent = 'When enabled, the startup message on Chromebooks is replaced with an easter egg instead of the normal "Slimd successfully started!" message.';
    Object.assign(eggNote.style, {
        color: 'black',
        fontSize: '11px',
        marginTop: '8px',
        opacity: '0.85'
    });
    settingsPane.appendChild(eggNote);

    content.appendChild(settingsPane);

    function isEggEnabled() {
        return localStorage.getItem('slimd_egg_enabled') !== 'false'; // default ON
    }

    function setEggEnabled(val) {
        localStorage.setItem('slimd_egg_enabled', val ? 'true' : 'false');
        refreshEggButton();
    }

    function refreshEggButton() {
        eggToggleBtn.textContent = isEggEnabled() ? 'Disable Easter Egg' : 'Enable Easter Egg';
    }

    eggToggleBtn.onclick = () => setEggEnabled(!isEggEnabled());
    refreshEggButton();

    // === TAB SWITCHING ===
    function setActiveTab(tab) {
        spammerPane.style.display = tab === 'spammer' ? 'block' : 'none';
        hatPane.style.display = tab === 'hat' ? 'block' : 'none';
        settingsPane.style.display = tab === 'settings' ? 'block' : 'none';

        tabSpammer.style.background = tab === 'spammer' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)';
        tabHat.style.background = tab === 'hat' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)';
        tabSettings.style.background = tab === 'settings' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)';

        if (tab === 'spammer') panel.style.height = '210px';
        else if (tab === 'hat') panel.style.height = '175px';
        else panel.style.height = '190px';
    }

    tabSpammer.onclick = () => setActiveTab('spammer');
    tabHat.onclick = () => setActiveTab('hat');
    tabSettings.onclick = () => setActiveTab('settings');
    setActiveTab('spammer');

    // === DRAG ===
    let dragging = false;
    let offsetX2 = 0;
    let offsetY2 = 0;

    header.addEventListener('mousedown', e => {
        dragging = true;
        offsetX2 = e.clientX - panel.offsetLeft;
        offsetY2 = e.clientY - panel.offsetTop;
    });

    document.addEventListener('mouseup', () => dragging = false);

    document.addEventListener('mousemove', e => {
        if (!dragging) return;
        panel.style.left = (e.clientX - offsetX2) + 'px';
        panel.style.top = (e.clientY - offsetY2) + 'px';
    });

    // === HAT LOGIC ===
    function applyHat(index) {
        try {
            let avatar = JSON.parse(localStorage.getItem('ava'));

            if (!Array.isArray(avatar)) {
                avatar = [0, 0, 0, 0];
            }

            avatar[3] = Math.max(-1, Math.min(28, index));
            localStorage.setItem('ava', JSON.stringify(avatar));
            console.log(`Hat ${index} applied!`);
            return true;
        } catch(e) {
            console.error('Hat apply failed:', e);
            return false;
        }
    }

    hatApplyBtn.onclick = () => {
        const val = parseInt(hatInput.value);
        if (isNaN(val) || val < 0 || val > 28) {
            alert('Enter a number between 0 and 28.');
            return;
        }

        const ok = applyHat(val);
        if (ok) {
            hatNote.textContent = `✅ Hat ${val} applied! Refreshing...`;
            setTimeout(() => location.reload(), 1000);
        } else {
            hatNote.textContent = '❌ Failed — try refreshing manually.';
        }
    };

    hatRemoveBtn.onclick = () => {
        const ok = applyHat(-1);
        if (ok) {
            hatNote.textContent = '✅ Hat removed! Refreshing...';
            setTimeout(() => location.reload(), 1000);
        } else {
            hatNote.textContent = '❌ Failed — try refreshing manually.';
        }
    };

    hatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') hatApplyBtn.click();
    });

    // === SPAMMER LOGIC ===
    let selectedInput = null;
    let spamInterval = null;

    document.addEventListener('click', e => {
        if (
            e.target instanceof HTMLInputElement &&
            !panel.contains(e.target)
        ) {
            selectedInput = e.target;
            statusText.textContent = 'Selected Input: ✓';
        }
    }, true);

    function sendMessage(msg) {
        if (!selectedInput) return;

        selectedInput.focus();

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(selectedInput, msg);

        selectedInput.dispatchEvent(new Event('input', { bubbles: true }));

        selectedInput.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'Enter', code: 'Enter',
                keyCode: 13, which: 13, bubbles: true
            })
        );
        selectedInput.dispatchEvent(
            new KeyboardEvent('keypress', {
                key: 'Enter', code: 'Enter',
                keyCode: 13, which: 13, bubbles: true
            })
        );
        selectedInput.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Enter', code: 'Enter',
                keyCode: 13, which: 13, bubbles: true
            })
        );
    }

    startBtn.onclick = () => {
        const msg = msgInput.value;
        const interval = parseInt(intervalInput.value);

        if (!msg) { alert('Enter a message.'); return; }
        if (isNaN(interval) || interval < 50) { alert('Enter an interval >= 50ms.'); return; }
        if (!selectedInput) { alert('Click the chat input first.'); return; }

        if (interval < 1500) {
            const proceed = confirm('⚠️ Intervals under 1500ms may get you auto-kicked for spamming. Continue anyway?');
            if (!proceed) return;
        }

        clearInterval(spamInterval);
        spamInterval = setInterval(() => sendMessage(msg), interval);
    };

    stopBtn.onclick = () => {
        clearInterval(spamInterval);
        spamInterval = null;
    };

    miniIcon.onclick = () => {
        panel.style.display = 'block';
        miniIcon.style.display = 'none';
    };

})();
