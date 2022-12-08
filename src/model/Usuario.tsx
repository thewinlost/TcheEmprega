
export class Usuario {
    public id : string;
    public email : string;
    public urlfoto : string;
    public nome: string;
    public telefone: string;

    constructor(obj?: Partial<Usuario>) {
        if (obj) {
            this.id = obj.id
            this.email = obj.email
            this.urlfoto = obj.urlfoto
            this.nome = obj.nome
            this.telefone= obj.telefone
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "email": "${this.email}",
            "urlfoto": "${this.urlfoto}"
            "telefone": "${this.telefone}"
        }`

        //const fields = Object.values(this).join(', ')
        // const campos = Object.keys(this).join(': ')
        // const valor=Object.values(this).join(', ')
        // return `Usuario {${campos+valor}}`
        
        //let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}';
        // let userObj = JSON.parse(Objeto);
        // console.log(userObj);

        return Objeto
    }

};