// Fetches the data from public/data/data.json. It should be there, or this will
// fail!
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
