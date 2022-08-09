import { Background, ModalContainer } from "./Modal.style";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <>
      <Background $isOpen={open} onClick={onClose} />
      <ModalContainer $isOpen={open}>{children}</ModalContainer>
    </>
  );
}

export default Modal;
