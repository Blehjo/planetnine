import { Component, Dispatch } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import Scene from '../Engine/Scene';
import Help from '../Help/Help';
import Sidebar from '../BrickSidebar/Sidebar';
import { RootState } from '../../store/store';
import { SetMode, setMode } from '../../store/builder/builder.action';
import { setColor } from '../../store/builder/builder.action';
import { toggleGrid } from '../../store/builder/builder.action';
import { SetColor } from '../../store/builder/builder.action';
import { ToggleGrid } from '../../store/builder/builder.action';
import { setBrick } from '../../store/builder/builder.action';
import { Brick } from '../../store/builder/builder.reducer';
import { SetBrick } from '../../store/builder/builder.action';
import { toggleUtils } from '../../store/interface/interface.action';
import { ToggleUtils } from '../../store/interface/interface.action';
import { removeBrick } from '../../store/scene/scene.action';
import { RemoveBrick } from '../../store/scene/scene.action';
import { addBrick } from '../../store/scene/scene.action';
import { AddBrick } from '../../store/scene/scene.action';
import { updateBrick } from '../../store/scene/scene.action';
import { UpdateBrick } from '../../store/scene/scene.action';
import { resetScene } from '../../store/scene/scene.action';
import { ResetScene } from '../../store/scene/scene.action';
import { setScene } from '../../store/scene/scene.action';
import { SetScene } from '../../store/scene/scene.action';
import { Topbar } from '../BrickTopbar/Topbar';
import { VoyagerContainer } from '../../routes/Voyager/Voyager.styles';

//import styles from '../../styles/containers/builder.less';

type BuilderProps = ConnectedProps<typeof connector>;

class Builder extends Component<BuilderProps> {
  render() {
    const {
      builder,
      ui,
      scene,
      setMode,
      setColor,
      toggleGrid,
      setBrick,
      toggleUtils,
      removeBrick,
      addBrick,
      updateBrick,
      resetScene,
      setScene
    } = this.props;

    const { mode, brick, color, grid } = builder;
    const { bricks } = scene;
    const { utilsOpen } = ui;

    return (
      <VoyagerContainer>
        <Topbar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          onClickToggleGrid={toggleGrid}
          mode={mode}
          color={color}
          grid={grid}
          brickSize={brick}
          onClickSetBrick={setBrick}
          utilsOpen={utilsOpen}
          onClickToggleUtils={toggleUtils}>
          <Sidebar utilsOpen={utilsOpen} resetScene={resetScene} objects={bricks} importScene={setScene} />
        </Topbar>
        <Scene
          brickColor={color}
          objects={bricks}
          mode={mode}
          grid={grid}
          dimensions={brick}
          // shifted={utilsOpen}
          removeObject={removeBrick}
          addObject={addBrick}
          updateObject={updateBrick} />
        {/* <Help inversed={utilsOpen} /> */}
      </VoyagerContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    builder: state.builder,
    ui: state.ui,
    scene: state.scene
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SetMode | SetColor | ToggleGrid | SetBrick | ToggleUtils | AddBrick | UpdateBrick | RemoveBrick | ResetScene | SetScene>) => ({
	setMode: (mode: string) => dispatch(setMode(mode)),
  setColor: (color: string) => dispatch(setColor(color)),
  toggleGrid: () => dispatch(toggleGrid()),
  setBrick: (brick: Brick) => dispatch(setBrick(brick)),
  toggleUtils: () => dispatch(toggleUtils()),
  addBrick: (brick: Brick) => dispatch(addBrick(brick)),
  updateBrick: (brick: Brick) => dispatch(updateBrick(brick)),
  removeBrick: (id: number) => dispatch(removeBrick(id)),
  resetScene: () => dispatch(resetScene()),
  setScene: (bricks: Brick[]) => dispatch(setScene(bricks))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Builder);