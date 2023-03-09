import s from '../eventsPage.module.css'

export default function ReadableLinks({ content }) {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/

  // Split the text into an array of words and URLs
  const wordsAndUrls = content.split(urlRegex)

  // Map the array of words and URLs to an array of React elements
  const html = wordsAndUrls.map((wordOrUrl, index) => {
    // If the word or URL is a URL, wrap it in an anchor tag
    if (urlRegex.test(wordOrUrl)) {
      return (
        <a
          key={index}
          href={wordOrUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {wordOrUrl}
        </a>
      )
    }
    // If the word or URL is not a URL, return it as a plain string
    return wordOrUrl
  })

  return <div className={s.eventCard_description}>{html}</div>
}
