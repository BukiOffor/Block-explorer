import Transaction from "./Transaction";
//import { useState } from "react";



function App() {

    return (
    <div>
    <section className="box-content h-199 w-199 p-2 border-2 bg-red-200 ...">
    
    <div className="">
        <h3 className="absolute top-4 right-4 z-[99]"> Block Explorer</h3>
        <h3 className=" absolute top-4 left-1 z-[99]"> Ethereum</h3>
    </div>
    <div >
        <Transaction/>
    </div>
   
        
    </section>
    <section></section>
    </div>
)};

export default App;

