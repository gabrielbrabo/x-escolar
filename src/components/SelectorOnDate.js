import React, { useState } from 'react';
import styled from 'styled-components';

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff8f0;
`;

const InputDate = styled.div`
  width: 100%;
  max-width: 360px;  /* Limita a largura máxima */
  margin-bottom: 24px;

  @media (max-width: 480px) {
    max-width: 100%;
    margin-bottom: 18px;
    padding: 0 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  transition: border-color 0.25s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

const SaveButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.95rem;
    padding: 10px 0;
  }
`;

const ToGoBack = styled.div`
  margin-top: 12px;
  cursor: pointer;
  text-align: center;
  user-select: none;

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const SignMessageButtonText = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9rem;
`;

const SignMessageButtonTextBold = styled(SignMessageButtonText)`
  font-weight: bold;
  color: #222;
`;

const ResponsivePickers = ({ setSelectedDate, setDay, setMonth, setYear, messageButtonClick }) => {
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    const handleDateChange = () => {
        if (!selected) return;

        const [year, month, day] = selected.split('-');
        setDay(Number(day));
        setMonth(Number(month));
        setYear(Number(year));
        setSelectedDate(selected);
    };

    return (
        <InputArea>
            <InputDate>
                <Label>Data</Label>
                <Input
                    type="date"
                    value={selected}
                    onChange={handleChange}
                />
                <SaveButton onClick={handleDateChange}>Salvar Data</SaveButton>
            </InputDate>

            <ToGoBack onClick={messageButtonClick}>
                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
            </ToGoBack>
        </InputArea>
    );
};

export default ResponsivePickers;