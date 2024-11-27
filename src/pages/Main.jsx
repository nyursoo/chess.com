import React, { useEffect, useState } from "react";
import logo from "../image/chess-menu-transformed.png";
import whiteking from "../image/pngwing.com.png";
import whitebishop from "../image/white-bishop.png";
import whitepawn from "../image/white-pawn.png";
import whiterook from "../image/white-rook.png";
import whiteknight from "../image/white-knight.png";
import whitequeen from "../image/white-queen.png";
import blackrook from "../image/black-rook.png";
import blackqueen from "../image/black-queen.png";
import blackking from "../image/black-king.png";
import blackpawn from "../image/black-pawn.png";
import blackknight from "../image/black-knight.png"
import blackbishop from "../image/black-bishop.png"
import "./Main.css";
import axios from "axios";



const Main = () => {
  const [board,setBoard] = useState([])
  const [figures,setFigures] = useState([])
  const [select,setSelect] = useState(null) 
  const [db,setDb] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:8080/session/1')
    .then(({data})=>setDb(data))
    axios.get('http://localhost:8080/session/1')
    .then(({data})=>setBoard(data.board))
    axios.get('http://localhost:8080/session/1')
    .then(({data})=>setFigures(data.figure))
   
  },[])


  const getFigures = (el,figure)=>{
  if(figure.color === 'white'){
    if(figure.name === 'pawn'){
      return whitepawn
    }
    else if(figure.name === 'king'){
      return whiteking
    }
    else if(figure.name === 'queen'){
      return whitequeen
    }
    else if(figure.name === 'rook'){
      return whiterook
    }
    else if(figure.name === 'bishop'){
      return whitebishop
    }
    else if(figure.name === 'knight'){
      return whiteknight
    }
  }
  else if(figure.color === 'black'){
    if(figure.name === 'pawn'){
      return blackpawn
    }
    else if(figure.name === 'king'){
      return blackking
    }
    else if(figure.name === 'queen'){
      return blackqueen
    }
    else if(figure.name === 'rook'){
      return blackrook
    }
    else if(figure.name === 'bishop'){
      return blackbishop
    }
    else if(figure.name === 'knight'){
      return blackknight
    }
  }   
  }

  const calculatMoves = (figure)=>{
    const numberName = +figure.located[0]
    const symbolName = +figure.located[1].charCodeAt(0)
    let moves = []

    const isValidCell = (row,col)=> row >=1 && row <=8 && col >='a'.charCodeAt(0) && col<='h'.charCodeAt(0)
      const addMove = (row,col)=>{
        if(isValidCell(row,col)){
          moves.push(row + String.fromCharCode(col));
        };
      }
      switch(figure.name){
        case'pawn':
       const direction = figure.color === 'white' ? 1:-1;
       addMove(numberName + direction,symbolName) ;
       if((figure.color === 'white' && numberName === 2) || (figure.color === 'black' && numberName === 7)) {
        addMove(numberName +2 * direction, symbolName)
       }
       break;

       case 'knight':
        [
        [2,1],
        [2,-1],
        [-2,1],
        [-2,-1],
        [1,2],
        [1,-2],
        [-1,2],
        [-1,-2]
        ].forEach(([dr,dc])=>{
          addMove(numberName + dr,symbolName +dc);
        });
        break;
        case 'bishop':
          [-1,1].forEach((rowOffset)=>{
            [-1,1].forEach((colOffset)=>{
              for(let i = 1;i<8;i++){
                addMove(numberName + i * rowOffset,symbolName + i *colOffset)
              }
            })
          });
          break;
          case 'rook':
            [-1,1].forEach((offset)=>{
              for(let i = 1;i<8;i++){
                addMove(numberName + i *offset,symbolName);
                addMove(numberName,symbolName + i *offset);
              }
            });
            break;
            case 'queen':
              [-1,0,1].forEach((rowOffset)=>{
                [-1,0,1].forEach((colOffset)=>{
                  if(rowOffset === 0 && colOffset ===0) return;
                  for(let i =1;i<8;i++){
                    addMove(numberName + i * rowOffset,symbolName +i * colOffset)
                  }
                })
              });
              break;
              case 'king':
                [-1,0,1].forEach((rowOffset)=>{
                  [-1,0,1].forEach((colOffset)=>{
                    if(rowOffset ===0 && colOffset ===0) return;
                    addMove(numberName + rowOffset, symbolName +colOffset);
                  })
                })
                break;
                default:
                  break;
      }
      return moves
  }

  const updateAllFigures = async()=>{
    try{
      const updateFigures = figures.map((f)=>({
        ...f,
        moves:calculatMoves()
      }));
      await Promise.all(
        updateFigures.map(async(figure)=>{
          await axios.patch(`http://localhost:8080/figure/${figure.id}`,figure)
        })
      );
      setFigures(updateFigures);
      console.log('фигуры заменились успешно',updateFigures)
    }
    catch(err){
      console.log(err,'ошибка фигуры не обновились!')
    }
  }
    const handleClick= async(cell)=>{
     
      if(select){
        if(!select.moves.includes(cell.name)){
          alert('невозможный ход')
          return;
        }
        try{

          const newCell = {
            ...cell,
            isBlack:select.color==='black'?true:false,
            isWhite:select.color==='white'?true:false
          }
          let oldCell = board.find((item)=>item.name === select.located)
          oldCell = {...oldCell,isWhite:false,isBlack:false}
          const updateAllBoard = board.map((el)=>({
            ...el,
            isWhite:el.id === newCell.id?newCell.isWhite:el.id===oldCell.id?oldCell.isWhite:el.isWhite,
            isBlack:el.id === newCell.id?newCell.isBlack:el.id===oldCell.id?oldCell.isBlack:el.isBlack,

          }))
          console.log(updateAllBoard)
         
       
          const updateAllFigures = figures.map((f)=>({
            ...f,
            located:select.id === f.id?cell.name:f.located,
            moves:select.id === f.id? calculatMoves({...select,located:cell.name}):calculatMoves(f)
          }) )

        
            

          const newData = {
            ...db,
            figure:updateAllFigures,
            board:updateAllBoard
          }
          await axios.patch('http://localhost:8080/session/1',newData)

         

         
        }
        catch(err){
          console.log(err)}
      }
      else{
        const clickedFigure = figures.find((f)=>f.located ===cell.name);

        if(clickedFigure)setSelect(clickedFigure)
      }
    }



  

  return (
    <div>
      <section className="menu">
        <div className="chessboard">
          {
            board.map((el)=>(
              <div key={el.id} 
              className={`cell ${select && select.located === el.name?'selected':''} ${select?.moves.includes(el.name)?'selectedGreen':""}`} 
              onClick={()=>handleClick(el)}
              >
                {figures.filter((f)=>f.located === el.name).map((figure)=>(
                  <img key={figure.id} src={getFigures(el,figure)} alt="" />
                ))}
              </div>
            ))
          }
        </div>

      </section>
    </div>
  );
};

export default Main;



