class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    return axios.get(this.BASE_URL + '/characters');
  }

 getOneRegister (id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`);
  }

  createOneRegister (character) {
    let newChar = character;
    if(!newChar.name) {
      return newChar.name;
    }

    if (! newChar.occupation) {
      return newChar.occupation;
    }

    if(! newChar.weapon) {
      return newChar.weapon;
    }

    try {
      return axios.post(this.BASE_URL + '/characters', newChar);
    } catch (error) {
        return error;
    }
  }

  async updateOneRegister (id, character) {
    let newChar = character;
    let char = {};

    try {
      char = await this.getOneRegister(id);
      //If no id was typed int he input, it returns all the existing characters
      if(char.data.length > 1) {
        return 'Character not found';
      }
    } catch(e) {
      return 'Character not found';
    }

    char = char.data;
    newChar.name = newChar.name || char.name;
    newChar.occupation = newChar.occupation || char.occupation;
    newChar.weapon = newChar.weapon || char.weapon;
    //if(! newChar.name) {newChar.name = char.name;}
    // if(! newChar.occupation) {newChar.occupation = char.occupation;}
    // if(! newChar.weapon) {newChar.weapon = char.weapon;}

    try {
     return axios.put(`${this.BASE_URL}/characters/${id}`, newChar);
    } catch (error) {
        return {};
    }
  }

   async deleteOneRegister (id) {
    try {
      let char = await this.getOneRegister(id);
      if(char.data.length > 1) {
        return 'Character not found';
      }
    } catch(e) {
      return 'Character not found';
    }

    try {
      axios.delete(`${this.BASE_URL}/characters/${id}`);
      return 'Character has been successfully deleted';
    } catch (error) {
      return error;
    }
  }
}