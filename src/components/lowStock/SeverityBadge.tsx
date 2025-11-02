type SeverityType = 'critical' | 'warning' | 'low';

type SeverityBadgeProps = {
    type:SeverityType,
    count?:number,
    scrollToContainer?:(tagName:string)=>void;  
}
const SeverityBadge = ({type,count,scrollToContainer}:SeverityBadgeProps) => {
    const config = {
        critical : {
            bg:'bg-red-500',
            text:'Critical',
            textColor : 'text-white'
        },
        warning: {
            bg: "bg-orange-500",
            text: "Warning",
            textColor: "text-white",
        },
        low: {
            bg: "bg-gray-300/50",
            text: "Low",
            textColor: "text-black",
        },
    }[type];

    return (
        <div onClick={()=>{scrollToContainer && scrollToContainer(type)}} 
        className={`px-3 py-1 rounded-full cursor-pointer hover:opacity-90 transition-all ${count?"text-sm":"text-xs"} font-medium ${config.bg} ${config.textColor}`}>
            {count ? `${count} ${config.text}` : config.text.toUpperCase()}
        </div>
    )

}

export default SeverityBadge;