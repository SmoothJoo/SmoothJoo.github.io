const autoCompleteConfig = {
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
          <img src="${imgSrc}" />
          ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchInput){
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey:'d9835cc5',
                s: searchInput
            }
        });
        
        if (response.data.Error) {
            return [];
        }  
      return response.data.Search;
    }
};
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-search'),
    onOptionSelect(movie) {
   onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
  });
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-search'),
    onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    }
});
    
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '891efbfe',
      i: movie.imdbID
    }
  });

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    let leftSideValue = leftStat.dataset.value;
    let rightSideValue = rightStat.dataset.value;

    leftSideValue = findNA(leftSideValue);
    rightSideValue = findNA(rightSideValue);

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('bg-success');
      leftStat.classList.add('bg-warning');
    } else {
      rightStat.classList.remove('bg-success');
      rightStat.classList.add('bg-warning');
    }
  });
};
const findNA = value => {
  if (isNaN(value)) 
    return 0;
  else
  return value;
};

const movieTemplate = movieDetail => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <div class="row">
      <div class="col-lg-4 col-12">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </div>
      <div class="col-lg-8 col-12">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
      </div>
    </div>

    <article data-value=${awards} class="notification bg-success">
      <p class="h3">${movieDetail.Awards}</p>
      <p class="h5">Awards</p>
    </article>
    <article data-value=${dollars} class="notification bg-success">
      <p class="h3">${movieDetail.BoxOffice}</p>
      <p class="h5">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification bg-success">
      <p class="h3">${movieDetail.Metascore}</p>
      <p class="h5">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification bg-success">
      <p class="h3">${movieDetail.imdbRating}</p>
      <p class="h5">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification bg-success">
      <p class="h3">${movieDetail.imdbVotes}</p>
      <p class="h5">IMDB Votes</p>
    </article>
  `;
};
