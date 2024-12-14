import { brandData } from './brands.js';
import { createActionButton, createRemoveButton } from './buttons.js';
import { createOpenLinkButton, createResetButton } from './mainButtons.js';

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    if (!wrapper) {
        console.error('wrapper не найден в DOM');
        return;
    }

    const removalPad = document.createElement('div');
    removalPad.classList.add('removal-pad');
    wrapper.appendChild(removalPad);

    const buttonPad = document.createElement('div');
    buttonPad.classList.add('buttonPad');
    wrapper.appendChild(buttonPad);

    const actionPad = document.createElement('div');
    actionPad.classList.add('action-pad');
    wrapper.appendChild(actionPad);

    const input = document.querySelector('.input');
    const popup = document.querySelector('.popup');
    const mainButtons = document.querySelector('.main-buttons');

    const resetButton = createResetButton(input, removalPad);
    const openLinkButton = createOpenLinkButton(input);
    mainButtons.appendChild(resetButton);
    mainButtons.appendChild(openLinkButton);

    // Создание кнопок брендов
    brandData.forEach(({ name, brand, special }) => {
        const button = document.createElement('button');
        button.classList.add('brandBtn');
        button.textContent = name;
        button.dataset.brand = brand;
        if (special) button.id = "secretVendor";
        buttonPad.appendChild(button);
    });

    // Добавление событий кнопок
    const brandButtons = buttonPad.querySelectorAll('.brandBtn');
    brandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const brand = button.dataset.brand;
            const isVendorGroup = /^VENDOR\d+$/.test(brand);
            const filterPrefix = isVendorGroup ? 'vendor' : 'mark';
            const filterBase = `${filterPrefix}%3D${brand.toUpperCase()}&`;

            actionPad.innerHTML = '';
            const { bottom, left } = e.target.getBoundingClientRect();
            const buttonText = e.target.textContent;
            actionPad.style.position = 'absolute';
            actionPad.style.top = `${bottom + window.scrollY}px`;
            actionPad.style.left = `${left + window.scrollX}px`;
            actionPad.style.display = 'block';

            const addButton = createActionButton('+', 'white', 'green', () => {
                const filter = `catalog_filter=${filterBase}`;
                input.value += filter;
                const removeButton = createRemoveButton(brand, buttonText, 'white', 'green', filter, input, removalPad, buttonPad, actionPad);
                removalPad.appendChild(removeButton);
                button.disabled = true;
                actionPad.innerHTML = '';
            });

            const excludeButton = createActionButton('-', 'white', 'red', () => {
                const filter = `exclude_catalog_filter=${filterBase}`;
                input.value += filter;
                const removeButton = createRemoveButton(brand, buttonText, 'white', 'red', filter, input, removalPad, buttonPad, actionPad);
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
        });
    });
});


