import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  background-color: '#c8c8c8'
`

const Button = ({ label }) => (
  <ButtonContainer>
    {label}
  </ButtonContainer>
)

export default Button
