interface Props {
  linkHandler: () => Promise<void>
  deleteHandler: () => void
  isDesign: boolean
}

export function OptionsBox ({ deleteHandler, linkHandler, isDesign }: Props) {
  const masterString = isDesign ? 'Diseño' : 'Tatuaje'
  const handleLinkClick = () => {
    linkHandler()
      .catch((error) => {
        console.error('Error al copiar el texto: ', error)
      })
  }

  return <div className="py-2 rounded-lg flex flex-col bg-neutral-800 align-start [&>button]:transition-colors">
    <button name={'Generar Link de ' + masterString} onClick={handleLinkClick} className="hover:bg-neutral-700 px-2 py-2 flex justify-start">Generar Link de {masterString}</button>
    <button name={'Borrar ' + masterString} onClick={deleteHandler} className="hover:bg-neutral-700 px-2 py-2 flex justify-start text-red-600">Borrar {masterString}</button>
  </div>
}
