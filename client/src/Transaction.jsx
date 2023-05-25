import { useState, useEffect } from "react";
import server from "./server";

function Transaction(){
    const[ethPrice, setPrice] = useState("")
    const[TxHash, setTxHash] = useState('')
    const[TxbyHash, setTxbyHash] = useState('')
    const[gasPrice, setgasPrice] = useState('')
    const[value,setvalue] = useState('')
    const[checker, setChecker] = useState(true)
    const[error,setError] = useState(false)

    const setValue = (setter) => (evt) => setter(evt.target.value);


    async function getPrice(){
        if(checker === true){
        const {data:{price},} =  await server.get(`/ethPrice`)
        setPrice(price.toString())
        setChecker(false)
        }
      }
    getPrice();
            
    async function getTxByHash(e){ 
        if(TxHash.length === 66){
            e.preventDefault();
            setError(false)
            const {data:{TxbyHash},data:{gasPrice},data:{value}} =  await server.get(`block/${TxHash}`)
            setTxbyHash(TxbyHash);
            setgasPrice(`${gasPrice/10e8} Gwei`)
            setvalue(`${value/10e17} Eth`)
            setTxHash('')
        }else{
            e.preventDefault()
            setError(true)
            setTxHash('')
        }         
    }  

    useEffect(()=>{
        if(!TxbyHash){
            document.getElementById('transaction').style.display = "none"       
        }else{
            document.getElementById('transaction').style.display = "block"
            document.getElementById('error').style.display = "none"
        }
    },[TxbyHash]) 
    useEffect(()=>{
        if(error){
            document.getElementById('transaction').style.display = "none"
            document.getElementById('error').style.display = "block"
        }else{
            document.getElementById('error').style.display = "none"
        }
    },[error])   

return(
    <div className="m-10">
        <div >
        <p >Eth price : ₦{ethPrice}</p>
        </div>
        <div className="right-4">
            <form  onSubmit={getTxByHash}>
                <input size={50} placeholder="Search Transaction by Hash" 
                value={TxHash} onChange={setValue(setTxHash)}>
                </input>
                <button className="bg-sky-500 hover:bg-sky-700 ..."> submit</button>
            </form>
        </div>
        <div id="transaction">
            <br /><ul class="odd:bg-white even:bg-slate-50">
                <li> Transaction Hash: {TxbyHash.hash}</li>
                <li> Block Hash: {TxbyHash.blockHash}</li>
                <li> Block Number: {TxbyHash.blockNumber}</li>
                <li> Gas Price: {gasPrice}</li>
                <li> From: {TxbyHash.from}</li>
                <li> To: {TxbyHash.to}</li>
                <li> Value: {value}</li>
                <li> Nonce: {TxbyHash.nonce}</li>
            </ul>
        </div>
        <div id="error">
            <h3>Error!!!.....You have an incomplete Hash</h3>
        </div>
    </div>
    
)};

export default Transaction;