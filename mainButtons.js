export const createOpenLinkButton = (input) => {
    const openLinkButton = document.createElement('button');
    
    const icon = document.createElement('img');
    icon.src = './search.svg';
    icon.alt = 'Открыть ссылку';
    icon.style.width = '50px';
    icon.style.height = '50px';
    
    openLinkButton.appendChild(icon);
    
    openLinkButton.addEventListener('click', () => {
        const url = input.value.trim();
        window.open(url, '_blank');
    });

    return openLinkButton;
};

export const createResetButton = (input, removalPad) => {
    const resetButton = document.createElement('button');

    const icon = document.createElement('img');
    icon.src = './eraser.svg';
    icon.alt = 'Сбросить';
    icon.style.width = '50px';
    icon.style.height = '50px';
    
    resetButton.appendChild(icon);

    resetButton.addEventListener('click', () => {
        input.value = 'https://auto.ru/cars/used/?';
        removalPad.innerHTML = '';
        const brandButtons = document.querySelectorAll('.brandBtn');
        brandButtons.forEach(button => button.disabled = false);
    });

    return resetButton;
};
