public class Spiral {
  public static void main(String[] args) {
    int[][] arr = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
    };

    int n = arr.length;
    System.out.println("Spiral Matrix: ");
    getSpiralForm(arr,n);
}
public static void getSpiralForm(int[][] arr,int n) {
  int rows = n;
  int cols = arr[0].length;
  int top = 0;
  int bottom = rows - 1;
  int left = 0;
  int right = cols - 1;
  int direction = 0; // Directions of current head pointer 0 for right, 1 for down, 2 for left, 3 for up

  for (int i = 0; i < rows * cols; i++) {
      if (direction == 0) {
          for (int j = left; j <= right; j++) {
              System.out.print(arr[top][j] + " ");
              if (j == right) {
                  top++;
                  direction = 1;
              }
          }
      } else if (direction == 1) {
          for (int j = top; j <= bottom; j++) {
              System.out.print(arr[j][right] + " ");
              if (j == bottom) {
                  right--;
                  direction = 2;
              }
          }
      } else if (direction == 2) {
          for (int j = right; j >= left; j--) {
              System.out.print(arr[bottom][j] + " ");
              if (j == left) {
                  bottom--;
                  direction = 3;
              }
          }
      } else if (direction == 3) {
          for (int j = bottom; j >= top; j--) {
              System.out.print(arr[j][left] + " ");
              if (j == top) {
                  left++;
                  direction = 0;
              }
          }
      }
  }
}
}
