import type { DevDateWithId, Dev } from "@/types";
import supabase from "./db";

let guardias: DevDateWithId[] = [];
let dpgs: DevDateWithId[] = [];
let devs: Dev[] = [];


class DB {
    static async getDevs() {
        return supabase.from("devs").select<"*", Dev>("*");
    }

    static async getGuardias() {
        return guardias
    }

    static async getDpgs() {
        return dpgs
    }

    static async addGuardia(guardia: DevDateWithId) {
        guardias.push(guardia)
    }

    static async addDpg(dpg: DevDateWithId) {
        dpgs.push(dpg)
    }

    static async addDev(dev: Dev) {
        supabase.from('devs').insert(dev)
    }
}

export default DB;