
import { useState } from 'react';
import NoteContext from './notecontext';

const NoteState= (props)=>{
    const s1={
        "name":"Anshu",
        "sub":"Hindi"
    }
    const [state, setState]= useState(s1)
    const update =()=>{
       setTimeout(()=>{
        setState(
            {
             "name":"Swati",
             "sub": "Sanskrit"
            })
       },1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;