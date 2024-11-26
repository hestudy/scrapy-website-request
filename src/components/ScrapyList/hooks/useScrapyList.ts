import { useContext } from 'react'
import ScrapyContext from '../contexts/ScrapyListContext'

const useScrapyList = () => {
  const context = useContext(ScrapyContext)

  return {
    ...context,
  }
}

export default useScrapyList
