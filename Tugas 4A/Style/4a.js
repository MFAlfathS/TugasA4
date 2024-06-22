let heroes = [];
let types = [];

$(document).ready(function() {
    fetchTypes();
    fetchHeroes();
});

function fetchHeroes() {
    const heroList = $('#hero-list');
    heroList.empty();
    heroes.forEach(hero => {
        let typeName;
        if (hero.type_id === "physical" || hero.type_id === "magical") {
            typeName = hero.type_id.charAt(0).toUpperCase() + hero.type_id.slice(1);
        } else {
            const type = types.find(t => t.id === hero.type_id);
            typeName = type ? type.name : 'Unknown';
        }
        heroList.append(`
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${hero.photo}" class="card-img-top" alt="${hero.name}">
                    <div class="card-body">
                        <h5 class="card-title">${hero.name}</h5>
                        <p class="card-text">${typeName}</p>
                        <button class="btn btn-danger" onclick="deleteHero(${hero.id})">Delete</button>
                        <button class="btn btn-primary" onclick="showEditHeroModal(${hero.id})">Edit</button>
                    </div>
                </div>
            </div>
        `);
    });
}


function fetchTypes() {
    const heroTypeSelect = $('#hero-type');
    heroTypeSelect.empty();
    heroTypeSelect.append('<option value="physical">Physical</option>');
    heroTypeSelect.append('<option value="magical">Magical</option>');
    types.forEach(type => {
        heroTypeSelect.append(`<option value="${type.id}">${type.name}</option>`);
    });
}

function showAddHeroModal() {
    $('#add-hero-form')[0].reset(); 
    $('#add-hero-form').off('submit'); 
    $('#add-hero-form').on('submit', addHero); 
    $('#addHeroModal').modal('show');
}

function showAddTypeModal() {
    $('#addTypeModal').modal('show');
}

function addHero(event) {
    event.preventDefault();
    const newHero = {
        id: heroes.length ? heroes[heroes.length - 1].id + 1 : 1,
        name: $('#hero-name').val(),
        type_id: $('#hero-type').val(),
        photo: $('#hero-photo').val()
    };
    heroes.push(newHero);
    fetchHeroes();
    $('#addHeroModal').modal('hide');
    $('#add-hero-form')[0].reset();
}

$('#add-hero-form').on('submit', addHero);

$('#add-type-form').submit(function(event) {
    event.preventDefault();
    const newType = {
        id: types.length ? types[types.length - 1].id + 1 : 1,
        name: $('#type-name').val()
    };
    types.push(newType);
    fetchTypes();
    $('#addTypeModal').modal('hide');
});

function deleteHero(id) {
    heroes = heroes.filter(hero => hero.id !== id);
    fetchHeroes();
}

function showEditHeroModal(id) {
    const hero = heroes.find(hero => hero.id === id);
    if (!hero) return;

    $('#hero-name').val(hero.name);
    $('#hero-type').val(hero.type_id);
    $('#hero-photo').val(hero.photo);

    $('#add-hero-form').off('submit');
    $('#add-hero-form').on('submit', function(event) {
        event.preventDefault();
        hero.name = $('#hero-name').val();
        hero.type_id = $('#hero-type').val();
        hero.photo = $('#hero-photo').val();
        fetchHeroes();
        $('#addHeroModal').modal('hide');
        $('#add-hero-form').off('submit').on('submit', addHero);
    });

    $('#addHeroModal').modal('show');
}
