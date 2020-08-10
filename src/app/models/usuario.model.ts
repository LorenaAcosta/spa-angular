import { Authorities } from './authorities';

export class Usuario {

    constructor(
        public username: string,
        public password: string,
        public email?: string,
        public id?: string,
        public authorities?: Authorities[],
        public enabled?: boolean,
        public firstname?: string,
        public lastname?: string
    ){}
}
