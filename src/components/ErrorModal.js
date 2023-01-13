import { useDispatch } from "react-redux";
import { getCartItems } from "../features/cart/cartSlice";
import { clearError, } from "../features/error/errorSlice";

export const ErrorModal = ({ error }) => {
  const dispatch = useDispatch();
  const handleClickCancel = () => dispatch(clearError())
  const handleClickConfirm = () => {
    dispatch(getCartItems())
    dispatch(clearError())
  };
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>{error}</h4>
        <div className='btn-container'>
          <button type='button' className='btn confirm-btn' onClick={handleClickConfirm}>
            Retry
          </button>
          <button type='button' className='btn clear-btn' onClick={handleClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};