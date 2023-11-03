document.addEventListener('DOMContentLoaded', function() {
    populateDropdown('ingredientSelect', 'ingredients');
    populateDropdown('equipmentSelect', 'equipment');
    populateDropdown('styleSelect', 'styles');
});

function populateDropdown(selectId, resourceType) {
    const selectElement = document.getElementById(selectId);
    fetch(`/${resourceType}/getAll`)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error(`Error fetching ${resourceType}:`, error));
}
