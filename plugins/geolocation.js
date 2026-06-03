export default (context, inject) => {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!process.client) {
        reject("Geolocation only works on client side")
        return
      }

      if (!navigator.geolocation) {
        reject("Geolocation not supported")
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
        },
        (error) => {
          reject(error.message)
        }
      )
    })
  }

  const watchLocation = (callback) => {
    if (!process.client) return

    return navigator.geolocation.watchPosition((position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  inject("geo", {
    getLocation,
    watchLocation
  })
}