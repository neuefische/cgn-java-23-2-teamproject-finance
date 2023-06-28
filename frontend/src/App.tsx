
import './App.css'
import {FormEvent, useState} from "react";
import {Posting} from "./model/model.ts";

export default function App() {

    const[input, setInput] = useState<Posting>()
    const[description, setDescription]= useState<string>("")
    const[amount, setAmount] = useState<number>(0)

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        setInput({
            id: "01",
            description: description,
            amount: amount,
            category: "income"
        }
    )
       
    }

    function addVisitor(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setVisitors([...visitors, newVisitor])
        setNewVisitor({
            id: "",
            "firstName": "",
            "lastName": "",
        })
    }

  return (
      <>
          <form onSubmit={handleSubmit}>
              <h1>Finanzen virtuelles Tierheim</h1>

              <input type={"text"} onChange={event => setDescription(event.target.value)} value={description} placeholder={"description"}/>
              <input type={"number"} onChange={event => setAmount(parseInt(event.target.value))} value={amount} placeholder={"amount"}/>
              <button>Add Posting</button>

          </form>



      </>

  )
}


