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

const ConfirmModal: React.FC<Props> = ({ cancel, confirm }) => {
  return (
    <Wrapper>
      <StyledConfirmModal>
        <P>Är du säker på att du vill ta bort övningen?</P>
        <ButtonContainer>
          <Button variant="red" onClick={() => confirm()}>
            Ta bort
          </Button>
          <Button variant="blue" onClick={() => cancel(false)}>
            Avbryt
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
  cancel: (isOpen: boolean) => void;
  confirm: () => void;
};

const Modal: React.FC<Props> = ({ cancel, confirm }) => {
  return createPortal(<ConfirmModal confirm={confirm} cancel={cancel} />, body);
};

export default Modal;
