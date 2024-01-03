'use server'

import DbService from '@/services/DbService'

export const addDev = async (formData: FormData) => {
    if (!formData.get('name')) return

    try {
        await DbService.addDev({
            name: formData.get('name') as string
        })
    } catch (error) {
        console.log(error)
    }
}

export const addGuardia = async (formData: FormData) => {
    if (!formData.get('user') || !formData.get('date')) return

    const timeAddon = 'T00:00:00'

    try {
        await DbService.addGuardia({
            user_id: formData.get('user') as string,
            startDate: formData.get('date') + timeAddon as string,
            endDate: formData.get('date') + timeAddon as string
        })
    } catch (error) {
        console.log(error)
    }
}

export const addDPG = async (formData: FormData) => {
    if (!formData.get('user') || !formData.get('date')) return

    try {
        await DbService.addDpg({
            user_id: formData.get('user') as string,
            startDate: formData.get('date') as string,
            endDate: formData.get('date') as string
        })
    } catch (error) {
        console.log(error)
    }
}
