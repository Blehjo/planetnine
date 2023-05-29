import Button from '../BrickButton/Button';
import ColorPicker from '../ColorPicker/ColorPicker';
import BrickPicker from '../BrickPicker/BrickPicker';

import styles from '../../styles/components/topbar.less';


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
    <div className={styles.topbar}>
      <div className={styles.section}>
        <div className={styles.title}>
          Mode
        </div>
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
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          Color
        </div>
        <ColorPicker background={color} handleSetColor={onClickSetColor} />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          Brick
        </div>
        <BrickPicker selectedSize={brickSize} handleSetBrick={onClickSetBrick} />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          Scene
        </div>
        <Button
          active={grid}
          onClick={onClickToggleGrid}
          icon="grid"
          text="Grid" />
      </div>
      <div className={styles.rightSection}>
        <Button
          active={utilsOpen}
          onClick={onClickToggleUtils}
          icon="navicon-round"
          text="Utils" />
      </div>
      {children}
    </div>
  );
}