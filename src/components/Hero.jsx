import Spline from '@splinetool/react-spline'

function Hero({ onStart }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-orange-400 shadow-lg shadow-purple-500/30" />
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-sm">
          Master any topic with an AI study coach
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80">
          Paste a concept, question, or reading. Get clear explanations, worked examples, and a mini study plan.
        </p>
        <button
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-5 py-3 backdrop-blur border border-white/20 transition-colors"
        >
          Start a study session
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
    </div>
  )
}

export default Hero
