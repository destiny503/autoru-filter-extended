const input = document.querySelector('.input');
const brandButtons = document.querySelectorAll('.brandBtn');
const removalPad = document.querySelector('.removal-pad');
const actionPad = document.querySelector('.action-pad');
const popup = document.querySelector('.popup');

const createActionButton = (text, color, backgroundColor, callback) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.color = color;
    button.style.backgroundColor = backgroundColor;
    button.addEventListener('click', callback);
    return button;
};

const createRemoveButton = (brand, color, backgroundColor, filter) => {
    const removeButton = document.createElement('button');
    removeButton.textContent = brand;
    removeButton.style.color = color;
    removeButton.style.backgroundColor = backgroundColor;
    removeButton.addEventListener('click', () => {
        input.value = input.value.replace(filter, '');
        removalPad.removeChild(removeButton);
        brandButtons.forEach(btn => {
            if (btn.dataset.brand === brand) btn.disabled = false;
        });
        actionPad.innerHTML = '';
    });
    return removeButton;
};

brandButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const brand = button.dataset.brand;
        const isVendorGroup = /^VENDOR\d+$/.test(brand);
        const filterPrefix = isVendorGroup ? 'vendor' : 'mark';
        const filterBase = `${filterPrefix}%3D${brand.toUpperCase()}&`;

        // Очистка и позиционирование actionPad
        actionPad.innerHTML = '';
        const { bottom, left } = e.target.getBoundingClientRect();
        actionPad.style.position = 'absolute';
        actionPad.style.top = `${bottom + window.scrollY}px`;
        actionPad.style.left = `${left + window.scrollX}px`;
        actionPad.style.display = 'block';

        // Создание кнопок
        const addButton = createActionButton('+', 'white', 'green', () => {
            const filter = `catalog_filter=${filterBase}`;
            input.value += filter;
            const removeButton = createRemoveButton(brand, 'white', 'green', filter);
            removalPad.appendChild(removeButton);
            button.disabled = true;
            actionPad.innerHTML = '';
        });

        const excludeButton = createActionButton('-', 'white', 'red', () => {
            const filter = `exclude_catalog_filter=${filterBase}`;
            input.value += filter;
            const removeButton = createRemoveButton(brand, 'white', 'red', filter);
            removalPad.appendChild(removeButton);
            button.disabled = true;
            actionPad.innerHTML = '';
        });

        actionPad.appendChild(addButton);
        actionPad.appendChild(excludeButton);
    });
});

input.addEventListener('click', () => {
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        popup.style.display = 'block';
        setTimeout(() => popup.style.display = 'none', 1500);
    }).catch(err => console.error('Ошибка копирования: ', err));
});
