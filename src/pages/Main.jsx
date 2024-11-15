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
  useEffect(()=>{
    axios('http://localhost:8080/board')
    .then(({data})=>setBoard(data))
  },[])
  return (
    <div>
      <section className="menu">
        <div className="container">
          <div className="menu__top">
            <img className="chess-logo" src={logo} alt="" />
            <h1>Chess</h1>
          </div>
          <div class="box">
            <div class="box__left">
              <table class="chess-board">
                <tbody>
                  <tr>
                    <th></th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>d</th>
                    <th>e</th>
                    <th>f</th>
                    <th>g</th>
                    <th>h</th>
                  </tr>
                  <tr>
                    <th>8</th>
                    <td class="white" id="a8">
                      <img src={blackrook} alt="" />
                    </td>
                    <td class="black" id="b8">
                      <img src={blackknight} alt="" />
                    </td>
                    <td class="white" id="c8">
                      <img src={blackbishop} alt="" />
                    </td>
                    <td class="black" id="d8">
                      <img src={blackking} alt="" />
                    </td>
                    <td class="white" id="e8">
                      <img src={blackqueen} alt="" />
                    </td>
                    <td class="black" id="f8">
                      <img src={blackbishop} alt="" />
                    </td>
                    <td class="white" id="g8">
                    <img src={blackknight} alt="" />

                    </td>
                    <td class="black" id="h8">
                      <img src={blackrook} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td class="black" id="a7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="white" id="b7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="black" id="c7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="white" id="d7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="black" id="e7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="white" id="f7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="black" id="g7">
                      <img src={blackpawn} alt="" />
                    </td>
                    <td class="white" id="h7">
                      <img src={blackpawn} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td class="white" id="a6"></td>
                    <td class="black" id="b6"></td>
                    <td class="white" id="c6"></td>
                    <td class="black" id="d6"></td>
                    <td class="white" id="e6"></td>
                    <td class="black" id="f6"></td>
                    <td class="white" id="g6"></td>
                    <td class="black" id="h6"></td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td class="black" id="a5"></td>
                    <td class="white" id="b5"></td>
                    <td class="black" id="c5"></td>
                    <td class="white" id="d5"></td>
                    <td class="black" id="e5"></td>
                    <td class="white" id="f5"></td>
                    <td class="black" id="g5"></td>
                    <td class="white" id="h5"></td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td class="white" id="a4"></td>
                    <td class="black" id="b4"></td>
                    <td class="white" id="c4"></td>
                    <td class="black" id="d4"></td>
                    <td class="white" id="e4"></td>
                    <td class="black" id="f4"></td>
                    <td class="white" id="g4"></td>
                    <td class="black" id="h4"></td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td class="black" id="a3"></td>
                    <td class="white" id="b3"></td>
                    <td class="black" id="c3"></td>
                    <td class="white" id="d3"></td>
                    <td class="black" id="e3"></td>
                    <td class="white" id="f3"></td>
                    <td class="black" id="g3"></td>
                    <td class="white" id="h3"></td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td class="white" id="a2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="black" id="b2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="white" id="c2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="black" id="d2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="white" id="e2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="black" id="f2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="white" id="g2">
                      <img src={whitepawn} alt="" />
                    </td>
                    <td class="black" id="h2">
                      <img src={whitepawn} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td class="black" id="a1">
                      <img src={whiterook} alt="" />
                    </td>
                    <td class="white" id="b1">
                      <img src={whiteknight} alt="" />
                    </td>
                    <td class="black" id="c1">
                      <img src={whitebishop} alt="" />
                    </td>
                    <td class="white" id="d1">
                      <img src={whiteking} alt="" />
                    </td>
                    <td class="black" id="e1">
                      <img src={whitequeen} alt="" />
                    </td>
                    <td class="white" id="f1">
                      <img src={whitebishop} alt="" />
                    </td>
                    <td class="black" id="g1">
                      <img src={whiteknight} alt="" />
                    </td>
                    <td class="white" id="h1">
                      <img src={whiterook} alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="box__right">
              <div className="timer">
                <h2>0:00</h2>
              </div>
              <button className="play">ИГРАТЬ</button>
              <div className="timer">
                <h2>0:00</h2>
              </div>
            </div>
          </div>
        </div>


        <div className="board">
          {
            board.map((el)=>(
              <div className={'boardChess'}></div>
            ))
          }
        </div>

      </section>
    </div>
  );
};

export default Main;
