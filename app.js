const input = document.querySelector('.input');
const brandButtons = document.querySelectorAll('.brandBtn');
const removalPad = document.querySelector('.removal-pad');
const actionPad = document.querySelector('.action-pad');
const popup = document.querySelector('.popup');

brandButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const brand = button.dataset.brand;

        actionPad.innerHTML = '';

        const buttonRect = e.target.getBoundingClientRect();
        const top = buttonRect.bottom + window.scrollY;
        const left = buttonRect.left + window.scrollX;

        actionPad.style.position = 'absolute';
        actionPad.style.top = `${top}px`;
        actionPad.style.left = `${left}px`;
        actionPad.style.display = 'block';

        // Проверяем, является ли бренд вендором (например, VENDOR1, VENDOR2, ...)
        const isVendorGroup = /^VENDOR\d+$/.test(brand); // Регулярное выражение для проверки "VENDOR" + число
        const filterPrefix = isVendorGroup ? 'vendor' : 'mark';

        const addButton = document.createElement('button');
        addButton.textContent = `+`;
        addButton.style.color = 'white';
        addButton.style.backgroundColor = 'green';

        addButton.addEventListener('click', () => {
            const filter = `catalog_filter=${filterPrefix}%3D${brand.toUpperCase()}&`;
            input.value += filter;

            const removeButton = document.createElement('button');
            removeButton.textContent = `${brand}`;
            removeButton.style.color = 'white';
            removeButton.style.backgroundColor = 'green';
            removeButton.addEventListener('click', () => {
                input.value = input.value.replace(filter, '');
                removalPad.removeChild(removeButton);
                brandButtons.forEach(btn => {
                    if (btn.dataset.brand === brand) {
                        btn.disabled = false;
                    }
                });
                actionPad.innerHTML = '';
            });
            removalPad.appendChild(removeButton);

            brandButtons.forEach(btn => {
                if (btn.dataset.brand === brand) {
                    btn.disabled = true;
                    addButton.disabled = true;
                    excludeButton.disabled = true;
                }
            });
        });

        const excludeButton = document.createElement('button');
        excludeButton.textContent = `-`;
        excludeButton.style.color = 'white';
        excludeButton.style.backgroundColor = 'red';

        excludeButton.addEventListener('click', () => {
            const filter = `exclude_catalog_filter=${filterPrefix}%3D${brand.toUpperCase()}&`;
            input.value += filter;

            const removeButton = document.createElement('button');
            removeButton.textContent = `${brand}`;
            removeButton.style.color = 'white';
            removeButton.style.backgroundColor = 'red';
            removeButton.addEventListener('click', () => {
                input.value = input.value.replace(filter, '');
                removalPad.removeChild(removeButton);
                brandButtons.forEach(btn => {
                    if (btn.dataset.brand === brand) {
                        btn.disabled = false;
                    }
                });
                actionPad.innerHTML = '';
            });
            removalPad.appendChild(removeButton);

            brandButtons.forEach(btn => {
                if (btn.dataset.brand === brand) {
                    btn.disabled = true;
                    addButton.disabled = true;
                    excludeButton.disabled = true;
                }
            });
        });

        actionPad.appendChild(addButton);
        actionPad.appendChild(excludeButton);
    });
});

input.addEventListener('click', () => {
    input.select();

    navigator.clipboard.writeText(input.value).then(() => {
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 1500);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
});
