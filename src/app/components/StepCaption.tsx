import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const StepCaption = () => {
    const [openCaptionsDetails, setOpenCaptionsDetails] = useState(true)

    const toggleCaptions = () => {
        setOpenCaptionsDetails(!openCaptionsDetails)
    }

    return (
        <div className="flex w-fit text-[15px] h-fit">
            <div className={` overflow-hidden transition-all duration-300 ease-in-out`}>

                <div
                    className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${openCaptionsDetails ? 'max-h-40 opacity-100 mt-2 pb-3' : 'max-h-0 opacity-0'}
                        `}
                >

                    <ul className="px-3 space-y-1">
                        <li>
                            <div className="flex items-center gap-2 justify-between">
                                <span className="bg-green-600 w-[27px] h-[3.2px]" />
                                <div className="">Standardized</div>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info size={15} color="gray" className="" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[230px] bg-white text-gray-600 shadow">
                                        The regional process is identical to the global standard in tools, methods, and outcomes. Any minor differences are purely cosmetic (e.g., naming conventions) and have no impact on performance, compliance, or user experience.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-2 justify-between">
                                <span className="bg-blue-500 w-[27px] h-[3.2px]" />
                                <div className="">Harmonized</div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={15} color="gray" className="" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[230px] bg-white text-gray-600 shadow">
                                        The regional process uses different tools or platforms than the global standard, but it achieves the same core outcome and maintains a similar level of automation and control. This is a "Harmonization" opportunity.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-2 justify-between">
                                <span className="bg-red-600 w-[27px] h-[3.2px]" />
                                <div className="">Inconsistent</div>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info size={15} color="gray" className="" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[230px] bg-white text-gray-600 shadow">
                                        A mandatory step from the global process is completely missing in the regional process. The regional process uses different tools, methods, or has a different outcome that negatively impacts compliance, security, process effectiveness, or optimization levels. The deviation introduces a significant risk or fundamentally changes the control principle.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="">
                <button className="cursor-pointer p-2 bg-white rounded-4xl border" onClick={toggleCaptions}>
                    {!openCaptionsDetails ? <ChevronDown /> : <ChevronUp />}
                </button>
            </div>
        </div>
    )
}

export default StepCaption