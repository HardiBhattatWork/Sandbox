/** \file HW2.java
 Implementation	of the summation of arrays.
 \author Hardik	R. Bhatt, hb259183@sju.edu

 This program implements a recursion that esentially sums and
 calculates the number of Rows, Columns, and the mean of the
 given array m.
 */
import java.io.*;
import java.util.*;
import java.lang.*;

/** \brief HW2	class.
 *
 *    Containing the main, sumOfRows, sumOfCols, and mean functions.
 *    This Class contian methods that taken in array m as an argument
 *    and implement the necessary addition necessary to execute it
 *    purpose a method. */
public class HW2 {
  /** \brief ROWS.
   *    A constant veriable containint the
   *    number of Rows in a given array*/
  static int ROWS = 5; ///<	Num Rows
  /** \brief COLS.
   *    A constant veriable containint the
   *    number of Columns in a given array*/
  static int COLS = 15; ///<	Num Colums
  /** \brief Array m.
   *    A constant array containint the
   *    number needed to be summed up*/
  static int[][] m = {
      {4, 34, 5, 67, 3, 45, 7, 8, 10, 3, 12, 5, 7, 63, 5},
      {3, 54, 5, 8, 7, 20, 30, 8, 2, 78, 37, 57, 45, 4, 6},
      {6, 8, 4, 3, 15, 19, 45, 5, 4, 6, 54, 6, 1, 2, 3},
      {9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 5, 4, 68, 20, 5},
      {1, 5, 7, 9, 4, 6, 8, 10, 6, 2, 4, 7, 6, 5, 5},
  };
//----------------------------------------------------------------------
  /** \brief Main application entry point.
   *
   *  \param args.
   *    The main program that utalises the sumOfRows, sumOfCols, and
   *	the mean methods to calculate the sum and the mean of the array
   */

  public static void main(String[] args) throws IOException {
    int[] SumRowArray = new int[ROWS]; ///< array to hold SumRows
    int[] SumColArray = new int[COLS]; ///< array to hold SumCol
    double SumMean; ///< array to hold	SumMean

    SumRowArray = sumOfRows(m, ROWS, COLS);
    SumColArray = sumOfCols(m, ROWS, COLS);
    SumMean = mean(m, ROWS, COLS);

    System.out.print("The sum	of	the Rows	are ");
    for (int i = 0; i < ROWS; i++)
    {
      System.out.print(SumRowArray[i] + ", ");
    }
    System.out.println();

    System.out.print("The sum	of	the Cols	are ");
    for (int j = 0; j < COLS; j++)
    {
      System.out.print(SumColArray[j] + ", ");
    }
    System.out.println();

    System.out.println("The	Mean is " + SumMean);
  }
  //----------------------------------------------------------------------
  /** \brief sumOfRows
   *
   *	\param m[][], rows, cols.
   *     This method implements the sumOfRows algorithm utalising the
   *     looping process in treversing through the ith row and summing
   *     up j number of columns to sum up all the rows in the array.
   */

  public static int[] sumOfRows(final int m[][], final int rows, final int cols)
  {
    int[] SumRow = new int[rows]; ///< constant 1D array holder

    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        SumRow[i] += m[i][j];
      }
    }
    return SumRow;
  }

  //----------------------------------------------------------------------
  /** \brief sumOfCols
   *
   *	  \param m[][], rows, cols.
   *       This method implements the sumOfCols algorithm utalising the
   *       looping process in treversing through the ith Column and summing
   *       up j number of rows to sum up all the columns in the array.
   */
  public static int[] sumOfCols(final int m[][], final int rows, final int cols)
  {
    int[] SumCol = new int[cols]; ///< constant 1D array holder

    for (int i = 0; i < cols; i++)
    {
      for (int j = 0; j < rows; j++)
      {
        SumCol[i] += m[j][i];
      }
    }
    return SumCol;
  }
  //----------------------------------------------------------------------
  /** \brief mean
   *
   *	  \param m[][], rows, cols.
   *       This method implements the mean algorithm utalising the
   *       looping process in treversing through the entire array
   *       and summing up all the numbers in the array in the process.
   */
  public static double mean(final int m[][], final int rows, final int cols)
  {
    double SumMean = 0.0; ///< constant holder
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        SumMean += m[i][j];
      }
    }
    SumMean = SumMean / (rows * cols);

    return SumMean;
  }
}