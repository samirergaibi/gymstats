import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Button from './Button';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledConfirmModal = styled.div`
  height: 200px;
  width: 80%;
  background: var(--dark);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media screen and (min-width: 600px) {
    width: 500px;
  }
`;

const P = styled.p`
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ConfirmModal: React.FC<Props> = ({
  cancel,
  cancelBtnText = 'Avbryt',
  confirm,
  confirmBtnText = 'Ta bort',
  message = 'Är du säker på att du vill ta bort övningen?',
}) => {
  return (
    <Wrapper>
      <StyledConfirmModal>
        <P>{message}</P>
        <ButtonContainer>
          <Button variant='red' onClick={() => confirm()}>
            {confirmBtnText}
          </Button>
          <Button variant='blue' onClick={() => cancel(false)}>
            {cancelBtnText}
          </Button>
        </ButtonContainer>
      </StyledConfirmModal>
    </Wrapper>
  );
};

let body: HTMLBodyElement;
if (typeof window !== 'undefined') {
  body = document.getElementsByTagName('body')[0];
}

type Props = {
  cancelBtnText?: string;
  confirmBtnText?: string;
  message?: string;
  cancel: (isOpen: boolean) => void;
  confirm: () => void;
};

const Modal: React.FC<Props> = ({
  cancel,
  cancelBtnText,
  confirm,
  confirmBtnText,
  message,
}) => {
  return createPortal(
    <ConfirmModal
      cancelBtnText={cancelBtnText}
      confirmBtnText={confirmBtnText}
      message={message}
      confirm={confirm}
      cancel={cancel}
    />,
    body,
  );
};

export default Modal;
