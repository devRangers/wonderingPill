import { Background, ModalContainer } from "./Modal.style";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  isInfoPage?: boolean;
  onClose: () => void;
}

function Modal({ children, open, onClose, isInfoPage }: ModalProps) {
  if (!open) return null;

  return (
    <>
      <Background $isOpen={open} onClick={onClose} />
      <ModalContainer $isOpen={open} $isInfoPage={isInfoPage}>
        {children}
      </ModalContainer>
    </>
  );
}

export default Modal;
