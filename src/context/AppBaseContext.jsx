import React, { createContext, useReducer, useContext, useEffect } from "react";
import { GetAuthToken } from "../services/AsyncStorage";


const AppContext = createContext(null);

export function AppBaseProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialValues);
  useEffect(() => {
    authTokenFunction();
  }, []);

  const authTokenFunction = async () => {
    let token = await GetAuthToken();
    if (token) {
      console.log("first", token);
      dispatch({ type: DispatchActionType.LogedInUser });
    } else {
      dispatch({ type: DispatchActionType.NewUser });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Use this hook to use the context inside any page or navigation
 * @returns
 */
export function useAppBaseContext() {
  return useContext(AppContext);
}

export const UserType = {
  NewUser: "NewUser", // for the first time
  LoggedInUser: "LoggedinUser", // after login success
  LoggedOutUser: "LoggedOutUser", // after logout success
};

export const DispatchActionType = {
  NewUser: "NewUser", // default
  LogedInUser: "LoggedinUser", // after login success action
  Logout: "Logout", // after logout success
  userData: "userData",
  cartData:'CartData'
};

const initialValues = {
  userType: "",
  token: "",
  userData: {},
  cartData:[]
};

/**
 * Reducer. For every new DispatchActionType create, need to add
 * respective swtich case here.
 * @param {*} state - Full app state
 * @param {*} action - the action needs to perfrom
 * @returns
 */
const AppReducer = (state, action) => {
  switch (action.type) {
    case DispatchActionType.NewUser: {
      return {
        ...state,
        userType: UserType.NewUser,
      };
    }
    case DispatchActionType.LogedInUser: {
      return {
        ...state,
        userType: UserType.LoggedInUser,
      };
    }
    case DispatchActionType.Logout: {
      return {
        ...state,
        userType: UserType.LoggedOutUser,
      };
    }
    case DispatchActionType.userData: {
      return {
        ...state,
        userData: action.userData,
      };
    }
    case DispatchActionType.cartData: {
      return {
        ...state,
        cartData: action.cartData,
      };
    }
  }
};
