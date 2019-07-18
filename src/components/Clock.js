import React from 'react';
import styled from 'styled-components';

const ClockDiv = styled.div`
    color: tomato;
    ${ props => props.Columns && `grid-column: ${props.Columns}`}
`;


const Clock = ( props ) => {
    return (
        <ClockDiv Columns={props.Columns}>
            Clock goes here
        </ClockDiv>
    );
};

export default Clock;
