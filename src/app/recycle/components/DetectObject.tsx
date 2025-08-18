import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  video {
    display: none;
  }
`

const DetectObject = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const detect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      const formData = new FormData()
      formData.append('file', blob, 'canvas.jpg')

      fetch(`${process.env.NEXT_PUBLIC_AI_API_URL2}/detect`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((items) => console.log('items', items))
    })
  }, [canvasRef])
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    let videoInterval, detectInterval
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 500 },
        audio: false,
      })
      .then((stream) => {
        if (video) video.srcObject = stream

        detectInterval = setInterval(() => {
          detect()
        }, 1000)
      })
      .catch((err) => {
        // 웹캡이 설치되어 있지 않거나, 웹캠 권한을 허용하지 않는 경우..
        console.log('err', err)
      })

    const ctx = canvas?.getContext('2d')
    video?.addEventListener('play', () => {
      videoInterval = setInterval(() => {
        ctx?.drawImage(video, 0, 0, canvas?.width ?? 500, canvas?.height ?? 500)
      }, 0)
    })

    return () => {
      clearInterval(videoInterval)
      clearInterval(detectInterval)
    }
  }, [videoRef, canvasRef, detect])

  return (
    <Wrapper>
      <video ref={videoRef} width={500} height={500} autoPlay></video>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </Wrapper>
  )
}

export default React.memo(DetectObject)
