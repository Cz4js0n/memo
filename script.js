var poprzednia = null;
var wynik = 0;
function startgry(){
    var kolumny = document.getElementById("kolumny").value;
    var rzedy = document.getElementById("rzedy").value;
    var zdjecia = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32];
    var zdjecia2 = zdjecia.slice(0,rzedy*kolumny); //ucinanie listy do rozmiarow tabeli
    var los = wymieszaj(zdjecia2);
    document.getElementById("popup").style.display='block';
    for(var i = 0; i < rzedy*kolumny; i++){
        if(i%rzedy==0){ //dodaje br gdy konczy sie rzad
            var br = document.createElement('br');
            document.getElementById("tablica").appendChild(br);
        }
        var pole = document.createElement('img'); //stworzenie elementu img
        pole.src=`karty/karta${los[i]}.jpg`; //przypisanie zrodla pola do tablicy los
        pole.width=70;
        pole.height=70;
        document.getElementById("tablica").appendChild(pole); //wrzucenie zdjecia
        pole.addEventListener("click", function() {
            sprawdzObrazek(kolumny*rzedy);
        })
    }
    document.getElementById("tablica").children = wymieszaj(document.getElementById("tablica").children);
}
//funcja ktora miesza liste aby dodawało randomowe zdjecia
function wymieszaj(array){
    for(var i = array.length - 1; i>0;i--){
        var j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function sprawdzObrazek(maxwynik) {
    var obrazek = event.currentTarget;
    if(poprzednia != null){
        if(obrazek.src == poprzednia.src){
            obrazek.classList.add('odgadniety');
            poprzednia.classList.add('odgadniety');
            obrazek.src = 'karty/reverse.jpg';
            poprzednia.src = 'karty/reverse.jpg';
            wynik += 2;
        }
    }
    poprzednia = obrazek;
    console.log(kolumny);
    console.log(rzedy);
    if(wynik == maxwynik){
        setTimeout(function(){
            alert('Wygrałeś!');
            location.reload();
        }, 1000);
    }
}
