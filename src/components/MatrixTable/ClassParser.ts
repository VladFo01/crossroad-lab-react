import RoadMatrix from '../../classes/roadElements/RoadMatrix.ts';
import { UIMatrix } from '../../hooks/useUIMatrix.tsx';
import * as cover from '../../utils/constants/cellTypes';
import { ClassName } from '../../utils/constants/classNames.ts';
import { Direction } from '../../utils/constants/Direction.ts';

export default class ClassParser {
  private uiMatrix: UIMatrix;

  public constructor(ui: UIMatrix) {
    this.uiMatrix = ui;
  }

  public board = () => this.uiMatrix;

  public parse(roadMatrix: RoadMatrix) {
    roadMatrix.board.forEach((row) => {
      row.forEach((cell) => {
        let cellClass = '';
        switch (cell.getCover) {
          case cover.roadCover:
            cellClass += ClassName.ROAD;
            break;
          case cover.sidewalkCover:
            cellClass += ClassName.SIDEWALK;
            break;
          case cover.crossroadCover:
            cellClass += ClassName.CROSSROAD;
            break;
          case cover.crosswalkCover:
            cellClass += ClassName.CROSSWALK;
            break;
          case cover.empty:
            cellClass += ClassName.GRASS;
            break;
          default:
            break;
        }
        switch (cell.getDir) {
          case Direction.DOWN:
            cellClass += ' ' + ClassName.DOWN;
            break;
          case Direction.LEFT:
            cellClass += ' ' + ClassName.LEFT;
            break;
          case Direction.RIGHT:
            cellClass += ' ' + ClassName.RIGHT;
            break;
          case Direction.UP:
            cellClass += ' ' + ClassName.UP;
            break;
          default:
            break;
        }
        this.uiMatrix.setClassToCell(cell.xCoordinate, cell.yCoordinate, cellClass);
      });
    });
  }

  public clearClasses() {
    this.uiMatrix.clearClasses();
  }
}
