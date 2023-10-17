const fs = require("fs");

class ProductManager{
    constructor(){
        this.products = [];
        this.path ="./products.json";
    }

    async save(data){
        const content = JSON.stringify(data, null, " ")
        try {
            await fs.writeFileSync(this.path, content, "utf-8");
        } catch (error){
            console.log(error)
        }
    }

    async load(){
        try{
            if(fs.existsSync(this.path)){
                const jsonToArray = await fs.readFileSync(this.path, "utf-8");
                this.products = JSON.parse(jsonToArray);
            }
        }
        catch(err){
            console.log(err)
        }
    }

    checkRequiredFields(product){
        const requiredFields = Object.keys(product);
        return requiredFields.every((field)=> product[field] !== undefined)
    }

    getProductIndex(id){
        const index = this.products.findIndex((product) => product.id === id);
        return index
    }

    listEmpty = () => this.products.length === 0

    async deleteProduct(id) {
        if(this.listEmpty()){
            console.log("Lista Vacía");
            return;
        }

        const index = await this.getProductIndex(id);
        if(index === -1){
            console.log("El producto que busca no existe");
            return;
        }
        
        this.products.splice (index, 1);
        console.log(`Este producto, con id ${id} ha sido eliminado`)
        this.save(this.products)
    }

    async updateProduct (id,title,description,price,thumbnail,code,stock){
        if (this.listEmpty()) {
            console.log("Lista Vacía");
            return;
        }

        const index = await this.getProductIndex(id);

        if(index === -1){
            console.log("El producto que busca no existe");
            return;
        }
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
        };
        this.products[index] = product;
        console.log(`El producto con id ${id} ha sido actualizado`);
        this.save(this.products);
    }

    getProducts(){
        return this.products;
        
    }

    getProductById(productId){
        let product = this.products.find(product => product.id === productId);
        if (!product) {
            console.error('Producto no encontrado');
            return product;
        }
        else{
            console.log(product)
            return product;
        }
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!title, !description, !price,!thumbnail, !code, !stock){
            console.error('Todos los campos son obligatorios.');
            return;
        }
        const productCode = this.products.find((cod) => cod.code === code)

        if (productCode){
            console.error(`El código ${code} ya existe`);
            return;
        }
        

        const newProduct = {
            id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
        };
        
        this.products.push(newProduct);
        this.save(this.products);
        console.log("Producto añadido")
    }

}

module.exports = ProductManager;