import styled from 'styled-components'
import { device } from './devices'

export const BoardContainer: any = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props: any) => props.countcol}, 1fr);
  grid-gap: 13px;
  margin: 10px;
  margin-top: 45px;
  @media device and ${device.tabletLandscape} {
    overflow-x: auto;
  }
`
