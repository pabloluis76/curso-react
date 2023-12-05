import { useEffect, useState } from "react"
function App() {
  const [enable, setState] = useState(false)

  useEffect(() => {
    console.log('efecto')
  })

  return (
    <>
      <main>
        <h1>Proyecto 3</h1>
        <button onClick={() => setState(!enable)}>
          {enable ? 'Desactivar' : 'Activar'}
        </button>
      </main>
    </>

  )
}

export default App
