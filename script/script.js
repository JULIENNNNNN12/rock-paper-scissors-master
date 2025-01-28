// Sélectionner le bouton et le conteneur pour les règles

const showRulesBtn = document.getElementById('showRulesBtn');
const rulesContainer = document.getElementById('rulesContainer');

// Ajouter un événement de clic sur le bouton
showRulesBtn.addEventListener('click', function() {
  // Toggle l'affichage du conteneur des règles
  if (rulesContainer.style.display === 'none') {
    rulesContainer.style.display = 'block';
  } else {
    rulesContainer.style.display = 'none';
  }
})

