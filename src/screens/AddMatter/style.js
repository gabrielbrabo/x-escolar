import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const SearchSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const MatterList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const MatterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const MatterName = styled.span`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const AddMatterSection = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const WarningBox = styled.div`
  padding: 15px;
  background-color: #ffeb3b;
  color: #333;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const Message = styled.h2`
  font-size: 16px;
  margin: 10px 0;
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 8px 0;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
