import { createContext, useReducer } from 'react';

export const PersonalInfoContext = createContext();

export const personalInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return {
        personalInfo: action.payload,
      };
    case 'CREATE_PERSONAL_INFO':
      return {
        personalInfo: [action.payload, ...state.personalInfo],
      };
    case 'DELETE_PERSONAL_INFO':
      return {
        personalInfo: state.personalInfo.filter(pi => pi._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PersonalInfoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personalInfoReducer, {
    personalInfo: null,
  });

  return (
    <PersonalInfoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
