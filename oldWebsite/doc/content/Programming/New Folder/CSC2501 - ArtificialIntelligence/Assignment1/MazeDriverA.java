/*****************************************************************************/
/*                                                                           */
/* MazeDriverA.java                                                           */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that implements the main algorithm                                */
/*                                                                           */
/*****************************************************************************/

public class MazeDriverA {
  //******************** MODIFY HERE *****************
   public static void main(String[] args) 
	{
     //*** create a new frame and make it visible
     Maze myMaze = new Maze();
     myMaze.setVisible(true);

     //*** current board position of the ghostbuster
     int gbx = myMaze.ghostBusterX, gby = myMaze.ghostBusterY;
	  
	  //***Performing the random search
     myMaze.random(gbx, gby);
	}
}