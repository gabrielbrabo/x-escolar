import styled from 'styled-components';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 15px;
  //margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;

  h3 {
    margin: 0px;
  }

  @media (max-width: 768px) {
    padding: 5px;
    width: 97%;
  }
`;

export const StyledDateCalendar = styled(DateCalendar)`
  
  & .MuiPickersDay-root {
    
  }

  & .MuiTypography-root {
    color: white; 
  }

  & svg {
    color: black;
  }

  & .MuiPickersCalendarHeader-root {
    background-color: #f2e9e1;
  }

  & .MuiDayCalendar-header {
    background-color: #292929;
  }

  & .MuiPickersSlideTransition-root {
    background-color: #f2e9e1
    
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ExitButton = styled.div`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;

  &:hover {
    background-color: #444;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

export const Select = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
