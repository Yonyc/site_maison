document.querySelectorAll(".a4 .card").forEach(a => {
    a.addEventListener("click", () => location = a.dataset.target);
});