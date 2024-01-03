'use client'

import { useApp } from "@/context/useApp";

const ListOfUsers = () => {
    const { devs } = useApp();

    return <ul className="max-w-md divide-y divide-gray-200 max-h-[300px] overflow-auto">
        {
            devs?.map((dev) => {
                return <li key={`dev-list-item-${dev.id}`} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/no-user.gif" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {dev.name}
                            </p>

                        </div>
                    </div>
                </li>
            })
        }
    </ul>

}

export default ListOfUsers;