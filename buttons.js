export const createActionButton = (text, color, backgroundColor, callback) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.color = color;
    button.style.backgroundColor = backgroundColor;
    button.addEventListener('click', callback);
    return button;
};

export const createRemoveButton = (brand, buttonText, color, backgroundColor, filter, input, removalPad, buttonPad, actionPad) => {
    const removeButton = document.createElement('button');
    removeButton.textContent = buttonText;
    removeButton.style.color = color;
    removeButton.style.backgroundColor = backgroundColor;
    removeButton.addEventListener('click', () => {
        input.value = input.value.replace(filter, '');
        removalPad.removeChild(removeButton);
        const brandButtons = buttonPad.querySelectorAll('.brandBtn');
        brandButtons.forEach(btn => {
            if (btn.dataset.brand === brand) btn.disabled = false;
        });
        actionPad.innerHTML = '';
    });
    return removeButton;
};
