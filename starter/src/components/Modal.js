import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { toggleModal } from "../features/modal/modalSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const handleClickCancel = () => dispatch(toggleModal());
  const handleClickConfirm = () => {
    dispatch(clearCart())
    dispatch(toggleModal())
  };
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button type='button' className='btn confirm-btn' onClick={handleClickConfirm}>
            confirm
          </button>
          <button type='button' className='btn clear-btn' onClick={handleClickCancel}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};