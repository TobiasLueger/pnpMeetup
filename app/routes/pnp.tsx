import { useEffect, useRef } from "react";

export default function Pnp() {
  const buildPnpRef = useRef(null)

  const draw = (ctx:any, frameCount:any) => {
    ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(100, 100, 100*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.arc(30, 30, 22, 20, 30)
    ctx.rect(200, 200, 100 ,100)
    ctx.fill()
  }
  
  useEffect(() => {
    
    const canvas:any = buildPnpRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId:any
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return (
    <div>
      <h1>Build PNP</h1>
      <canvas ref={buildPnpRef} className="w-full bg-white aspect-square" width="1920" height="1920"></canvas>
    </div>
  );
}
