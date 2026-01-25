import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  color: #000;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const SchoolName = styled.h3`
  margin-bottom: 0px;
  margin-top: 0px;
`

export const Title = styled.h2`
  margin: 0;
`

export const StudentInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
    font-size: 14px;
  }

  th {
   // background: #f0f0f0;
    font-weight: bold;
  }

  td:first-child {
    font-weight: bold;
  }
`
/* 🔹 ESTE ESTAVA FALTANDO */
export const SchoolBlock = styled.div`
  border: 2px solid #000;
  padding: 10px;
  margin-bottom: 24px;
  border-radius: 4px;

  /* garante que tudo fique dentro da borda */
  box-sizing: border-box;
`

export const InfoRow = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 3px;
  font-size: 14px;

  p {
    margin: 0;
  }
`
