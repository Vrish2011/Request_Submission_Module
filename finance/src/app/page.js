
"use client"
import React, { useEffect, useMemo, useState, useRef } from "react";
import Chart from "chart.js/auto"
import { _parseObjectDataRadialScale } from "chart.js/helpers";

export default function Home() {
  const canvasRef = useRef(null)
  const dRef = useRef(null)
  const eRef = useRef(null)
  const dateRef = useRef(null)
  const categoryRef = useRef(null)
  const type = useRef(null)
  const typeRef = useRef(null)
  const [expenses, setExpense] = useState([])
  const [page, setPage] = useState("admin")
  const [incomes, setIncomes] = useState([])
  const [typ, setType] = useState("Expense")
  const [sorting, sortBy] = useState(null)
  const[totalBalance, setBalance] = useState(null)
  const ChartRef = useRef(null)
  


  
   
  useEffect(function(){
    ChartRef.current = new Chart(canvasRef.current.getContext("2d"), { type: "bar", data: { labels: expenses.map(item => item.description), datasets: [{backgroundColor: "rgba(34, 197, 94, 0.7)", label: "expenses", data: expenses.map(item => item.expense) }] }, options: { scales: { x: { title: { display: true, text: "Description" } }, y: { title: { display: true, text: "Money" } } } } });
    
  }, [page])

  useEffect(function(){
    setType("Expense")
  })

  useEffect(function(){
    let totalIncome = 0
    let totalExpense = 0
    for(let i = 0; i < expenses.length; i++){
      totalExpense = parseInt(expenses[i].expense) + parseInt(totalExpense)
    }

    for(let i = 0; i < incomes.length; i++){
      totalIncome = parseInt(totalIncome) + parseInt(incomes[i].expense)
    }

    setBalance(totalIncome - totalExpense)

  },[])

  useEffect(function(){
    let totalIncome = 0
    let totalExpense = 0
    for(let i = 0; i < expenses.length; i++){
      totalExpense = parseInt(expenses[i].expense) + parseInt(totalExpense)
    }

    for(let i = 0; i < incomes.length; i++){
      totalIncome = parseInt(totalIncome) + parseInt(incomes[i].expense)
    }

    setBalance(totalIncome - totalExpense)


  }, [expenses])

  useEffect(function(){
    let totalIncome = 0
    let totalExpense = 0
    for(let i = 0; i < expenses.length; i++){
      totalExpense = parseInt(expenses[i].expense) + parseInt(totalExpense)
    }

    for(let i = 0; i < incomes.length; i++){
      totalIncome = parseInt(totalIncome) + parseInt(incomes[i].expense)
    }

    setBalance(totalIncome - totalExpense)


  }, [incomes])
  

  function AddExpense(){
    
    if(!typeRef.current.value || !dateRef.current.value || !eRef.current.value || !categoryRef.current.value){
      return;
    }
    if(type.current.value== "expense"){
      let update_expense = [...expenses]
      update_expense.push({expense: eRef.current.value, description: dRef.current.value, category: categoryRef.current.value, date:dateRef.current.value, type:type.current.value})
      
      setExpense(update_expense)
      if(typ == "Expense" && sorting){
        
        let date = dateRef.current.value
        let year_month_day = date.split("-")
        let year = year_month_day[0]
        let month = year_month_day[1]
        let index = null
        for(let i = 0; i < ChartRef.current.data.labels.length; i++){
      
          if(ChartRef.current.data.labels[i] == `${year}-${month}`){
            index = i
            break;

          }
        }
        
        

        if(index == null){
          
          
          ChartRef.current.data.datasets[0].data.push(eRef.current.value)
          ChartRef.current.data.labels.push(`${year}-${month}`)
          ChartRef.current.update()
          return;
        }
        
        let prev = ChartRef.current.data.datasets[0].data[index]
        
        ChartRef.current.data.datasets[0].data[index] = parseInt(prev) + parseInt(eRef.current.value)
        ChartRef.current.update()
      

      



       
       



        
      }
      if(typ == "Expense" && !sorting){
        
        
        ChartRef.current.data.labels = update_expense.map(item => item.description)
        ChartRef.current.data.datasets[0].data = update_expense.map(item => item.expense);
        
        ChartRef.current.update()
      
      
      
      
      
    
   
    
   
    
    
    


    }
    }
    else if(type.current.value == "Income"){
      let update_income = [...incomes]
      update_income.push({expense: eRef.current.value, description: dRef.current.value, category: categoryRef.current.value, date:dateRef.current.value, type:type.current.value})
      
      setIncomes(update_income)
      if(typ == "Income" && sorting){
        let date = dateRef.current.value
        let year_month_day = date.split("-")
        let year = year_month_day[0]
        let month = year_month_day[1]
        let index = null
        for(let i = 0; i < ChartRef.current.data.labels.length; i++){
          if(ChartRef.current.data.labels[i] == `${year}-${month}`){
            index = i
            break;

          }
        }

       
       

        if(index == null){
          ChartRef.current.data.datasets[0].data.push(eRef.current.value)
          ChartRef.current.data.labels.push(`${year}-${month}`)
          ChartRef.current.update()
          return;
        }



       
       

        
        let prev = ChartRef.current.data.datasets[0].data[index]
        
        ChartRef.current.data.datasets[0].data[index] = parseInt(prev) + parseInt(eRef.current.value)
        ChartRef.current.update()
        
      
       
       

        
        
        
        

        
      }
      if(typ == "Income" && !sorting){
        const update_expense = update_income
        ChartRef.current.data.labels = update_expense.map(item => item.description)
        ChartRef.current.data.datasets[0].data = update_expense.map(item => item.expense);
        ChartRef.current.update()
      
      
      
      
      

    }
    


    }
    
    
    
  
  


  
  
  }

  function DeleteExpense(index){
    let to_delete = expenses[index].expense
    let update_expense = [...expenses].filter((expense, i) => (i != index))

    setExpense(update_expense)
    if(typ == "Expense" && !sorting){
      ChartRef.current.data.labels = update_expense.map(item => item.description)
      ChartRef.current.data.datasets[0].data = update_expense.map(item => item.expense);
      ChartRef.current.update()
    
    
    
    }
    else if(typ == "Expense" && sorting){
      let date = dateRef.current.value
      
      let year_month_day = date.split("-")

      let year = year_month_day[0]
      let month = year_month_day[1]
      let index = null
      for(let i = 0; i < ChartRef.current.data.labels.length; i++){
        if(ChartRef.current.data.labels[i] == `${year}-${month}`){
          index = i
          break;

        }
      }

      let sub = parseInt(ChartRef.current.data.datasets[0].data[index])
      
      let prev = parseInt(to_delete)
    
      ChartRef.current.data.datasets[0].data[index] = sub - prev
      ChartRef.current.update()


    }

    
    

  }

  function DeleteIncome(index){
    let to_delete = incomes[index].expense
    let update_expense = [...incomes].filter((expense, i) => (i != index))

    setIncomes(update_expense)
    if(typ == "Income" && !sorting){
      ChartRef.current.data.labels = update_expense.map(item => item.description)
      ChartRef.current.data.datasets[0].data = update_expense.map(item => item.expense);
      ChartRef.current.update()
    
    
    
    }

    else if(typ == "Income" && sorting){
      let date = dateRef.current.value
      
      let year_month_day = date.split("-")

      let year = year_month_day[0]
      let month = year_month_day[1]
      let index = null
      for(let i = 0; i < ChartRef.current.data.labels.length; i++){
        if(ChartRef.current.data.labels[i] == `${year}-${month}`){
          index = i
          break;

        }
      }

      let sub = parseInt(ChartRef.current.data.datasets[0].data[index])
      
    
      
      let prev = parseInt(to_delete)
      
      ChartRef.current.data.datasets[0].data[index] = sub - prev
      ChartRef.current.update()
    


    }

  }

  function sortByMonth(){
    let list = null
    sortBy("month")
    
    let amounts = {}
    if(typ == "Expense"){
      list = expenses

    }

    else if(typ == "Income"){
      list = incomes
    }
    

    

    

    for(let i = 0; i < list.length; i++){
      let year_month_day = list[i].date.split("-")
      
      let month = year_month_day[1]
      
    

      let year = year_month_day[0]
    
      if(!Object.keys(amounts).includes(`${year}-${month}`)){
        amounts[`${year}-${month}`] = parseInt(list[i].expense)
        
        
      }
      else{
        let prev = amounts[`${year}-${month}`]
        amounts[`${year}-${month}`] = parseInt(prev) + parseInt(list[i].expense)

      }

      

      
        
      
      
      

      

    }
    
    ChartRef.current.data.labels = Object.keys(amounts)
    ChartRef.current.data.datasets[0].data = Object.values(amounts)
    ChartRef.current.update()

  }

  function sortByDescription(){

    sortBy(null)
    if(typ == "Expense"){

      ChartRef.current.data.labels = expenses.map((expense, index) => expense.description)
      
      
      ChartRef.current.data.datasets[0].data = expenses.map((expense, index) => expense.expense)
      ChartRef.current.update()
     }

    else{
            ChartRef.current.data.labels = incomes.map((expense, index) => expense.description)
            ChartRef.current.data.datasets[0].data = incomes.map((expense, index) => expense.expense)
            ChartRef.current.update()
      
      
     }

  }

  function ChangeType(){
    
    setType(typeRef.current.value)
    sortBy(null)
    if(typeRef.current.value == "Income"){

      ChartRef.current.data.labels = incomes.map(item => item.description)
      ChartRef.current.data.datasets[0].data = incomes.map(item => item.expense);
      ChartRef.current.data.datasets[0].label = "incomes"
      ChartRef.current.update()
      
    }
    else if(typeRef.current.value == "Expense"){
      ChartRef.current.data.labels = expenses.map(item => item.description)
      ChartRef.current.data.datasets[0].data = expenses.map(item => item.expense);
      ChartRef.current.data.datasets[0].label = "expenses"
      ChartRef.current.update()
      

    }
  }

  if(page == "Regular"){
    return(<div>

      <div id="add_Expense">
        <button onClick={sortByMonth}>Monthly</button>
          <button onClick={sortByDescription}>By Description</button>
      </div>
          
      
      
      
    
      <div id="background">

      </div>
      <div id="Toggle">
        <button onClick={() => setPage("Admin")}>Admin</button>
        <button>Regular</button>
      
      
    </div>

    

      <div id="total_balance">
        <h3>Total balance</h3>
        <h4>{totalBalance}</h4>
      
      
      
      </div>
      

    <div className="header">Finance Board</div>
          <div className="bars">
        <select id="option" ref={typeRef} onChange={ChangeType}>
          <option value = "Expense">Expense</option>
          <option value="Income">Income</option>
         </select>
     
        
        <canvas ref={canvasRef}>

        </canvas>

      
      </div>

    </div>)
  }
  return(<div>
    <div id="background">


    </div>
    <div id="Toggle">
      <button>Admin</button>
      <button onClick={() => setPage("Regular")}>Regular</button>
    </div>
    <div id="add_Expense">
      <button onClick={sortByMonth}>Monthly</button>
      <button onClick={sortByDescription}>By Description</button>
    </div>
    <div id="total_balance">
      <h3>Total balance</h3>
      
      <h4>{totalBalance}</h4>

    </div>
    
    <div id="total_expense">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (<li key={index}><div>{expense.description} : {expense.expense}</div><button onClick={() => DeleteExpense(index)}>Delete</button></li>))}
      </ul>
      
    </div>

    <div id="totalincome">
      <h2>Incomes</h2>
      <ul>{incomes.map((expense, index) => (<li><div>{expense.description} : {expense.expense}</div><button onClick={() => DeleteIncome(index)}>Delete</button></li>))}</ul>
      
    </div>

    <div className="header">Finance Board</div>
    <div className="expense_form">
      <input type="date" placeholder="Date" ref={dateRef}/>
      <input type="number" placeholder="Amount" ref={eRef}/>
      <input type="text" placeholder="Description" ref={dRef}/>
      <input type="text" placeholder="category" ref={categoryRef} />
      <select ref={type}>
        <option value="Income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button onClick={AddExpense}>Add Expense</button>
      </div>
      
      <div className="bars">
        <select id="option" ref={typeRef} onChange={ChangeType}>
          <option value = "Expense">Expense</option>
          <option value="Income">Income</option>
         </select>
     
        
        <canvas ref={canvasRef}>

        </canvas>

      
      </div>
  </div>)
}

