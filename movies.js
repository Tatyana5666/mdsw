function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('movies');

fetch('https://api.themoviedb.org/3/movie/popular?api_key=a98026d8a521fe3109abb07a30103c93&language=en-US&page=1')
    .then(response => response.json())
     .then(data => {
         let movies = data.results;

         return movies.map(function (movie) {
             let li = createNode('li');
             span = createNode('span');

             li.innerHTML = movie.title;
             span.innerHTML = movie.overview;

             append(li, span);
             append(ul, li);
         })
     })