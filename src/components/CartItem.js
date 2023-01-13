import { useDispatch } from 'react-redux';
import { decrement, increment, removeItem } from '../features/cart/cartSlice';
import { ChevronDown, ChevronUp } from '../icons';

export const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  const handleIncrement = () => dispatch(increment(id))
  const clearItem = () => dispatch(removeItem(id))
  const handleDecrement = () => {
    if (amount === 1) return dispatch(removeItem(id))
    dispatch(decrement(id));
  };
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button className='remove-btn' onClick={clearItem}>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className='amount-btn' onClick={handleIncrement}>
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* decrease amount */}
        <button className='amount-btn' onClick={handleDecrement}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};