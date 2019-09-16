'use strict';

let render = function(response) {
    let newData = response;
    console.log(newData);
    newData = newData.map(newData =>
        $('.results').append(`
        <h2>${newData.owner.login}</h2>
        <p>ID: ${newData.owner.id}</p>
        <p> ${newData.name} </p>
        <p>Repos: ${newData.url}</p>
        <p>Gists: ${newData.owner.gists_url}</p>`) 
    );
    
};

let fetchApi = function(name) {
    let url= (`https://api.github.com/users/${name}/repos`);
    fetch(url)
        .then(response => response.json())
        .then(responseJson => render(responseJson));
};

let eventHandler = function() {
    $('form').on('submit', (e) => {
        e.preventDefault();
        $('#githubHandle').empty();
        $('.results').empty();
        let name = document.getElementById('githubHandle').value;
        console.log(name);
        fetchApi(name);
    });
};

let main = function () {
    $('.input').append(`
    <div>
        <form> 
            <label>Please Enter the Github User Handle: <input type="text" id="githubHandle" onfocus="this.value=''" required></input></label>
            <input type="submit"></input>
        </form>
    </div>`);
    eventHandler();
};

$(main)