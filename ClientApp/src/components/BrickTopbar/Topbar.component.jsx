import Button from '../BrickButton/Button';
import ColorPicker from '../ColorPicker/ColorPicker';
import BrickPicker from '../BrickPicker/BrickPicker';
// import { TopbarContainer } from './topbar.styles';

import { RightSectionContainer, SectionContainer, TitleContainer, TopbarContainer } from './Topbar.styles';


export const Topbar = ({
  mode,
  onClickSetMode,
  color,
  onClickSetColor,
  grid,
  onClickToggleGrid,
  brickSize,
  onClickSetBrick,
  utilsOpen,
  onClickToggleUtils,
  children
}) => {
  return (
    <TopbarContainer>
      <SectionContainer >
        <TitleContainer >
          Mode
        </TitleContainer>
        <Button
          active={mode === 'build'}
          onClick={() => onClickSetMode('build')}
          icon="hammer"
          text="Build" />
        <Button
          active={mode === 'paint'}
          onClick={() => onClickSetMode('paint')}
          icon="paintbrush"
          text="Paint" />
      </SectionContainer>
      <SectionContainer>
        <TitleContainer>
          Color
        </TitleContainer>
        <ColorPicker background={color} handleSetColor={onClickSetColor} />
      </SectionContainer>
      <SectionContainer>
        <TitleContainer>
          Brick
        </TitleContainer>
        <BrickPicker selectedSize={brickSize} handleSetBrick={onClickSetBrick} />
      </SectionContainer>
      <SectionContainer>
        <TitleContainer>
          Scene
        </TitleContainer>
        <Button
          active={grid}
          onClick={onClickToggleGrid}
          icon="grid"
          text="Grid" />
      </SectionContainer>
      <RightSectionContainer>
        <Button
          active={utilsOpen}
          onClick={onClickToggleUtils}
          icon="navicon-round"
          text="Utils" />
      </RightSectionContainer>
      {children}
    </TopbarContainer>
  );
}