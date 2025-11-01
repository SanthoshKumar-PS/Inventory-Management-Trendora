type SeverityType = 'critical' | 'warning' | 'low';

type SeverityBadgeProps = {
    type:SeverityType,
    count:number    
}
const SeverityBadge = ({type,count}:SeverityBadgeProps) => {
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
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.textColor}`}>
            {count ? `${count} ${config.text}` : config.text}
        </div>
    )

}

export default SeverityBadge;