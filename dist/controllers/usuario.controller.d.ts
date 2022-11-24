import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import { AutenticacionService } from '../services';
export declare class UsuarioController {
    usuarioRepository: UsuarioRepository;
    servicioAutenticacion: AutenticacionService;
    constructor(usuarioRepository: UsuarioRepository, servicioAutenticacion: AutenticacionService);
    identificarUsuario(credenciales: Credenciales): Promise<{
        datos: {
            id: string | undefined;
            nombre: string;
            correo: string;
            rol: string;
        };
        tk: any;
    }>;
    create(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
    count(where?: Where<Usuario>): Promise<Count>;
    find(filter?: Filter<Usuario>): Promise<Usuario[]>;
    updateAll(usuario: Usuario, where?: Where<Usuario>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Usuario>): Promise<Usuario>;
    updateById(id: string, usuario: Usuario): Promise<void>;
    replaceById(id: string, usuario: Usuario): Promise<void>;
    deleteById(id: string): Promise<void>;
}
