function cadastrarProduto(){
    const name = document.getElementById("name")
    const price = document.getElementById("price")
    const desc = document.getElementById("desc")
    const type = document.getElementById("type")
    const image = document.getElementById("image")
    const form = document.getElementById("form")
    const containerErro = document.getElementById("erro")

    form.addEventListener("submit", async(e)=> {
        e.preventDefault()
        console.log(type.value)
        const data = JSON.stringify({
            name : name.value,
            price : price.value,
            description : desc.value,
            type : type.value,
            image : image.value
        })

        let response 
        let json 

        response = await fetch("http://localhost:9090/products", {
            method: "POST",
            body : data,
            headers : {"Content-type" : "application/json; charset=UTF-8"}
        })

        json = await response.json()

        containerErro.innerHTML = `<h1> ${json.erro} </h1>`
        containerErro.innerHTML = `<h1> ${json.msg} </h1>`

    })
    
}


async function getProduct(){

    let response 
    let json 
    
    const container = document.getElementById("containerProducts")
    response = await fetch("http://localhost:9090/products", {
        method: "get",
        headers : {"Content-type" : "application/json; charset=UTF-8"}
    })

    json = await response.json()
    console.log(json);
    json.Products.forEach(element => {
        // console.log(element);
        var card = document.createElement("div")
        card.innerHTML = ` <div class="card1" value = "${element.id}">
                <img src="${element.image}" alt="">
                <h2>${element.name}</h2>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Deletar</button>
            </div>`

            container.appendChild(card)
    });

    const btnEditar = document.getElementsByClassName("edit-btn")
    const btnDeletar = document.getElementsByClassName("delete-btn")


    // for (let index = 0; index < btnEditar.length; index++) {
    //     btnEditar[index].addEventListener("click", (event)=>{
    //         var indexUpdate = event.target.parentElement.getAttribute("value")
    //         console.log(indexUpdate);

    //     })
        
    // }
    

    for (let j = 0; j < btnDeletar.length; j++) {
        btnDeletar[j].addEventListener("click", async (event)=> {
            var indexDelete = event.target.parentElement.getAttribute("value")
            await fetch(`http://localhost:9090/products/${indexDelete}`,{
               method : "delete" 
            })
            window.location.reload()
            console.log(indexDelete)
        })
        
    }

}

getProduct()

cadastrarProduto()