import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
export declare class AutenticacionService {
    usuarioRepository: UsuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    GenerarClave(): any;
    CifrarClave(clave: string): any;
    identificarUsuario(usuario: string, clave: string): false | Promise<(Usuario & import("../models").UsuarioRelations) | null>;
    GenerarTokenJWT(usuario: Usuario): any;
    ValidarTokenJWT(token: string): any;
}
