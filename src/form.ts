document.addEventListener('DOMContentLoaded', () => {
    var form = document.getElementById('form');
    if (form == null) {
        return;
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});
    