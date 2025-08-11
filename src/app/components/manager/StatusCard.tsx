
type StatusCardProps = {
    title: string ,
    value: number | string ,
}

function StatusCard ( {title , value } : StatusCardProps ){

    return (
        <div className="w-70 h-19 px-5 py-3  bg-white text-black rounded-[8px] ">
            <p className="text-[15px]"> {title} </p>
            <h1 className="text-[25px] font-bold"> <strong>  {value}</strong>  </h1>
        </div>
    );
}

export default StatusCard 



