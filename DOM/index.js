const lastListItem = document.querySelector('ul').lastElementChild;
lastListItem.innerHTML = 'Changed by Kostya';
document.querySelector('li a').style.color = 'green';
document.querySelector('button').style.backgroundColor = 'yellow';

// Add toggle button - classList.add/remove
function toggleButton() {
    document.querySelector('button').classList.toggle('hidden');
}