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
  useEffect(()=>{
    axios('http://localhost:8080/board')
    .then(({data})=>setBoard(data))
  },[])

  useEffect(()=>{
    axios('http://localhost:8080/figure')
    .then(({data})=>setFigures(data))
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
const moveFigure = async (el,figure)=>{  
  if(select){
    if (select.id === figure.id){
      return setSelect(null)
    }
    


   if(select.moves.includes(el.name)){
    try{
      let oldCell = board.find((item)=>item.name === select.located)
        oldCell = {...oldCell,isBlack:false,isWhite:false}

        
        

      
      await axios.patch(`http://localhost:8080/board/${oldCell.id}`,oldCell)
        const newFigure = {
          ...select,
          located:el.name,
          moves:movesFigurePawn(el,select)
        }
         const newCell = {
          ...el,
          isWhite:select.color === 'white'?true:false,
          isBlack:select.color ==='black'?true:false
         }

         await axios.patch(`http://localhost:8080/board/${el.id}`,newCell)
      await axios.patch(`http://localhost:8080/figure/${select.id}`,newFigure)
      

    }catch(err){
      console.log('невозможно сделать такой ход')
    }
   }
     else if(select.id !== figure.id){
  
      return setSelect(figure)
    }
  }
  else{
    setSelect(figure)
  }
}


function movesFigurePawn(cell,figure) {
  const numberName = cell.name[0]
  const symbolName = cell.name[1]
  let newMoves = []
  if(figure.color === 'white'){
    if(figure.name === 'pawn'){
      newMoves.push((+numberName + 1) +symbolName) 
    }
  }
  else if(figure.color === 'black'){
    if(figure.name === 'pawn'){
      newMoves.push((+numberName - 1) +symbolName)  
    }
  }
  return newMoves
}
const moveBishop = ()=>{
  
}
const moveKing = ()=>{
  
}
const moveQuenn = ()=>{
  
}
const moveKnight = ()=>{
  
}
const moveRook = ()=>{
  
}
  const cellRender = (el)=>{
    let one = ''

    if(el.isWhite || el.isBlack){
      const figure = figures.find((item)=>el.name === item.located)
      one = figure
    }
    return(
      <div onClick={()=>moveFigure(el,one)} id={el.name} key={el.name} className={`cell 
      ${select?select.located=== el.name?'selected':'':''}
      ${select?select.moves.includes(el.name)?'selectedgreen':'':''}
      `} >
        {one? <img src={getFigures(el,one)} alt="" />:''}
      </div>
    )
  }

  return (
    <div>
      <section className="menu">
        <div className="chessboard">
          {
            board.map((el)=>cellRender(el))
          }
        </div>

      </section>
    </div>
  );
};

export default Main;
