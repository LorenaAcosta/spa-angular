import { Roles } from './roles.model';

export class Usuario {

    constructor(
        public username: string,
        public password: string,
        public email?: string,
        public nombre?: string,
        public apellido?: string,
        public enabled?: boolean,
        public ruc?: string,
        public telefono?: string,
        public sexo?: string,
        public id?: string,
        public roles?: Roles[],
    ) {}
}
