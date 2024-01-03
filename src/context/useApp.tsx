"use client";

import supabase from "@/services/db"
import { DevWithId, GuardiaDBResponse, Resume } from "@/types"
import generateResume from "@/utils/generateResume"
import React, { useMemo } from "react"

type CtxProps = {
    devs: DevWithId[] | null
    dpgs: GuardiaDBResponse[] | null
    guardias: GuardiaDBResponse[] | null,
    resume: Resume | null
}

const ctx = React.createContext<CtxProps>({
    devs: [],
    dpgs: [],
    guardias: [],
    resume: {}
})

export const useApp = () => React.useContext(ctx)

type Props = {
    children: React.ReactNode
} & Omit<CtxProps, 'resume'>;

const AppProvider = ({ children, devs, dpgs, guardias }: Props) => {
    const [devsState, setDevsState] = React.useState<DevWithId[]>(devs ?? []);
    const [dpgsState, setDpgsState] = React.useState<GuardiaDBResponse[]>(dpgs ?? []);
    const [guardiasState, setGuardiasState] = React.useState<GuardiaDBResponse[]>(guardias ?? []);

    const resume = useMemo(() => generateResume({ guardias: guardiasState, dpgs: dpgsState }), [dpgsState, guardiasState]);

    React.useEffect(() => {
        const channel = supabase.channel('realtime devs')
            // Devs
            .on<DevWithId>("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "devs",
            }, (payload) => {
                setDevsState([...devsState, payload.new as DevWithId])
            })
            // Dpgs
            .on<GuardiaDBResponse>("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "dpgs",
            }, (payload) => {
                setDpgsState([...dpgsState, payload.new as GuardiaDBResponse])
            })
            // Guardias
            .on<GuardiaDBResponse>("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "guardias",
            }, (payload) => {
                const user = devsState.find(dev => dev.id === payload.new.user_id)
                if (!user) return

                const newGuardia: GuardiaDBResponse = {
                    ...payload.new,
                    devs: {
                        id: user.id,
                        name: user.name
                    },
                }
                setGuardiasState([...guardiasState, newGuardia])
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <ctx.Provider
            value={
                {
                    devs: devsState,
                    dpgs: dpgsState,
                    guardias: guardiasState,
                    resume,
                }
            }
        >
            {children}
        </ctx.Provider>
    )
}

export default AppProvider;