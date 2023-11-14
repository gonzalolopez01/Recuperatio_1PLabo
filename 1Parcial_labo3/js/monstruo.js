import {Personaje} from "./personaje.js";

export class Monstruo extends Personaje{
        constructor(id, nombre, alias, tipo, defensa, miedo){
        super(id, nombre, tipo);
        this.alias = alias;        
        this.miedo = miedo;
        this.defensa = defensa;
    }
}