import RoadMatrix from '../../classes/roadElements/RoadMatrix.ts';
import { UIMatrix } from '../../hooks/useUIMatrix.tsx';
import * as cover from '../../utils/constants/cellTypes';

export default class ClassParser {
  private uiMatrix: UIMatrix;

  public constructor(ui: UIMatrix) {
    this.uiMatrix = ui;
  }

  public board = () => this.uiMatrix;

  public parse(roadMatrix: RoadMatrix) {
    roadMatrix.board.forEach((row) => {
      row.forEach((cell) => {
        switch (cell.getCover) {
          case cover.roadCover:
            this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, 'sidewalk');
            break;
          case cover.sidewalkCover:
            this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, 'sidewalk');
            break;
          case cover.crossroadCover:
            this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, 'sidewalk');
            break;
          case cover.crosswalkCover:
            this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, 'sidewalk');
            break;
          case cover.empty:
            this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, 'grass');
            break;
          default:
            console.log(
              `Cannot resolve type of cover in the cell [${cell.xCoordinate},${cell.yCoordinate}]`,
            );
            return;
        }
      });
    });
  }

  public clearClasses() {
    this.uiMatrix.clearClasses();
  }
}
