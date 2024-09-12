const parentElement = document.getElementById('basket')
const newArray = []

const getProductCountOnChange = (data) => {
  newArray.push({})
  localStorage.setItem('products', JSON.stringify(newArray))
}

const getItem = () => {
  const storageExist = localStorage.getItem('products')
  const parsedStorage = JSON.parse(storageExist) || []
  return parsedStorage
}

const setItem = (data) => {
  return localStorage.setItem('products', JSON.stringify(data))
}

const updateQuantity = (event, id) => {
  const value = event.target.value
  const newArray = [...getItem()]
  const idx = newArray.findIndex((item) => item.id === id)
  newArray[idx].count = Number(value)
  setItem(newArray)
}

const countUp = (val, id) => {
  val++
  const products = [...getItem()]
  const idx = products.findIndex((item) => item.id === id)
  products[idx].count = val
  setItem(products)
}

const countDown = (val) => {
  console.log(val)
  val--
}

const getStorageProducts = () => {
  const localStorageItems = JSON.parse(localStorage.getItem('products'))
  localStorageItems.forEach((item) => {
    parentElement.innerHTML += `
        <div class="product">
            <img src="${item.images[0]}" /> </br>
            <h3>${item.title}</h3></br>
            <strong>Price: ${item.price}</strong></br></br>
            <span>Quantitiy:</span> </br></br>
            <button onclick="">-</button>
            <input type="number" value="${item.count}" onchange="updateQuantity(event, ${item.id})" />
            <button onclick="countUp(${item.count}, ${item.id})">+</button>
        </div></br></br></br>
    `
  })
}

getStorageProducts()
