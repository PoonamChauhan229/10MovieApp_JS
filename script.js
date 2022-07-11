// https://api.themoviedb.org/3/movie/550?api_key=9ccfb971e2a6651bed5113fb46e7f431
// /discover/movie?sort_by=popularity.desc

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9ccfb971e2a6651bed5113fb46e7f431
let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9ccfb971e2a6651bed5113fb46e7f431"
let imgUrl = "https://image.tmdb.org/t/p/w1280"
let searchUrl = "https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=9ccfb971e2a6651bed5113fb46e7f431&query="
getMovieData(url)
async function getMovieData(url) {
    let data = await fetch(url)
    let res = await data.json()
    console.log(res)
    console.log(res.results)
    showMovies(res.results)
}

const mainMovieDiv = document.getElementById('mainMovieDiv')
function showMovies(movies) {
    mainMovieDiv.innerHTML=""
    movies.map((element) => {
        var movieDiv=document.createElement('div')
        movieDiv.classList.add('col','movie')
        console.log(element)
        
        movieDiv.innerHTML = `
      
                <div class="card h-100">
                    <img src=${imgUrl+element.backdrop_path}
                        class="card-img-top" alt="...">
                    <div class="card-body m-1 p-0">
                        <div class="d-flex justify-content-between">
                            <h6 class=" p-1 card-title w-100 me-3">${element.original_title}</h6>
                            <h6 class="w-auto p-1"><span class='${getClassByRate(element.vote_average)}'>${element.vote_average}</span></h6>
                        </div>

                        <div class="card card-header overview">                           
                                <p>Overview</p>
                                <p>${element.overview}</p>                          
                        </div>


                    </div>
                </div>
   
    `
    mainMovieDiv.append(movieDiv)
    });


}

function getClassByRate(vote){
    if(vote>=8){
        return "green"
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }
}

const form = document.getElementById('form')
const search = document.getElementById('search')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchTerm = search.value
    console.log(searchTerm)
    console.log(searchUrl + searchTerm)
    if (searchTerm && searchTerm.value !== "") {
        getMovieData(searchUrl + searchTerm)
        searchTerm.value = "";
    }
    else {
        window.location.reload()
    }


})
