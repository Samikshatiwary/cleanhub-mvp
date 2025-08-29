let isEditing = false;
let editingProductId = null;
async function fetchProducts(){
    const res = await fetch("/products");
    const products = await res.json();
    renderProducts(products);
}
    function renderProducts(products){
    const productList = document.getElementById("productList");
    productList.innerHTML="";
    products.forEach((product)=>{
        const li = document.createElement("li");
        li.innerHTML=`${product.name}-&#8377;${product.price} (${product.category})
        <button onclick="deleteProduct('${product._id}')">Delete</button>
        <button onclick="editProduct('${product._id}','${product.name}','${product.price}','${product.category}')"
        >Edit</button>`;

        productList.appendChild(li);
    });
}

document.getElementById("productForm").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    if(isEditing){
        await fetch(`/products/${editingProductId}`,{method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name, price, category})
        });
        isEditing = false;
        editingProductId = null;
    }
    else 
    {
    
    await fetch("/products",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({name, price, category})
    });
}
    fetchProducts();
    e.target.reset();
});

async function deleteProduct(id){
    await fetch(`/products/${id}`,{method:"DELETE"});
    fetchProducts();
}
function editProduct(id, name, price){
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("category").value = category;
    editingProductId = id;
    isEditing = true;
}

fetchProducts();