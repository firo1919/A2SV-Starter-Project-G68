
type StatusCardProps = {
    title: string ,
    value: number | string ,
}

function StatusCard ( {title , value } : StatusCardProps ){

    return (
        <div className="w-75 h-17 px-5 py-2 bg-white text-black rounded-[8px] p-20px">
            <p className="text-[15px]"> {title} </p>
            <h1 className="text-[25px] font-bold"> <strong>  {value}</strong>  </h1>
        </div>
    );
}

export default StatusCard 



