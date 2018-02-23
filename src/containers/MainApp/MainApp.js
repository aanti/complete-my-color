import React from 'react'
import styled from 'styled-components'

import AutoComplete from '../../components/AutoComplete/AutoComplete'

const Container = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
  background-color: #666666;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
`

const MainApp = ({ dataSource }) => (
  <Container>
    <AutoComplete dataSource={dataSource} />
  </Container>
)

export default MainApp
