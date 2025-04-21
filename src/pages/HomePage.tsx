import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import CommonButton from '../components/CommonButton';


const HomePage = () => {
    const [isX,setIsX]=useState<boolean>(true);
    const [boardArray,setBoardArray]=useState<string[]>(Array(9).fill(null));
    const [winners,setWinners]=useState<string[]>([])
    

    const checkResult=[
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
                    ];

    useEffect(() => {
     if(!checkWinner()){
        checkDraw();
     }
     
    }, [boardArray]);
    
    const checkWinner=()=>{
        for(let i=0;i<checkResult.length;i++){
            const [x,y,z]=checkResult[i];
            if(boardArray[x]&&boardArray[x]===boardArray[y]&& boardArray[x]===boardArray[z]){
                toast.success(`${!isX?'X':'O'} is the winner`);
                
                setWinners((prevState)=>[...prevState,!isX?'X':'O'])
                setBoardArray(Array(9).fill(null));
                return true;
            }
        }
        return null;
    };

    const checkDraw=()=>{
        const isGameOver=boardArray.every((i)=>i!==null);
            if(isGameOver){
                toast.warning('Game Over');
                setBoardArray(Array(9).fill(null));
            }    
    }
    
    
    const handleClick=(id:number)=>{

        if (boardArray[id]!==null) return;
        const nextItem=[...boardArray]
            nextItem[id]=isX?'X':'O';
            setBoardArray(nextItem);
       
        setIsX(!isX);   
    }
    
  return (
    <div className="flex  items-center text-center space-y-4">
        <div>
    <h2 className="text-2xl font-bold">Tic Tac Toe</h2>

    
    <div className="grid grid-cols-3 gap-2 border border-gray-400 p-2 rounded-md">
        {boardArray.map((item, i) => (
            <CommonButton key={i} id={i} item={item} onClick={handleClick} />
        ))}
    </div>

    
    <h2 className="text-lg font-semibold text-gray-700">
        Next Player: <span className="text-blue-500">{isX ? 'X' : 'O'}</span>
    </h2>
    </div>
    
    {winners.length > 0 && (
        <div className=" border w-100 border-black-400 mx-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-white-700">Winner!</h2>
            {winners.map((winner, index) => (
                <p key={index} className="text-lg font-medium text-white-600">{winner}</p>
            ))}
        </div>
    )}

    
    <ToastContainer />
</div>

  )
}

export default HomePage