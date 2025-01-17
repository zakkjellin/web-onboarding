import * as React from 'react'

export const useDocumentScroll = (
  callback: (scrollStatus: {
    previousScrollTop: number
    currentScrollTop: number
    scrollDirection: 'down' | 'up'
  }) => void,
) => {
  const [, setScrollTop] = React.useState(0)
  let previousScrollTop = 0

  const onScroll = () => {
    const element = document.documentElement || document.body
    const currentScrollTop = element.scrollTop

    setScrollTop((previousValue) => {
      previousScrollTop = previousValue
      return currentScrollTop
    })

    const scrollDirection =
      currentScrollTop >= previousScrollTop ? 'down' : 'up'

    callback({ previousScrollTop, currentScrollTop, scrollDirection })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
