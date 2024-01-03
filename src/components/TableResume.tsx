import { Resume } from "../types";

type Props = {
    resume?: Resume | null
}

const TableResume = ({ resume }: Props) => {
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Developer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        CarryOver
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Dpgs Disponibles
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Dpgs Tomados
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    resume && Object.values(resume).map((resume) => (
                        <tr key={resume.user.id} className="border-b border-gray-200 ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 ">
                                {resume.user.name}
                            </th>
                            <td className="px-6 py-4">
                                {resume.total.toString()}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 ">
                                {resume.carryOver.toString()} - Todavia no funciona
                            </td>
                            <td className={`px-6 py-4 bg-gray-50 ${resume.availableDpgs > 0 ? 'text-green-500' : (resume.availableDpgs === 0) ? 'text-gray-900' : 'text-red-500'}`}>
                                {resume.availableDpgs.toString()}
                            </td>
                            <td className="px-6 py-4">
                                {resume.dpgs.toString()}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

}

export default TableResume;