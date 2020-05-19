export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    token: string;


    constructor(id: number, name: string, email: string, role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static parse(user: any) {
        return new User(user.id, user.name, user.email, user.role);
    }
}
