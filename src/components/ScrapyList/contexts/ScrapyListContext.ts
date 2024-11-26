import { createContext } from 'react'
import useScrapyListState from '../hooks/useScrapyListState'

const ScrapyContext = createContext<ReturnType<typeof useScrapyListState> | null>(null)

export default ScrapyContext
