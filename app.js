// // // const op=require("./operation");

// // // // console.log(operation.add(8,8));
// // // // // console.log(operation.sub(18,8));
// // // // // console.log(operation.mul(8,8));
// // // // // console.log(operation.div(8,8));



// // // const array=[1,2,3,4]

// // // console.log(op.arr(array))

// // const http = require('http')

// // const server = http.createServer((req,res)=>{
// //     res.end("Hello Everyone")
// // })

// // const PORT = 1000;

// // server.listen(PORT,()=>{
// //     console.log(`my server run on http://localhost:${PORT}`)
// // })


// // const express = require("express");

// // const app = express();

// // app.get("/",(req,res)=>{
// //     const students = [
// //         {id:1,name:"a"},
// //         {id:2,name:"b"}
// //     ]
// //     res.json(students)
// // })

// // const PORT = 1000;

// // app.listen(PORT,()=>{
// //     console.log(`my server run on http://localhost:${PORT}`)
// // })
// // const express = require("express");

// // const app = express();

// // const students = [
// //     { id: 1, name: "a" },
// //     { id: 2, name: "b" }
// // ];


// // app.get("/", (req, res) => {
// //     res.json(students);
// // });

// // app.get("/singleData", (req, res) => {
// //     const { id } = req.query;
// //     if (id) {
// //         const result = students.find((item) => item.id === Number(id));
// //         if (result) {
// //             res.json(result);
// //         }
// //     } else {
// //         res.json(students);
// //     }
// // });

// // const PORT = 1000;

// // app.listen(PORT, () => {
// //     console.log(My server runs on http://localhost:${PORT});
// // });


// const express = require("express");

// const app = express();

// // Sample data
// const students = [
//     { id: 1, name: "a" },
//     { id: 2, name: "b" }   
// ];

// app.get("/", (req, res) => {
//     res.json(students);
// });

// app.get("/params/:id", (req, res) => {
//     const { id } = req.params;
//     const result = students.find((item) => item.id === Number(id));
//     if (result) {
//         res.json(result);
//     } else {
//         res.status(404).json({ message: "Student not found" });
//     }
// });

// app.get("/Queryparams", (req, res) => {
//     const { name } = req.query;
//     if (name) {
//         const result = students.find((item) => item.name.toLowerCase() === name.toLowerCase());
//         if (result) {
//             res.json(result);
//         } else {
//             res.status(404).json({ message: "Student not found" });
//         }
//     } else {
//         res.status(400).json({ message: "Name query parameter is required" });
//     }
// });

// const PORT = 1000;

// app.listen(PORT, () => {
//     console.log(`My server runs on http://localhost:${PORT}`);
// });

const express = require('express');
const app = express();
app.use(express.json())//parse j
const { v4: uuidv4 } = require('uuid');
const mongoose=require('mongoose')
const mongourl="mongodb://localhost:27017/practice123";
mongoose
.connect(mongourl)
.then(()=>{
    console.log("connected to database");
    app.listen(8000,()=>{
        console.log("server is running at http://localhost:8000");
    })
})


const expenseSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true}
});

const expenseModel=mongoose.model("Expensetracker",expenseSchema);//collection name


app.post("/api/expenses",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpense= new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount
    });
    const savedExpense=await newExpense.save();
    res.status(200).json(savedExpense)

})
app.get("/api/expenses",async(req,res)=>{
    const expenses=await expenseModel.find();
    res.json(data);
    })

    app.get("/api/expensesbyId/:id", async (req, res) => {
        const { id } = req.params;
          const result = await expenseModel.findOne({ id });
      
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: "Expense not found" });
          }
      });

      app.put("/api/expensesUpdate/:id", async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        const updatedExpense = await expenseModel.findOneAndUpdate(
          { id },
          updates,
          { new: true }
        );
    
        if (updatedExpense) {
            res.status(200).json(updatedExpense);
   }
    });
    app.delete("/api/expensesdeletebyId/:id", async (req, res) => {
      const { id } = req.params;
        const result = await expenseModel.deleteOne({ id });
    
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "Expense not found" });
        }
    });

    