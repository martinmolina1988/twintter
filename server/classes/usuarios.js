// {
//     id: 'ALkjdaklsdj-asdkj',
//     nombre: 'Fernando',
// }



class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, userid) {

        let persona = {
            "id": id,
            "userid": userid
        };

        this.personas.push(persona);

        return this.personas;

    }


    getSocket(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }
    getUserSocket(userid) {
        let persona = this.personas.filter(persona => persona.userid === userid)[0];

        return persona.id;
    }

    getUserSockets(userid) {
        let persona = this.personas.filter(persona => persona.userid === userid);

        return persona;
    }
    getSockets() {

        return this.personas;
    }



    borrarSocket(id) {

        let socketBorrado = this.getSocket(id);

        this.personas = this.personas.filter(persona => persona.id !== id);

        return socketBorrado;

    }


}


module.exports = {
    Usuarios
}