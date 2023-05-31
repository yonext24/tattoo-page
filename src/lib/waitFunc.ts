export async function waitFunc<T> (fn: () => Promise<T>, duration: number, error: string): Promise<T> {
  return await new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => {
      reject(new Error(error))
    }, duration)

    fn()
      .then(resolve)
      .catch(e => {
        reject(new Error(e))
      })
      .finally(() => {
        clearTimeout(id)
      })
  })
}
