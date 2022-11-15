import { useMediaQuery } from "react-responsive";
import { Background, ModalContainer } from "./Modal.style";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  isInfoPage?: boolean;
}

function Modal({ children, open, onClose, isInfoPage }: ModalProps) {
  const isWide = useMediaQuery({ query: "(min-width : 1500px)" });
  if (!open) return null;

  return (
    <>
      <Background $isOpen={open} onClick={onClose} />
      <ModalContainer $isOpen={open} $isWide={isWide} $isInfoPage={isInfoPage}>
        {children}
      </ModalContainer>
    </>
  );
}

export default Modal;
