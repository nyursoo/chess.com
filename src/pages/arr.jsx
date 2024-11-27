import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Arr = () => {
    const [db,setDb] = useState({})
    useEffect(()=>{
axios('http://localhost:8080/session/1')
.then(({data})=>setDb(data))
    },[])

    const change = async()=>{
        const newData = {
            ...db,
            history:[]
        }
       
        await axios.patch('http://localhost:8080/session/1',newData)
        
    }
    return (
        <div className='arr'>
            


<button onClick={()=>change()}>изменить весь массив</button>
            
        </div>
    );
};

export default Arr;