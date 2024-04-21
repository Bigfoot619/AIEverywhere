document.getElementById('toggleButton').addEventListener('click', function () {
    var popupContainer = document.getElementById('popupContainer');
    if (popupContainer.classList.contains('open')) {
        popupContainer.classList.remove('open');
        this.textContent = 'Extend';
    } else {
        popupContainer.classList.add('open');
        this.textContent = 'Minimize';
    }
});
