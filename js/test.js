const apiEndpoint = 'https://dummyjson.com/products'

let buttonsParent = document.getElementById('buttons')
let productWrapper = document.getElementById('productWrapper')

const getApiProducts = async (url) => {
  const data = await fetch(url + '?limit=5')
  const { products } = await data.json()
  return products
}

const getOneProduct = async (url, id) => {
  const data = await fetch(`${url}/${id}`)
  const product = await data.json()
  return product
}

const storageExist = localStorage.getItem('products')

let newArray = JSON.parse(storageExist) || []

const addToCart = (data) => {
  const idx = newArray.findIndex((item) => item.id === data.id)
  if (idx !== -1) {
    newArray[idx].count += 1
  } else {
    newArray = [
      ...newArray,
      {
        ...data,
        count: 1,
      },
    ]
  }
  localStorage.setItem('products', JSON.stringify(newArray))
}

const renderButtons = async () => {
  const products = await getApiProducts(apiEndpoint)
  await products.forEach((item) => {
    const newElement = document.createElement('button')
    newElement.classList.add('productButton')
    newElement.innerText = item.title
    newElement.onclick = async function () {
      productWrapper.innerHTML = 'Загрузка'
      await getOneProduct(apiEndpoint, item.id).then((response) => {
        productWrapper.innerHTML = `
          <div class="product-item">
            <h2>${response.title}</h2>
            <strong>Price: ${response.price}</strong>
            <img src="${response.images[0]}" />
          </div>
        `
      })
      const button = document.createElement('button')
      button.innerText = 'Add to cart'
      productWrapper.appendChild(button)
      button.addEventListener('click', function () {
        addToCart(item)
      })
    }
    buttonsParent.appendChild(newElement)
  })
}

renderButtons()
