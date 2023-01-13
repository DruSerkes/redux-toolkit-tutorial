import { useSelector } from 'react-redux';
import { CartIcon, Testing } from '../icons';

export const Navbar = () => {
  const { amount } = useSelector(state => state.cart);

  return (
    <nav>
      <Testing />
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  )
};