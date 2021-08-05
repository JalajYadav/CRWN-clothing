import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import CartIcon from '../cart-icon/cart-icon.component.jsx'
import CartDropDown from '../cart-dropdown/cart-dropdown.component.jsx'
// SVG Import
import {ReactComponent as Logo} from '../../assets/crown.svg'
const Header = ({currentUser,hidden}) =>(
    <div className = 'header'>
        <Link className='logo-container' to="/">
        <Logo className='/'/>
        </Link>
        <div className='options'>
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact">
                CONTACT 
            </Link>
            {
                currentUser?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            }
            <CartIcon/>
        </div>
        {
            hidden?null:
        <CartDropDown/>
        }
    </div>
);

const mapStatetoProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStatetoProps)(Header);