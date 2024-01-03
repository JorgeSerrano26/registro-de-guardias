import { ChangeEventHandler, useState } from "react"
import { DevWithId } from "@/types"

type Props = {
    value?: DevWithId,
    users?: DevWithId[],
    onSelect?: (user?: DevWithId) => void
}

export default function UserSelector({ value, users = [], onSelect }: Props) {
    const handleOnSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {

        if (onSelect && users) {
            const user = users.find((u) => u.id === e.currentTarget.value);
            onSelect(user);
        }
    }

    return <>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona un dev</label>
        <select onChange={handleOnSelect} value={value?.id} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value={0}>Choose a dev</option>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select></>
}
