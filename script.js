$('.input-keyword').on('keyup', function(){
    $.ajax({
        url: 'https://www.omdbapi.com/?apikey=82ba570c&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
        
            setTimeout($('.movies-container').html(cards), 1000);
    
            //when details button clicked
            $('.modal-details-button').on('click', function(){
                $.ajax({
                    url: 'https://www.omdbapi.com/?apikey=82ba570c&i='+$(this).data('imdbid'),
                    success: m => {
                        const movieDetails = showMovieDetails(m);
                    $('.modal-body').html(movieDetails);
                    }
                });
            });
        },
        error: e => {
            console.log(e.responseText);
        }
    });
});

function showCards(m) {
            return `<div class="col-md-4 my-3">
                        <div class="card" style="height: 38rem;">
                            <img src="${m.Poster}" class="" style="height: 28rem;">
                            <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a href="#" class="btn btn-success text-white modal-details-button" data-toggle="modal" data-target="#movieDetailsModal" data-imdbid=${m.imdbID}>Show Details</a>
                            </div>
                        </div>
                    </div>`;
};

function showMovieDetails(m) {
            return ` <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${m.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}e</li>
                                    <li class="list-group-item"><strong>Plot : </strong><br> ${m.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
};