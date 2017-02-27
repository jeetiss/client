import { createStore as cs } from 'redux'
import example from './reducers/reducer'

export default function createStore () {
  return cs(example)
}

