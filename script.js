var wybrane = [];
var ilosc_odgadnietych = 0;
function startgry(){
    var kolumny = document.getElementById("kolumny").value;
    var rzedy = document.getElementById("rzedy").value;
    var zdjecia = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32];
    var zdjecia2 = zdjecia.slice(0,rzedy*kolumny);
    var los = wymieszaj(zdjecia2);
    document.getElementById("popup").style.display='block';
    for(var i = 0; i < rzedy*kolumny; i++){
        if(i%rzedy==0){
            var br = document.createElement('br');
            document.getElementById("tablica").appendChild(br);
        }
        var pole = document.createElement('img');
        pole.src=`karty/karta${los[i]}.jpg`;
        pole.width=70;
        pole.height=70;
        document.getElementById("tablica").appendChild(pole);
        pole.addEventListener("click", function() {
            sprawdzObrazek();
        })
    }
    document.getElementById("tablica").children = wymieszaj(document.getElementById("tablica").children);
}
function wymieszaj(array){
    for(var i = array.length - 1; i>0;i--){
        var j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function sprawdzObrazek() {
    var obrazek = event.currentTarget;
    console.log(obrazek);
    // Jeśli wybrano już dwa obrazy, zakończ funkcję
    if (wybrane.length == 2) {
        return;
    }
    // Wyłącz kliknięcie na już odgadniętym obrazku
    if (obrazek.classList.contains('odgadniety')) {
        return;
    }
    // Zapisz wybrany obrazek do tymczasowej tablicy
    wybrane.push(obrazek);
    // Jeśli wybrano dwa obrazy, sprawdź, czy są takie same
    if (wybrane.length == 2) {
        // Jeśli oba obrazy są identyczne, oznacz je jako odgadnięte
        if (wybrane[0].src == wybrane[1].src) {
            wybrane[0].classList.add('odgadniety');
            wybrane[1].classList.add('odgadniety');
            wybrane = [];
            ilosc_odgadnietych += 2;
            // Jeśli odgadnięto wszystkie obrazy, wyświetl komunikat o zwycięstwie
            if (ilosc_odgadnietych == rzedy * kolumny) {
                alert('Gratulacje, wygrałeś!');
            }
        }
        // Jeśli obrazy nie są takie same, odsłoń je na 1 sekundę, a następnie ukryj
        else {
            setTimeout(function() {
            wybrane[0].src = 'karty/reverse.jpg';
            wybrane[1].src = 'karty/reverse.jpg';
            wybrane = [];
            }, 1000);
        }
    }
}
