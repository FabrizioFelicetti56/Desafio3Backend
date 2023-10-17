const express = require('express');
const ProductManager = require('./entrega3.js');

const app = express();


const productManager = new ProductManager();
productManager.load()

    console.log("Empty list:", productManager.getProducts());
    productManager.addProduct(
        "Pan",
        "Pan caliente rico",
        200,
        "12314132",
        "abc123",
        20,
    )
    
    productManager.addProduct(
        "Detergente",
        "Hace mucha espuma",
        200,
        "12314132",
        "abc123",
        20,
    )
    
    productManager.addProduct(
        "Pepas",
        "Galletitas deliciosas",
        200,
        "12314132",
        "abc1234",
        20,
    )

    productManager.addProduct(
        "Detergente",
        "Hace mucha espuma",
        200,
        "12314132",
        "abc1235",
        20,
    )

    productManager.updateProduct(
        2,
        "Peras",
        "Frutas Ricas Update saludable",
        300,
        "21312431",
        "abc1234",
        23
    )
    
productManager.getProductById(5)
productManager.getProductById(1)
productManager.getProductById(2)
productManager.getProductById(3)
productManager.deleteProduct(3)


const PORT = 8088;

app.use(express.urlencoded({extended:true}))


app.get('/products', async (req, res) => {
    let products = await productManager.getProducts();

    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
    } else {
        res.send(products);
    }
});

app.get('/products/:pid', async(req, res)=>{
    console.log("hola")
    // console.log(req.params.pid);
    let id = req.params.pid;
    let producto = await productManager.getProductById(parseInt(id))
    console.log(id)
    console.log(producto)
    if(producto != null){
        res.json(producto);
        console.log(producto);
    }else{
        res.send("No encontrado")
        console.log(producto);
    }
})

app.listen(PORT, ()=>{
    console.log(`Funcionando en puerto ${PORT}`);
})