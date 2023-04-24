var movies = [], cardGrid;
const fetchData = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1')
    const data = await res.json();
    movies.push(...data.results);
    cardGrid = document.getElementById('card-grid');
    sortMovies({ value: 'rating-desc' })
}
const showMore = ({ metadata, showMoreBtn }) => {
    showMoreBtn.innerText = showMoreBtn.innerText === 'Show More' ? 'Show less' : 'Show More';
    metadata.style.display = metadata.style.display === 'block' ? 'none' : 'block'
}
const createMovieCard = ({ id, title: movieTitle, release_date, vote_average, vote_count, poster_path }) => {
    const card = document.createElement('div');
    card.classList.add('card')
    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const title = document.createElement('h3');
    title.innerText = movieTitle;
    const metadata = document.createElement('div');
    metadata.style.display = 'none';
    const relDate = document.createElement('div');
    relDate.innerText = `Release Date-${release_date}`;
    const ratings = document.createElement('div');
    ratings.innerText = `Avg Rating-${vote_average}`;
    const vote = document.createElement('div');
    vote.innerText = `Number of Ratings-${vote_count}`;
    metadata.append(relDate, ratings, vote)
    const showMoreBtn = document.createElement('button');
    showMoreBtn.className = 'btn btn-primary btn-md';
    showMoreBtn.innerText = 'Show More';
    showMoreBtn.addEventListener('click', () => showMore({ metadata, showMoreBtn }))
    card.append(poster, title, metadata, showMoreBtn)
    cardGrid.appendChild(card);
}
const reRenderCardGrid = (updatedMoviesList) => {
    cardGrid.innerHTML = '';
    updatedMoviesList.forEach(movie => createMovieCard(movie))
}
const searchMovies = (elem) => {
    reRenderCardGrid(movies.filter(movie => movie.title.toLowerCase().includes(elem.value.toLowerCase())))
}
const sortByRating = (sortOrder) => {
    const sortedMovies = movies.sort((movie1, movie2) => sortOrder === 'asc' ? movie1.vote_count - movie2.vote_count : movie2.vote_count - movie1.vote_count)
    reRenderCardGrid(sortedMovies)
}
const sortByRelease = (sortOrder) => {
    const sortedMovies = movies.sort((movie1, movie2) => sortOrder === 'asc' ? movie1.release_date.localeCompare(movie2.release_date) : movie2.release_date.localeCompare(movie1.release_date))
    reRenderCardGrid(sortedMovies)
}
const sortMovies = (elem) => {
    switch (elem.value) {
        case 'rating-desc':
            sortByRating('desc')
            break;
        case 'rating-asc':
            sortByRating('asc')
            break;
        case 'release-desc':
            sortByRelease('desc')
            break;
        case 'release-asc':
            sortByRelease('asc')
            break;
    }
}
