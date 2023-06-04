// class immitation
import { useState } from 'react';

import Cell from '../classes/roadElements/Cell.ts';

class UIMatrix<T> {
  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  private _size;
  public cells: (T | null)[][];

  constructor(size: number) {
    this._size = size;

    this.cells = Array(size).fill(Array(size).fill(null));
  }
}

const useUIMatrix = (size: number) => {
  const [matrix] = useState<UIMatrix<Cell>>(new UIMatrix(size));

  return matrix;
};

export default useUIMatrix;
