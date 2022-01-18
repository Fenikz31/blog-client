import React from 'react'
import { LineStyle, Timeline, TrendingUp, PermIdentity, Storefront, LocalAtm, Assessment, Drafts, Feedback, Forum, Work, Receipt, PieChart } from '@material-ui/icons';
import styled, { css } from 'styled-components';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function SideBar () {
  function SidebarListItem ({ children ,to, ...props } = {}) {
    const resolved = useResolvedPath( to ),
          match = useMatch({ path: resolved.pathname, end: true })
    return (
      <Link
        style={{
          padding: 5,
          cursor: 'pointer',
          display: 'flex',
          textDecoration: 'none',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: match ? 'rgb(108, 110, 118)' : 'rgb(240, 240, 255)',
          color: match ? 'rgb(240, 240, 255)' : 'rgb(108, 110, 118)',
          hover: {
            color: 'rgb(240, 240, 255)',
            backgroundColor: 'rgb(108, 110, 118)'
          }
        }}
        to={ to }
        { ...props } >
        { children }
      </Link>
    )
  }
  
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <SidebarListItem to='/' >
              <MyLineStyle />
              Home
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Categories</SidebarTitle>
          <SidebarList>
            <SidebarListItem to='users'>
              <MyPermIdentity />
              Users
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
flex: 1;
height: calc(100vh - 50px);
background-color: rgb(251, 251, 255);
position: sticky;
top: 50px;
max-width: 290px;
box-shadow: 0px 0px 15px -10px rgb(0 0 0 / 75%);
`
const SidebarWrapper = styled.div`
padding: 20px;
color: #555;
`
const SidebarMenu = styled.div`
margin-bottom: 10px;
`
const SidebarTitle = styled.h3`
font-size: 13px;
color: rgb(187, 186, 186);
`
const SidebarList = styled.ul`
list-style: none;
padding: 5px;
width: 240px;
`

const sharedStyle = css`
  margin-right: 5px;
  font-size: 20px !important;
`
const MyLineStyle = styled( LineStyle )`
  ${ sharedStyle }
`
const MyTimeline = styled( Timeline )`
  ${ sharedStyle }
`
const MyTrendingUp = styled( TrendingUp )`
  ${ sharedStyle }
`
const MyPermIdentity = styled( PermIdentity )`
  ${ sharedStyle }
`
const MyStorefront = styled( Storefront )`
  ${ sharedStyle }
`
const MyAssessment = styled( Assessment )`
  ${ sharedStyle }
`
const MyLocalAtm = styled( LocalAtm )`
  ${ sharedStyle }
`
const MyDrafts = styled( Drafts )`
  ${ sharedStyle }
`
const MyFeedback = styled( Feedback )`
  ${ sharedStyle }
`
const MyForum = styled( Forum )`
  ${ sharedStyle }
`
const MyWork = styled( Work )`
  ${ sharedStyle }
`
const MyPieChart = styled( PieChart )`
  ${ sharedStyle }
`
const MyReceipt = styled( Receipt )`
  ${ sharedStyle }
`
