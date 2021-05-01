$(function(){
    var urlBase = 'https://pokeapi.co/api/v2/pokemon/'
    getPokemones(urlBase);
    function getPokemones(url){
        $.ajax(url)
            .done((data) => {
                    addPokemon(data);
                    $('#more-pokemon').attr('data-nexturl', data.next)
            });
    };
    function addPokemon(data) {
        var pokemones = data.results;
        for (let i = 0; i < pokemones.length; i++) {
            $.ajax(pokemones[i].url)
                .done((data) => {
                    createCard(data);
                });
        };
    };

    function createCard(data) {
        var col = $(document.createElement('div')).attr('class','col')
        var card = '<div class="card shadow p-3 mb-5 rounded" style="width: 20rem;">'+
                        '<span class="circle"></span>'+
                        '<img src="'+ data.sprites.other.dream_world.front_default +'" class="card-img-top text-center bg-card-img p-2" alt="'+ data.name +'">'+
                        '<div class="card-body text-center">'+
                            '<h5 class="card-title">'+ data.name.toUpperCase() +'</h5>'+
                            '<a href="#" class="btn-modal-pokemon btn btn-success btn-card shadow p-3" data-pokemon="'+ data.name +'" data-toggle="modal" data-target="#pokemonModal" >¡Quiero saber más de ' + (data.name).toUpperCase() +'!</a>'+
                        '</div>'+
                    '</div>'

        col.append(card);
        $('.pokemon-row').append(col);
    }

    function getDataPokemon(name, url) {
        $(".pokemon-types").html("");
        $(".pokemon-abilities").html("");
        $(".pokemon-move").html("");
        $.ajax(url+name)
            .done((data) => {
                    data.abilities.forEach(element => {
                        var habilidad = $(document.createElement('li')).html(element.ability.name)
                        $('.pokemon-abilities').append(habilidad)
                    });
                    data.types.forEach(element => {
                        var tipos = $(document.createElement('li')).html(element.type.name)
                        $('.pokemon-types').append(tipos)
                    });
                    var aux= 0;
                    data.moves.forEach(element => {
                        aux += 1
                        if (aux < 6) {
                            var movimiento = $(document.createElement('li')).html(element.move.name)
                            $('.pokemon-move').append(movimiento)
                        }
                    });
            });
    }
        //Animaciones
        setTimeout(() => {
            $('.content').fadeIn('slow');
         }, 7000);
         setTimeout(() => {
             $(".poke-content").fadeIn('slow');
         }, 8000);
         setTimeout(() => {
         }, 11000);
         setTimeout(() => {
             $(".pokemon-card").show('slow');
         }, 12000);
         setTimeout(() => {
             $("#more-pokemon").show('slow');
         }, 13000);
     
         //Eventos
         $("#more-pokemon").click(()=>{
             var url = $('#more-pokemon').attr('data-nexturl');
             getPokemones(url)
         });
     
         $('.pokemon-card').click((event)=>{
             if (event.target.dataset.pokemon) {
                 var pokemon_name = event.target.dataset.pokemon
                 $('#pokemonModalLabel').html(pokemon_name.toUpperCase())
                 getDataPokemon(pokemon_name, urlBase);
             }
         });
});