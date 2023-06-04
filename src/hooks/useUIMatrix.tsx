import React, { MutableRefObject, ReactNode } from "react";

// class immitation
class UIMatrix {
  private size;
  private cells: (MutableRefObject<HTMLElement> | null)[][];

  private static instance: (UIMatrix | null) = null;

  private constructor(size: number) {
    this.size = size;

    this.cells = Array(size).fill(Array(size).fill(null));
  }

  //singleton pattern method
  public static createOnce(size: number): UIMatrix{
    if(!this.instance){
      //this.size = size;
      this.instance = new UIMatrix(size);
    }
    return this.instance;
  }

  public getCell(i: number, j: number): (MutableRefObject<HTMLElement> | null){
    return this.cells[i][j];
  }

  public setClassToCell(i: number, j: number, className: string): void{
    const ref: (MutableRefObject<HTMLElement> | null) = this.getCell(i, j);
    if(ref){
      ref.current.className = className;
    }
  }

  public clearClasses(): void{
    for(let i = 0; i < this.size; i++){
      for(let j = 0; j < this.size; j++){
        this.setClassToCell(i, j, '');
      }
    }
  }

}

const useUIMatrix = (size: number) => {
  const matrix = UIMatrix.createOnce(20);

  return matrix;
};

export default useUIMatrix;
