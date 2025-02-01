const setupListManagement = (films, render) => {
  console.log('Setting up list management with films:', films);

  // Create new list
  document.querySelectorAll('.create-list').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Fix dataset access
      const filmId = e.target.closest('.dropdown-menu').getAttribute('data-film-id');
      console.log('Creating list for filmId:', filmId);

      const film = films.find((f) => f.id.toString() === filmId);
      console.log('Found film:', film);

      const listName = prompt('Nom de la liste:');
      if (listName && film) {
        try {
          const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
          lists[listName] = [film];
          localStorage.setItem('filmLists', JSON.stringify(lists));
          alert('Liste créée et film ajouté!');
          if (render) render();
        } catch (error) {
          console.error('Error creating list:', error);
        }
      }
    });
  });

  // Add to existing list
  document.querySelectorAll('.add-to-list').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const listName = e.target.dataset.list;
      // Fix dataset access
      const filmId = e.target.closest('.dropdown-menu').getAttribute('data-film-id');
      console.log('Adding to list:', listName, 'filmId:', filmId);

      const film = films.find((f) => f.id.toString() === filmId);
      console.log('Found film:', film);

      if (film) {
        try {
          const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
          if (!lists[listName]) {
            lists[listName] = [];
          }
          if (!lists[listName].some((f) => f.id === film.id)) {
            lists[listName].push(film);
            localStorage.setItem('filmLists', JSON.stringify(lists));
            alert('Film ajouté à la liste!');
          }
        } catch (error) {
          console.error('Error adding to list:', error);
        }
      }
    });
  });
};

export default setupListManagement;
