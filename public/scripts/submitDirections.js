document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-direction').addEventListener('click', function() {
        addDirection();
    });
});

function addDirection() {
    const directionsList = document.querySelector('.directions-list');
    const directionNumber = directionsList.children.length + 1;
    const newDirection = createDirection(directionNumber);
    directionsList.appendChild(newDirection);
}

function createDirection(number) {
    const directionDiv = document.createElement('div');
    directionDiv.className = 'direction';
    directionDiv.setAttribute('data-step', number);

    const label = document.createElement('label');
    label.setAttribute('for', `direction-${number}`);
    label.textContent = `Step ${number}:`;

    const textarea = document.createElement('textarea');
    textarea.id = `direction-${number}`;
    textarea.name = 'directions[]';
    textarea.required = true;
    textarea.placeholder = 'Describe this step...';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-direction';
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
        directionDiv.remove();
        updateDirectionNumbers();
    };

    directionDiv.appendChild(label);
    directionDiv.appendChild(textarea);
    directionDiv.appendChild(removeButton);

    return directionDiv;
}

function updateDirectionNumbers() {
    const directionsList = document.querySelector('.directions-list');
    Array.from(directionsList.children).forEach((directionDiv, index) => {
        const number = index + 1;
        const label = directionDiv.querySelector('label');
        const textarea = directionDiv.querySelector('textarea');

        directionDiv.setAttribute('data-step', number);
        label.setAttribute('for', `direction-${number}`);
        label.textContent = `Step ${number}:`;
        textarea.id = `direction-${number}`;
    });
}
