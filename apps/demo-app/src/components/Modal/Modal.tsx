import type React from 'react';
import './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button type="button" onClick={onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
