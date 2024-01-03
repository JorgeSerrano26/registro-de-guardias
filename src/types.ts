export type DateRangeType = {
    startDate: string,
    endDate: string
}

export type Dev = {
    name: string
}

export type NewGuardia = {
    user_id: string;
    startDate: string;
    endDate: string;
}

export type NewDPG = NewGuardia;

export type GuardiaDBResponse = {
    id: number;
    created_at: string;
    user_id: number;
    startDate: string;
    endDate: string;
    devs: {
        id: number;
        name: string;
    },
    carry_over: number
}

export type DevWithId = {
    id: number;
    created_at?: string
} & Dev;

export type DevDate = {
    user: DevWithId,
    date: DateRangeType
}

export type DevDateWithId = DevDate & { id: string }

export type Resume = Record<string, {
    user: DevWithId,
    availableDpgs: number,
    total: number,
    dpgs: number,
    carryOver: number
}>
