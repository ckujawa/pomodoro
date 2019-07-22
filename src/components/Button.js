import styled from 'styled-components';

export const Button = styled.button`
  line-height: 1.2em;
  font-size: 1em;
  font-weight: bold;
  margin: 0 10px;
  padding: 0 10px;
  border: 3x ridge var(--dark);
  background: var(--light);
  border-radius: 5px;
  box-shadow: 3px 3px 5px black;

  &:hover{
    transform: scale(1.1);
    box-shadow: 4px 4px 7px black;
  }
`;