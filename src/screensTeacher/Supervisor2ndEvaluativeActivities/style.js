import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;

    @media(max-width: 768px) {
        padding: 0;
    }
`;

export const ContainerStudent = styled.div`
    width: 94%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    padding: 20px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;

    @media(max-width: 768px) {
      padding: 10px;
    }
`;
export const DataSelected = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    //padding-right: 20px;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;
export const DivButton = styled.div`
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;

    @media(max-width: 768px) {
        justify-content: center;
        align-items: center;
    }
`;

export const List = styled.div`
  display: flex;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ListChecked = styled.div`
    border-top: 2px solid #1d7f14; /* Borda da lista */
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin: 0 auto;
`;

export const Emp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 375px)  {
      padding: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 0px;
    }
`;

/*export const EmpEdit = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    //gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    #nota {
      width: 45%;
    }


    @media (max-width: 375px)  {
      padding: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 0px;
    }
`;*/

export const Conceito = styled.div`
    color: ${({ grade }) => {
    switch (grade) {
      case 'A': return '#1d7f14';
      case 'B': return 'blue';
      case 'C': return 'orange';
      case 'D': return 'red';
      default: return 'black';
    }
  }};
    font-weight: bold;

    @media (max-width: 375px)  {
      font-size: 11pt; /* Smartphones pequenos */
      padding: 3px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 13pt; /* Smartphones pequenos */
      padding: 5px;
    }
    
`;

export const Matter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
`;

export const DivInfo = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;
export const DivInfoDate = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;

/*export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos 
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos 
      padding: 3px;
    }
    
  @media (max-width: 768px) {
    //padding: 8px;
  }
`;*/

export const Span = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 500px;
    height: 90%;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        //max-width: 140px;
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
       // max-width: 160px;
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
        //max-width: 230px;
    }
`;

export const SpanEdit = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    height: 90%;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        //max-width: 140px;
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
       // max-width: 160px;
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
        //max-width: 230px;
    }
`;

export const SpanChecked = styled.button`
    display: flex;
    align-items: center;
    gap: 20px;
    border: none;
    font-size: 16px;
    color: #333;
`;

export const Btt02 = styled.button`
    padding: 10px;
    width: 90px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 5px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 8px;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;
export const Btt01 = styled.button`
    padding: 10px;
    width: 70%;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 5px;
      
      width: 90%;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 8px;
      width: 90%;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;

export const SelectorContainer = styled.div`
    margin-bottom: 20px;
`;

export const EditContainer = styled.div`
   position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  z-index: 9999; /* Modal sobre outros elementos */
    
`;
export const InputGrade = styled.input`
    width: 60px;
`;
export const Grade = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 3px;
      gap: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 6px;
      gap: 0px;
    }
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const Info = styled.div`
    color: #158fa2;
`;

export const LegendBox = styled.div`
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0px;
        text-align: center;
    }

    p {
        margin: 5px;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
    }
`;

/*export const Input = styled.input`
  width: 35%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
  }
`;*/
export const BoxBtt = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const BoxBttcheck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const SignMessageButtonText = styled.span`
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SignMessageButtonTextBold = styled.span`
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  //max-width: 400px;
  //margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${(props) => (props.cancel ? "#ccc" : "#007bff")};
  color: ${(props) => (props.cancel ? "#000" : "#fff")};
`;

export const FloatingWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3); /* Fundo escurecido */
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ActivityItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    align-items: flex-start;
`;

export const ActivityInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-wrap: wrap;

    p {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin: 0;
    }

    @media (max-width: 600px) {
        gap: 8px;
        p {
            font-size: 14px;
        }
    }
`;

export const EditButton = styled.button`
    background: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;
export const EmpEdit = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
export const EditWindow = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px; /* Ajuste o tamanho máximo da janela */
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
export const BlurBackground = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
//background: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
backdrop-filter: blur(10px); /* Efeito de desfoque */
z-index: -1; /* Ficar atrás da janela de edição */
`;

export const BoxButt = styled.div`
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
`;

export const Buttondell = styled.button`
    margin: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const DeleteButton = styled(Buttondell)`
    background: red;
    color: white;
`;

export const CancelButton = styled(Buttondell)`
    background: gray;
    color: white;
`;