import React from 'react'
import { ButtonProps } from '../common/types';

const CommonButton:React.FC<ButtonProps>=(props)=> {
    const {onClick,id,item}=props;
  return (
    <button onClick={()=>onClick(id)} className="square bg-[#1a1a1a] text-white w-15 h-15 rounded-sm">{item}</button>
  )
}

export default CommonButton