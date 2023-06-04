import React, { RefObject } from 'react';

export class UIMatrix {
  private readonly size;
  public cells: (RefObject<HTMLElement> | null)[][];

  private static instance: UIMatrix | null = null;

  private constructor(size: number) {
    this.size = size;

    this.cells = Array(size).fill(Array(size).fill(null));
    this.cells = this.cells.map((row) => row.map(() => React.createRef()));
  }

  //singleton pattern method
  public static createOnce(size: number): UIMatrix {
    if (!this.instance) {
      //this.size = size;
      this.instance = new UIMatrix(size);
    }
    return this.instance;
  }

  public getCell(i: number, j: number): RefObject<HTMLElement> | null {
    return this.cells[i][j];
  }

  public setClassToCell(i: number, j: number, className: string): void {
    const ref: RefObject<HTMLElement> | null = this.getCell(i, j);
    if (ref?.current) {
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

const useUIMatrix = (size: number) => {
  const matrix = UIMatrix.createOnce(size);

  return matrix;
};

export default useUIMatrix;
