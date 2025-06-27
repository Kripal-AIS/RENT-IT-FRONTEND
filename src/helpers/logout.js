
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
const logout = (dispatch)=>{

    dispatch({type:"LOGOUT"})
    Cookies.remove('rentit')
    window.location.pathname  = '/'
    
}

export default logout;