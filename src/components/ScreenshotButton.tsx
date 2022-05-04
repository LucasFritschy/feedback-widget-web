import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "./Loading";

type ScreenshotButtonProps = {
  screenshot: null | string
  onScreenshotTaken: (screenshot: string | null) => void
}

export function ScreenshotButton({ screenshot, onScreenshotTaken }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')
    onScreenshotTaken(base64image)

    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 mr-2 rounded-md border-transparent flex items-end justify-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{ 
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" onClick={() => onScreenshotTaken(null)}/>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => handleTakeScreenshot()}
      className="p-2 mr-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
    >
      {
        isTakingScreenshot ?
          <Loading />
          :
          <Camera className="w-6 h-6" />
      }
    </button>
  )
}