import { MutableRefObject } from 'react';

export class UIMatrix {
  private readonly size;
  private readonly cells: (MutableRefObject<HTMLElement> | null)[][];

  private static instance: UIMatrix | null = null;

  private constructor(size: number, refs: MutableRefObject<HTMLElement>[][]) {
    this.size = size;

    this.cells = refs;
  }

  public static createOnce(size: number, refs: MutableRefObject<HTMLElement>[][]): UIMatrix {
    if (!this.instance) {
      //this.size = size;
      this.instance = new UIMatrix(size, refs);
    }
    return this.instance;
  }

  public UIBoard = () => this.cells;

  public getCell(i: number, j: number): MutableRefObject<HTMLElement> | null {
    return this.cells[i][j];
  }

  public setClassToCell(i: number, j: number, className: string): void {
    const ref: MutableRefObject<HTMLElement> | null = this.getCell(i, j);
    if (ref && ref.current) {
      ref.current.className = className;
    }
  }

  public clearClasses(): void {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.setClassToCell(i, j, '');
      }
    }
  }
}

const useUIMatrix = (size: number, refs: MutableRefObject<HTMLElement>[][]) =>
  UIMatrix.createOnce(size, refs);

export default useUIMatrix;
