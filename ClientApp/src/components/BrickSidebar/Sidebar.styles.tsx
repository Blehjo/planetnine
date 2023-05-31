import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: @secondary-blue;
  height: ~'calc(100vh - 100%)';
  box-shadow: inset -2px -2px 3px rgba(0, 0, 0, 0.25), inset 2px -2px 3px rgba(0, 0, 0, 0.25);
  transform: translateX(100%);
  transition: all @base-transition-time ease-in-out;
`

export const VisibleContainer = styled.div`
  composes: sidebar;
  transform: translateX(0);
`

export const SeperatorContainer = styled.div`
  position: relative;
  height: @separator-height;
  background: @tertiary-blue;
  width: 100%;
  margin-bottom: @base-padding-small;
`

export const ContentContainer = styled.div`
  padding: @base-padding;
`

export const RowContainer = styled.div`
  margin: @base-margin * 2 0;
  color: @white;
  font-size: 0.9em;
  transition: all @base-transition-time ease-in-out;

  &:hover {
    color: @tertiary-blue;
    cursor: pointer;
  }
`

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > i {
    margin-right: 10px;
  }
`