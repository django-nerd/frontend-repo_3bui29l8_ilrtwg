import { useState } from 'react'
import Hero from './components/Hero'
import ChatUI from './components/ChatUI'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="h-16 border-b border-white/10 flex items-center px-4">
        <div className="font-semibold">StudyGPT</div>
      </header>
      <section className="h-[calc(100vh-4rem)]">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : (
          <ChatUI />
        )}
      </section>
    </div>
  )
}

export default App
