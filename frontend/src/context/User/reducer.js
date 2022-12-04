export const reducer = (state, action) => {
  switch (action.type) {
    
    case "update-count" : {
      return {
        ...state,
        cartCount : action.payload
      }
    }

    case "set-user" : {
      return {
        ...state,
        user : action.payload
      }
    }

    case "update-all" : {
      return {
        ...state,
        products : action.products,
        category : action.category,
        stores : action.stores
      }
    }

    case "logout" : {
      return {
        ...state,
        user : null
      }
    }

    case "close-login" : {
      return { 
        ...state,
        loginOpen : false
      }
    }

    case "open-login" : {
      return { 
        ...state,
        loginOpen : true
      }
    }
    
    case "toggle-cart": {
      const event = action.event;
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return state;
      }
      return {
        ...state,
        cartOpen : !state.cartOpen
      }
    }

    case "toggle-menu": {
      const event = action.event;
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return state;
      }
      return {
        ...state,
        menuOpen : !state.menuOpen
      }
    }

    case "update-products": {
      return {
        ...state,
        products : action.payload
      }
    }

    case "update-category": {
      return {
        ...state,
        category : action.payload
      }
    }

    case "update-store": {
      return {
        ...state,
        stores : action.payload
      }
    }

    case "fetching" : {
      return {
        ...state,
        fetchStatus : 'loading'
      }
    }

    case "fetch-success" : {
      return {
        ...state,
        fetchStatus : 'success'
      }
    }

    default:
      return state
  }
}


export const initialState = {
  user : null,
  menuOpen : false,
  cartOpen : false,
  loginOpen: false,
  fetchStatus: undefined,

  cartCount : undefined,

  products : {},
  category : {},
  stores : {}
}

