const express = require("express");
const morgan = require("morgan");

const app = express();

//settings , No cambiar el orden 
app.set('case sensitive routing', true)
app.set('appName', 'Express Project')
app.set('port', 4000)

//variable json para consultas 
let products = [
  {
    id: "1",
    name: "carlos",
    age: "20",
  },
  {
    id: "2",
    name: "quiroz",
    age: "21"
  }
];

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.get("/userName", (req, res) =>{
  res.send("userNamePage")
})

app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/products", (req, res) => {
  const newproduct = { ...req.body, id: products.length + 1 };
  products.push(newproduct);
  res.send(newproduct);
});

app.put("/products/:id", (req, res) => {
  
  const newData = req.body
  const productfound = products.find(
    (product) => product.id === req.params.id);

  if (!productfound)
    return res.status(404).json({
      message: "Product not found",
    });

   products = products.map(p => p.id === req.params.id ? {...p, ...newData} : p)
  res.json({
    message : "Product updating succesfully"
  })
});

app.delete("/products/:id", (req, res) => {
  const productfound = products.find(
    (product) => product.id === req.params.id);

  if (!productfound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter(p => p.id !== req.params.id)
  
  res.sendStatus(204);
  
});


app.get("/products/:id", (req, res) => {
  const productfound = products.find((p) => p.id === req.params.id);
  if (!productfound)
    return res.status(404).json({
      message: "Product not found",
    });

  console.log(productfound);
  res.json(productfound);
});

app.listen(app.get('port'));
console.log(`server ${app.get('appName')} on port ${app.get('port')}`);
