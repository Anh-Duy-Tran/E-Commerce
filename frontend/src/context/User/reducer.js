import Cookies from "js-cookie"
import cartController from "../../controllers/cart"

export const reducer = (state, action) => {
  switch (action.type) {
    
    case "update-count" : {
      return {
        ...state,
        cartCount : action.payload
      }
    }

    case "update-total-price" : {
      return {
        ...state,
        totalPrice : Number((action.payload).toFixed(2))
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
        products : action.products.sort((a, b) => 0.5 - Math.random()),
        category : action.category,
        stores : action.stores
      }
    }

    case "logout" : {
      Cookies.remove('access_token');
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

    case "open-register" : {
      return {
        ...state,
        registerOpen : true
      }
    }

    case "close-register" : {
      return {
        ...state,
        registerOpen : false
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
        products : action.payload.sort((a, b) => 0.5 - Math.random()),
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

    case "set-login-message" : {
      return {
        ...state,
        loginMessage : action.payload
      }
    }

    case "set-signup-message" : {
      return {
        ...state,
        signupMessage : action.payload
      }
    }

    case "set-product-preview" : {
      return {
        ...state,
        productPreview : action.payload
      }
    }

    case "togle-preview" : {
      return {
        ...state,
        previewOpen : !state.previewOpen
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
  registerOpen: false,
  fetchStatus: undefined,

  cartCount : undefined,
  totalPrice : undefined,

  loginMessage : "",
  signupMessage : "",

  productPreview : null,
  previewOpen : false,

  products : {},
  category : {},
  stores : {}
}

