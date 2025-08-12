'use client'
import React from 'react'
import styled from 'styled-components'
import color from '../styles/color'
const { dark, light } = color

const StyledFooter = styled.footer`
  min-height: 200px;
  background: ${dark};
  color: ${light};
`

const Footer = () => {
  return <StyledFooter></StyledFooter>
}

export default React.memo(Footer)
