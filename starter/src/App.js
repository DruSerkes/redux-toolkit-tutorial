import { Navbar } from './components/Navbar'
import { CartContainer } from './components/CartContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, } from 'react';
import { calculateTotals, getCartItemsWithError } from './features/cart/cartSlice';
import { Modal } from './components/Modal';
import { ErrorModal } from './components/ErrorModal';

function App() {
  const { cartItems, isLoading } = useSelector(state => state.cart)
  const { isShowing } = useSelector(state => state.modal);
  const { showError } = useSelector(state => state.error);
  const hasRunInitialCartFetch = useRef(false)
  const dispatch = useDispatch();

  const fetchCartItems = useCallback(async () => {
    if (hasRunInitialCartFetch.current) return;

    hasRunInitialCartFetch.current = true;
    dispatch(getCartItemsWithError()) // SHOWCASE ERROR HANDLING AND RETRY FUNCTIONALITY
  }, [dispatch])

  useEffect(() => {
    if (!cartItems.length && ~hasRunInitialCartFetch.current) setTimeout(() => fetchCartItems(), 500)
  }, [cartItems, fetchCartItems, hasRunInitialCartFetch])

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  return (
    <main>
      <Navbar />
      {isLoading
        ? <div className='loading'>
          <h1>Loading...</h1>
        </div>
        : <CartContainer />}
      {isShowing && <Modal />}
      {!!showError && <ErrorModal error={showError} />}
    </main>
  );
}
export default App;
