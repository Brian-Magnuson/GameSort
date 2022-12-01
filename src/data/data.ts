const dataFetch = new Promise((resolve, reject) => {
  fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => {
      resolve(json)
    })
    .catch((error) => {
      reject(error)
    })
})

export default dataFetch
