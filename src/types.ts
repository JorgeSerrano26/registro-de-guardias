export type DateRangeType = {
    startDate: string,
    endDate: string
}

export type Dev = {
    name: string
}

export type DevWithId = {
    id: string;
    created_at: string
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
