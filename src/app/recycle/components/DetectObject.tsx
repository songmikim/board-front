import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

const DetectObject = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const video = videoRef.current

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 500 },
        audio: false,
      })
      .then((stream) => {
        if (video) video.srcObject = stream
      })
  }, [videoRef])

  return (
    <Wrapper>
      <video ref={videoRef} width={500} height={500} autoPlay></video>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </Wrapper>
  )
}

export default React.memo(DetectObject)
