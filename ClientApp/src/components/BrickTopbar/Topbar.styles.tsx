import styled from "styled-components";

export const TopbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  z-index: 9;
  background: maroon;
  box-shadow: 0px 3px 12px rgba(0,0,0,0.15);
  transition: all @base-transition-time ease-in-out;
`

export const SectionContainer = styled.div`
  margin-left: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:first-child {
    margin-left: 0;
  }
`

export const RightSectionContainer = styled.div`
  composes: section;
  margin-left: auto;
`

export const TitleContainer = styled.div`
  color: white;
  padding: 1rem;
  text-transform: uppercase;
  font-size: 1em;
`
