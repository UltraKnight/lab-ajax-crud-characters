const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    let res = await charactersAPI.getFullList();
    let data = res.data;
    let charInfo = '';
    data.forEach(char => {
        charInfo += `
        <div class="character-info">
          <div class='id'>Id: ${char.id}</div>
          <div class="name">Name: ${char.name}</div>
          <div class="occupation">Occupation: ${char.occupation}</div>
          <div class="cartoon">Is a Cartoon? ${char.cartoon ? 'Yes' : 'No'}</div>
          <div class="weapon">Weapon: ${char.weapon}</div>
        </div>`;
    });
    
    document.querySelector('.characters-container').innerHTML = charInfo;
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    let id = document.querySelector('[name=character-id]').value;
    let res = await charactersAPI.getOneRegister(id);
    let char = res.data;

    if(char.id) {
      let charInfo = `
      <div class="character-info">
        <div class='id'>Id: ${char.id}</div>
        <div class="name">Name: ${char.name}</div>
        <div class="occupation">Occupation: ${char.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${char.cartoon ? 'Yes' : 'No'}</div>
        <div class="weapon">Weapon: ${char.weapon}</div>
      </div>`;
    
      document.querySelector('.characters-container').innerHTML = charInfo;
    }
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    let id = document.querySelector('[name=character-id-delete]').value;
    let res = await charactersAPI.deleteOneRegister(id);
  
    if(res === 'Character has been successfully deleted') {
      event.target.style.backgroundColor = 'green';
      document.getElementById('fetch-all').click(); //simulates a click on the fetch-all button
    } else {
      event.target.style.backgroundColor = 'red';
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    let id = event.target.elements['chr-id'].value;
    let name = event.target.elements.name.value;
    let occupation = event.target.elements.occupation.value;
    let weapon = event.target.elements.weapon.value;
    let cartoon = event.target.elements.cartoon.checked;
    let char = {name, occupation, weapon, cartoon};
    let updatedChar = await charactersAPI.updateOneRegister(id, char);
    updatedChar = updatedChar.data || {}; //if the char was updated then updatedChar.data will be the new char

    if(updatedChar.id) {
      event.target.elements['send-data'].style.backgroundColor = 'green';
      document.getElementById('fetch-all').click(); //simulates a click on the fetch-all button
    } else {
      event.target.elements['send-data'].style.backgroundColor = 'red';
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let occupation = event.target.elements.occupation.value;
    let weapon = event.target.elements.weapon.value;
    let cartoon = event.target.elements.cartoon.checked;
    let char = {name, occupation, weapon, cartoon};

    await charactersAPI.createOneRegister(char);
    document.getElementById('fetch-all').click(); //simulates a click on the fetch-all button
  });
});
