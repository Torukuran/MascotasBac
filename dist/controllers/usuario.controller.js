"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const fetch = require('node-fetch');
let UsuarioController = class UsuarioController {
    constructor(usuarioRepository, servicioAutenticacion) {
        this.usuarioRepository = usuarioRepository;
        this.servicioAutenticacion = servicioAutenticacion;
    }
    async identificarUsuario(credenciales) {
        let p = await this.servicioAutenticacion.identificarUsuario(credenciales.usuario, credenciales.contrasena);
        if (p) {
            let token = this.servicioAutenticacion.GenerarTokenJWT(p);
            return {
                datos: {
                    id: p.id,
                    nombre: p.nombre,
                    correo: p.correo,
                    rol: p.rol
                },
                tk: token
            };
        }
        else {
            throw new rest_1.HttpErrors[401]('Datos invalidos');
        }
    }
    async create(usuario) {
        let clave = this.servicioAutenticacion.GenerarClave();
        let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
        usuario.contrasena = claveCifrada;
        let p = await this.usuarioRepository.create(usuario);
        //Notifica al usuario
        let destino = usuario.correo;
        let asunto = 'Registro en la plataforma';
        let contenido = `Hola ${usuario.nombre} su usuario es ${usuario.correo} y su contraseña es ${usuario.contrasena}`;
        fetch(`http://127.0.0.1:5000/email?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
            .then((data) => {
            console.log(data);
        });
        return p;
    }
    async count(where) {
        return this.usuarioRepository.count(where);
    }
    async find(filter) {
        return this.usuarioRepository.find(filter);
    }
    async updateAll(usuario, where) {
        return this.usuarioRepository.updateAll(usuario, where);
    }
    async findById(id, filter) {
        return this.usuarioRepository.findById(id, filter);
    }
    async updateById(id, usuario) {
        await this.usuarioRepository.updateById(id, usuario);
    }
    async replaceById(id, usuario) {
        await this.usuarioRepository.replaceById(id, usuario);
    }
    async deleteById(id) {
        await this.usuarioRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/identificarUsuario', {
        responses: {
            '200': {
                description: 'Identificación de usuario'
            }
        }
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Credenciales]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "identificarUsuario", null);
tslib_1.__decorate([
    (0, rest_1.post)('/usuarios'),
    (0, rest_1.response)(200, {
        description: 'Usuario model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario, {
                    title: 'NewUsuario',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/count'),
    (0, rest_1.response)(200, {
        description: 'Usuario model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Usuario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios'),
    (0, rest_1.response)(200, {
        description: 'Array of Usuario model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Usuario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/usuarios'),
    (0, rest_1.response)(200, {
        description: 'Usuario PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Usuario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Usuario, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/{id}'),
    (0, rest_1.response)(200, {
        description: 'Usuario model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Usuario, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/usuarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Usuario PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Usuario]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/usuarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Usuario PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Usuario]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/usuarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Usuario DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteById", null);
UsuarioController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    tslib_1.__param(1, (0, core_1.service)(services_1.AutenticacionService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsuarioRepository,
        services_1.AutenticacionService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map