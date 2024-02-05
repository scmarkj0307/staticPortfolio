import { createContext, useReducer } from 'react'

export const SampleWorksContext  = createContext()

export const sampleWorksReducer  = (state, action) => {
  switch (action.type) {
    case 'SET_SAMPLEWORKS':
      return { 
        sampleWorks: action.payload 
      }
    case 'CREATE_SAMPLEWORK':
      return { 
        sampleWorks: [action.payload, ...state.sampleWorks] 
      }
    case 'DELETE_SAMPLEWORK':
      return { 
        sampleWorks: state.sampleWorks.filter(sw => sw._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const SampleWorksContextProvider  = ({ children }) => {
  const [state, dispatch] = useReducer(sampleWorksReducer, { 
    sampleWorks: null
  })

  return (
    <SampleWorksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SampleWorksContext.Provider>
  )
}