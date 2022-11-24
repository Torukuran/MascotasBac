"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiaAsesor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const parse_bearer_token_1 = tslib_1.__importDefault(require("parse-bearer-token"));
const services_1 = require("../services");
let EstrategiaAsesor = class EstrategiaAsesor {
    constructor(servicioAutenticacion) {
        this.servicioAutenticacion = servicioAutenticacion;
        this.name = 'asesor';
    }
    async authenticate(request) {
        let token = (0, parse_bearer_token_1.default)(request);
        if (token) {
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if (datos) {
                if (datos.data.rol == "asesor") {
                    let perfil = Object.assign({
                        nombre: datos.data.nombre
                    });
                    return perfil;
                }
            }
            else {
                throw new rest_1.HttpErrors[401]('El token es incorrecto');
            }
        }
        else {
            throw new rest_1.HttpErrors[401]('No se encuentra incluido el token');
        }
    }
};
EstrategiaAsesor = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.AutenticacionService)),
    tslib_1.__metadata("design:paramtypes", [services_1.AutenticacionService])
], EstrategiaAsesor);
exports.EstrategiaAsesor = EstrategiaAsesor;
//# sourceMappingURL=asesor.strategy.js.map