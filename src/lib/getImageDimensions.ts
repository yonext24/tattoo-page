export async function getImageDimensionsFromFile (file: File): Promise<{ width: number, height: number, url: string }> {
  return await new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()

    reader.onload = function (e) {
      const result = e.target?.result

      if (typeof result === 'string' && result !== null) {
        image.onload = function () {
          resolve({
            width: image.width,
            height: image.height,
            url: result
          })
        }

        image.src = result
      } else {
        reject(new Error('Error al leer la imagen'))
      }
    }

    reader.readAsDataURL(file)
  })
}
