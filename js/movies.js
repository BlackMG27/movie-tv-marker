//grab your variables
document.getElementById("myForm").addEventListener('submit', saveMovies);

function saveMovies(e){
    var movieName = document.getElementById("movieTitle").value;
    var movieYear = document.getElementById("movieYear").value;
    var movieText = document.getElementById("movieWhy").value;
    var movieId = document.getElementById("movieID").value;

    //set the localStorage object
    var movie = {
        name: movieName,
        year: movieYear,
        text: movieText,
        imdb: movieId
    }
    
    if (!validateForm(movieName, movieYear, movieText, movieId)) {
        return false;
    }

    console.log(movie);
    if(localStorage.getItem('movies') === null){
        //init array
        var movies = [];
        //push into the array
        movies.push(movie);
        //set to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
    }else{
        //set movies to the parsed JSON
        var movies = JSON.parse(localStorage.getItem('movies'));
        //push into the array
        movies.push(movie);
        //set to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
    } 

    //clear the form
    document.getElementById("myForm").reset()

    fetchMovies();

    e.preventDefault();
//
}

function deleteMovies(imdb){
    //
    var movies = JSON.parse(localStorage.getItem('movies'));

    // var newMovies = movies.map(function(movie, i) {
    //     if (movie.imdb === imdb) {
    //         //try to remove items from 
    //         // localStorage.setItem('movies', JSON.stringify(movies.splice(i, 1)));
    //         return null;
    //     } else {
    //         return movie;
    //     }
    // }, this);

    //goes through all of the movies that are not null
    //create a new variable with filter method
    var newMovies = movies.filter(function(movie, i) {
        //return all of the movies that don't match the imdb 
        return movie.imdb != imdb;
    });
    //set it back to localStorage
    localStorage.setItem('movies', JSON.stringify(newMovies));

    fetchMovies();
    
}

function fetchMovies(){
    // debugger;
    //get the parsed JSON
    var movies = JSON.parse(localStorage.getItem('movies')) || [];

    // if (!movies) {
    //     return;
    // }

    //grab the output id
    var movieResults = document.getElementById("movieResults");

   movieResults.innerHTML = '';
   //go through the movie objects



   for(var i = 0; i < movies.length; i++){
        var name = movies[i].name
        var year = movies[i].year
        var text = movies[i].text
        var imdb = movies[i].imdb

        

        movieResults.innerHTML += "<div class='well'><h2>" + name +
            "</h2><h4>" + year + "</h4><h6 id= "+imdb+">" + imdb +
            "</h6><blockquote>" + text + "</blockquote>" +
            '<a href="https://www.imdb.com/title/'+imdb+'" target="_blank" class="btn btn-default">Go To Media</a>' +
            '<a onclick="deleteMovies(\'' + imdb + '\')" class="btn btn-danger" href="#">Delete</a></div>'
        
        
   }
    

    
}

function validateForm(movieName, movieYear, movieText, movieId) {
    //checks to see if name and url are blank 
    if (!movieName|| !movieYear|| !movieText|| !movieId) {
        alert('Please fill in the form.');
        //stops it from going to localStorage
        return false;
    }

    //regex to match movieId with a imdb id
    var express = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/
    var regex = new RegExp(express)
    //if the id entered doesn't match the id format
    if (!movieId.match(regex)) {
        alert('Please use a valid IMDB ID');
        return false;
    }

    return true;
}
