class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

   async getFullList () {
    return await axios.get(this.BASE_URL + '/characters');
  }

 async getOneRegister (id) {
    return await axios.get(`${this.BASE_URL}/characters/${id}`);
  }

  async createOneRegister (character) {
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
      let createdChar = await axios.post(this.BASE_URL + '/characters', newChar);
      return createdChar;
    } catch (error) {
        return error;
    }
  }

  async updateOneRegister (id, character) {
    let newChar = character;
    if(! this.getOneRegister(id)) {
      return 'Character not found';
    }

    let char = await this.getOneRegister(id);
    char = char.data;
    if(! newChar.name) {newChar.name = char.name;}
    if(! newChar.occupation) {newChar.occupation = char.occupation;}
    if(! newChar.weapon) {newChar.weapon = char.weapon;}

    try {
      let editedChar = await axios.put(`${this.BASE_URL}/characters/${id}`, newChar);
      return editedChar;
    } catch (error) {
        return error;
    }
  }

   async deleteOneRegister (id) {
    if(! this.getOneRegister(id)) {
      return 'Character not found';
    }

    try {
      await axios.delete(`${this.BASE_URL}/characters/${id}`);
      return 'Character has been successfully deleted';
    } catch (error) {
      return error;
    }
  }
}