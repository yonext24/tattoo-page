export function About () {
  return <>
    <section className='py-12 gap-6 flex flex-col items-end'>
      <h2 className={'title text-4xl text-white animate-fadeRight transition-[opacity,transform] duration-500 ease-out text-end'}>Tatuador Profesional</h2>
      <div className='max-w-lg text-end'>
        <p className='leading-7 inline'>
          Apasionado por el tatuaje y la tinta desde que tengo memoria, crecí dibujando para después encontrar un norte en el tatuaje.
        </p>
        <p className="mt-4 leading-7 inline-block">
          Me especializo en tatuajes con tinta negra, en este momento trabajo en
          <span className='text-gold inline'> Guadalupe Art Studios.</span>
        </p>
        <p className="mt-4 leading-7 inline-block">
          En esta página podes ver mis tatuajes hechos, y diseños disponibles para tatuar. Podés consultar sin miedo en mi
          <a href='https://www.instagram.com/alan.h.tattoo/' className="mx-1 text-gold hover:underline">
            Instagram
          </a>
           o en mi
          <a href='' className="mx-1 text-gold hover:underline">
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
