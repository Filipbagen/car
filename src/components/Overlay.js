import React, { forwardRef } from 'react'

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      if (window.innerWidth > 800) {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      } else {
        scroll.current = -e.target.scrollLeft / (e.target.scrollWidth - window.innerWidth)
      }
      let progress = scroll.current.toFixed(2)
      let grad = ((progress * 360) / 1).toFixed(0)
      //   caption.current.innerText = `${Math.abs(grad)}°`
    }}
    className='scroll'
  >
    <div className='slide'>
      <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p>
    </div>
    <div className='slide'>
      {/* <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p> */}
    </div>
    <div className='slide'>
      <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p>
    </div>
    <div className='slide right'>
      <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p>
    </div>
    <div className='slide'>
      <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p>
    </div>
    <div className='slide'>
      <p>McLaren Racing Limited is a British motor racing team based at the McLaren Technology Centre in Woking, Surrey, England.</p>
    </div>
  </div>
))

export default Overlay
