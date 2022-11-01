import React, {useState} from "react";
import {ImCross} from "react-icons/im";

const TagBox = (props) => {
    const [selected, setSelected] = useState(false)
    let colorClass = !selected ? 'border-redDark bg-red' :
        'border-green-800 bg-green-500'
    let textColorClass = !selected ? 'text-redDark ' : 'text-green-800'
    let iconColor = !selected ? '#6e131f' : '#276749'

    const buttonHandler = () => {
        if(!props.streamStarted) {
            if(selected){
                props.setTags((current) => {
                    const copy = {...current}
                    delete copy[props.tag]
                    return copy
                })
            }
            else{
                let tmp = {...props.tags}
                tmp[props.tag] = props.tag
                props.setTags(tmp)
            }
            setSelected(!selected)

        }
    }

    return(
        <button onClick={() => buttonHandler()} className={`border-4 px-[2%] mx-2 rounded-md flex max-w-fit py-[0.7%] leading-snug whitespace-nowrap ${colorClass}`}>
            <div className={`font-extrabold align-middle mr-4 ${textColorClass}`}>{props.tag}</div><ImCross className='mt-1' color={iconColor}/>
        </button>
    )
}

export default TagBox
