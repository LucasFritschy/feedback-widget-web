import { ArrowLeft } from "phosphor-react";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../../ScreenshotButton";
import { FeedbackType, feedbackTypes } from "..";
import { FormEvent, useState } from "react";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType
  onRestartFeedback: () => void
}

export function FeedbackContentStep({ feedbackType, onRestartFeedback }: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<null | string>(null)
  const [comment, setComment] = useState('')

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    console.log(comment, screenshot)
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute left-5 top-5 text-zinc-400 hover:text-zinc-100"
          onClick={() => onRestartFeedback()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={(e) => handleSubmitFeedback(e)}>
        <textarea
          className="min-w-[304] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 "
            disabled={comment.length === 0}
          >Enviar Feedback</button>
        </footer>
      </form>
    </>
  )
}