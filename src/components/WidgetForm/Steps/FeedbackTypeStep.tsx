import { FeedbackType, feedbackTypes } from ".."

type FeedbackTypeStepProps = {
  onFeedbacktypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbacktypeChanged }: FeedbackTypeStepProps) {
  return (
    <div className="flex py-8 gap-2 w-full">
      {Object.entries(feedbackTypes).map(([key, value]) => (
        <button
          key={key}
          className="bg-zinc-800 w-24 py-5 rounded-lg flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
          onClick={() => onFeedbacktypeChanged(key as FeedbackType)}
        >
          <span>{value.title}</span>
          <img src={value.image.source} alt={value.image.alt} />
        </button>
      ))}
    </div>
  )
}