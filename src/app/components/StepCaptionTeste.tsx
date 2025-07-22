import { TooltipProvider } from "@/components/ui/tooltip"
import { Tooltip } from "@mui/material"
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { useEffect, useState } from "react"

const StepCaption = () => {
    const [openCaptionsDetails, setOpenCaptionsDetails] = useState(true)

    const toggleCaptions = () => {
        setOpenCaptionsDetails(!openCaptionsDetails)
    }

    return (
        <div className="w-[260px] text-[15px] bg-white rounded border-1 border-gray-300 h-fit">
            <div className="px-3 py-2 border flex items-center justify-between border-b-gray-300">
                <h1 className="font-bold ">Captions</h1>
                <button className="cursor-pointer" onClick={toggleCaptions}>
                    {!openCaptionsDetails ? <ChevronDown /> : <ChevronUp />}
                </button>
            </div>
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${openCaptionsDetails ? 'max-h-40 opacity-100 mt-2 pb-3' : 'max-h-0 opacity-0'}
                `}
            >
                <ul className="px-3 space-y-2">
                    <li>
                        <div className="flex items-center gap-2">
                                    <Info size={15} color="gray" className="ml-1" />
                                    <div className="">Harmonized</div>
                                    <span className="bg-blue-800 rounded-full w-[13px] h-[13px]" />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-700 rounded-full w-[13px] h-[13px]" />
                            <div className="">Standardized</div>
                            <Info size={15} color="gray" className="ml-1" />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center gap-2">
                            <span className="bg-red-500 rounded-full w-[13px] h-[13px]" />
                            <div className="">Inconsistent</div>
                            <Info size={15} color="gray" className="ml-1" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default StepCaption