// class immitation
class UIMatrix<T> {
  private size;
  public cells: (T | null)[][];

  constructor(size: number) {
    this.size = size;

    this.cells = Array(size).fill(Array(size).fill(null));
  }
}

const useUIMatrix = (size: number) => {
  const matrix = new UIMatrix(size);

  return matrix;
};

export default useUIMatrix;
