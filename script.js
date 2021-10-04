const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();


//store movie data(index,price)
//update selected seats count(mapping to index of seat)
//--
///--->store selected seats.json.stringify
//populate interface json.parse



// + is used to change the type of value from string to number
let ticketPrice = +movieSelect.value;

//Save selected movie index and price in local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // storing index of selected seats
    //  gives a nodelist-convert to array using spread operator and map throgh this
    //COPY SLECTED SEATS IN AN ARRAY
    //MAP THROUGH ARRAY
    //RETURN A NEW ARRAY INDEXES
    const seatsIndex = [...selectedSeats].map(
        //find index of selected seat passed as input from all seats
        seat => [...seats].indexOf(seat));

    //saving selected seat index
    //key,value pair both are string and seatsIndex is an array therefore wrap in stringify to make it a string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //local storage-save the selected seats such that on refreshing page they are not  lost
    //selected seat returns a nodelist of all same elements thus we store the indexes in an array


    // updating price and no of seats
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
    // get previous selected seats index
    //we get it in string form,want it back in an array therefore we parse it
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    //now if there are seats in the local storage we wanna loop through them and add selected class to them
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    // get previous selected movie index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//Seat click event
// we can also add event listener to each seat by using for each but using on ontainer is easier
container.addEventListener("click", function (e) {
    // if clicked on seat which is not occupied than toggle selected class
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        //after selecting seats update count and price
        updateSelectedCount();
    }
});

// Movie select event
// instead of using function we can write arrow
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

});

//Initail count and total seat
updateSelectedCount();
