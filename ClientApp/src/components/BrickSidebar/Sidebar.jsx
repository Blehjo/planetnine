import { Component } from 'react';
import { saveAs } from 'file-saver';
import autobind from 'autobind-decorator';

import FileUploader from '../FileUploader/FileUploader';
import Brick from '../Engine/Brick';
import { ContentContainer, RowContainer, SidebarContainer, TextContainer, VisibleContainer } from './Sidebar.styles';
import { Card, Dropdown, Modal } from 'react-bootstrap';

class Sidebar extends Component {

  render() {
    const { utilsOpen, resetScene, toggleUtils } = this.props;

    return (
      // <div className={utilsOpen ? styles.visible : styles.sidebar}>
      <>
      { utilsOpen ?
      <Modal onHide={toggleUtils} show={utilsOpen}>
        <Modal.Header style={{ color: "black" }} closeButton >
          Utilities
        </Modal.Header>
          <Modal.Body>
            <VisibleContainer>
              <ContentContainer>
                <Card style={{ padding: "1rem", margin: "1rem" }} bg="dark">
                <RowContainer onClick={resetScene}>
                  <TextContainer>
                    <i className="ion-trash-a" />
                    <span>Reset scene</span>
                  </TextContainer>
                </RowContainer>
                </Card>
                <Card style={{ padding: "1rem", margin: "1rem" }} bg="dark">
                <RowContainer onClick={this._exportFile}>
                  <TextContainer>
                    <i className="ion-log-out" />
                    <span>Export scene</span>
                  </TextContainer>
                </RowContainer>
                </Card>
                <Card style={{ padding: "1rem", margin: "1rem" }} bg="dark">
                <RowContainer>
                  <FileUploader onFinish={this._importFile}>
                    <TextContainer>
                      <i className="ion-log-in" />
                      <span>Import scene</span>
                    </TextContainer>
                  </FileUploader>
                </RowContainer>
                </Card>
              </ContentContainer>
            </VisibleContainer> 
          </Modal.Body>
        </Modal> :
      <SidebarContainer/>
      }
      </>
    );
  }

  // @autobind
  _exportFile() {
    const { objects } = this.props;
    const fileName = 'scene.json';
    const simplified = objects.map((o) => ({
      intersect: o._intersect,
      color: o._color,
      dimensions: o._dimensions,
      rotation: o._rotation,
      translation: o._translation,
    }));
    var fileToSave = new Blob([JSON.stringify(simplified)], {
      type: 'application/json',
      name: fileName,
    });
    saveAs(fileToSave, fileName);
  }

  // TODO: bad, do this in epic/saga/thunk but not here
  // @autobind
  _importFile(objects) {
    const { importScene } = this.props;
    const bricks = objects.map((o) => new Brick(o.intersect, o.color, o.dimensions, o.rotation, o.translation));
    importScene(bricks);
  }
}


export default Sidebar;
