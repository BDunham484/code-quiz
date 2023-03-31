let initialEl = document.getElementById('initials');
let scoreEl = document.getElementById('score');

let score = localStorage.getItem('high-score');
let initials = localStorage.getItem('initials');
console.log(score);
console.log(initials);

initialEl.textContent = JSON.parse(initials);
scoreEl.textContent = score;