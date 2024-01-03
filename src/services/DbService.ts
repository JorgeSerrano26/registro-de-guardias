import type { DevDateWithId, Dev, DevWithId, GuardiaDBResponse, NewGuardia, NewDPG } from "@/types";
import supabase from "./db";

class DB {
    static async getDevs() {
        return supabase.from("devs").select<"*", DevWithId>("*");
    }

    static async getGuardias() {
        return supabase
            .from("guardias")
            .select<'*, devs!inner(id, name)', GuardiaDBResponse>('*, devs!inner(id, name)');
    }

    static async getDpgs() {
        return supabase
            .from("dpgs")
            .select<'*, devs!inner(id, name)', GuardiaDBResponse>('*, devs!inner(id, name)');
    }

    static async addGuardia(guardia: NewGuardia) {
        return supabase.from("guardias").insert(guardia)
    }

    static async addDpg(dpg: NewDPG) {
        return supabase.from("dpgs").insert(dpg)
    }

    static async addDev(dev: Dev) {
        return supabase.from('devs').insert(dev)
    }

    static async removeGuardia(id: number) {
        return supabase.from("guardias").delete().match({ id })
    }

    static async removeDpg(id: number) {
        return supabase.from("dpgs").delete().match({ id })
    }

    static async removeDev(id: number) {
        return supabase.from('devs').delete().match({ id })
    }
}

export default DB;