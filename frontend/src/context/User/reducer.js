import Cookies from 'js-cookie';

import loginService from '../../services/login';

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const authToken = (token) => {
  if (token === undefined) {
    return Promise.resolve(false);
  }

  return loginService
    .authenticate(token)
    .then(() => true)
    .catch(() => false);
}
 

export const reducer = (state, action) => {
  switch (action.type) {
    
    case "set-user" : {
      return {
        ...state,
        user : action.payload
      }
    }

    // case "verify-user": {
    //   const token = Cookies.get('access_token');
      
    //   return authToken(token).then(
    //     res => {
    //       if(res) {
    //         return {
    //           ...state,
    //           user : parseJwt(token)
    //         }
    //       } else {
    //         return {
    //           ...state,
    //           user : null
    //         }
    //       };
    //     })
    // }
    
    // case "login": {
    //   const data = new FormData(action.target);
    //   const credentials = {
    //     username: data.get('username'),
    //     password: data.get('password'),
    //   };
    //   loginService
    //     .login(credentials)
    //     .then(token => {
    //         Cookies.set('access_token', token);
    //         return {
    //           ...state,
    //           loginOpen : false,
    //           user : parseJwt(token)
    //         };
    //       })
    //     .catch(console.log);
    //   return {...state};
    // }

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

  products : {},
  category : {},
  stores : {}
}

