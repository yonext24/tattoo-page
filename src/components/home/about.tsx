export function About () {
  return <>
    <section className='py-12 gap-6 flex flex-col items-end'>
      <h2 className={'title text-4xl text-white animate-fadeRight transition-[opacity,transform] duration-500 ease-out text-end'}>Tatuador Profesional</h2>
      <div className='max-w-lg text-end'>
        <p className='leading-7 inline'>
          Crecí dibujando para después encontrar el camino en el mundo del tatuaje, sigo estudiando en la
          <a href='https://visuales.una.edu.ar/' className="text-gold inline hover:underline"> Universidad Nacional de las Artes Visuales (U.N.A.) </a>
          para perfeccionar mi conocimiento artístico.
        </p>
        <p className="mt-4 leading-7 inline-block">
          En este momento trabajo en
          <a href='https://www.instagram.com/guadalupeestudiotatuajes/' className='text-gold inline hover:underline mx-1'>Guadalupe Art Studios.</a>
        </p>
        <p className="mt-4 leading-7 inline-block">
          En esta página podes ver mis tatuajes hechos, y diseños disponibles para tatuar. Podés consultar sin miedo en mi
          <a href='https://www.instagram.com/alan.h.tattoo/' className="mx-1 text-gold hover:underline">
            Instagram
          </a>
           o en mi
          <a href='https://api.whatsapp.com/send?phone=1164728262' className="mx-1 text-gold hover:underline">
            Whatsapp
          </a>
          , tatúo mayormente en zona sur.
        </p>
      </div>

      <div className='max-w-lg text-end'>
        <p>Actualmente tatuando y residiendo en Lanús.</p>
      </div>
    </section>
  </>
}
