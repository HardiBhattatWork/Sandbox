/*****************************************************************************/
/*                                                                           */
/* Maze.java                                                                 */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that implements the maze algorithm                                */
/*                                                                           */
/* Instance Variables:                                                       */
/*      visited - of type boolean, is to keep track to backtracking          */
/*      mazePlan - an array representing the maze                            */
/*      mp - A type MazePanel                                                */
/*      ghostX, ghostY = Position of the ghost                               */
/*      ghostBusterX, ghostBusterY = Position of the ghost buster            */
/*      panelWidth = number of pixels in a given maze cell                   */
/*                                                                           */
/* Constructors:                                                             */
/*      Maze( )                                                              */
/*                                                                           */
/* Methods:                                                                  */
/*      wait(milliseconds) - executes a wait for the given milliseconds      */
/*      moveGhostbuster(i, j) - moves the ghost to the given buster position */
/*      removeGhostbuster(i, j) - removes the ghost buster fot given position*/
/*      openSpace(i, j) - returns a boolean indicating if the given space is */
/*                        open or not.                                       */
/*                                                                           */
/*****************************************************************************/

import java.util.*;
import java.awt.*;
import javax.swing.*;
import java.net.*;
import java.applet.*;

//***********************************************************************
public class Maze
    extends JFrame {
  

  static int[][] mazePlan = {
      {
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}, {
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1}, {
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1}, {
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1}, {
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
  };
   static boolean[][] visited = new boolean[mazePlan.length][mazePlan[0].length];
   static final int WEST = 0;
	static final int NORTH = 1;
	static final int EAST = 2;
	static final int SOUTH = 3;
	
	static Stack DFSstack = new Stack();
	static Queue BFSqueue = new Queue();  
  //*** set up the maze wall positions and set all visited states to false
   static MazePanel mp = new MazePanel(mazePlan, visited);
   
  //*** set up and display main characters' initial maze positions
   static int ghostX = 17, ghostY = 4;
   static int ghostBusterX = 15, ghostBusterY = 3;

  //*** each maze cell is 30 pixels long and wide
   static int panelWidth = 30;
   static final int MAXMOVE = 4;

  //*** a simple random number generator for random search
   static int randomInt() {
     return (int) (MAXMOVE * Math.random());
   }

  //**************************************
   public Maze() {
     mp.setupChar(ghostX, ghostY, "ghost.gif");
     mp.setupChar(ghostBusterX, ghostBusterY, "ghostbuster.gif");

     getContentPane().setLayout(new GridLayout());
     setSize(mazePlan[0].length * panelWidth, mazePlan[0].length * panelWidth);
     setDefaultCloseOperation(EXIT_ON_CLOSE);
     getContentPane().add(mp);
   }

  //**************************************
   public static void wait(int milliseconds) {
     try {
       Thread.sleep(milliseconds);
     }
     catch (Exception e) {}
   }

  //**************************************
   public static void moveGhostbuster(int i, int j) {
     mp.setupChar(i, j, "ghostbuster.gif");
   }

  //**************************************
   public static void removeGhostbuster(int i, int j) {
     mp.removeChar(i, j);
   }

  //**************************************
   public static boolean openSpace(int i, int j) {
     if (mazePlan[i][j] == 0) {
       return true;
     }
     else {
       return false;
     }
   }
  //**************************************
  //A method that performs a Depth first search algorithm
  //using recursion to implement the best possible way to
  //reach the ghost. given the search conditions.
  public static void DFS(int GBx, int GBy)throws EmptyStackException
   {
	  //***Last move holder. The number that is popped out of the stack
     int lastMove = -1;
	  //***Setting the coordinates altredy visited to true
	  visited[GBx][GBy] = true;
	  //***Removing the ghost buster form that coordinate
	  removeGhostbuster(GBx, GBy);
	  //***Checking if this coordinare this our goal
	  if (GBx == ghostX && GBy == ghostY)
	   {
	      System.out.println("You have reached the ghost");
		}
		//***If possible move left. Then recurse
      else if ((openSpace(GBx, GBy - 1)) &&  (!visited[GBx][GBy - 1]))
		{
			moveGhostbuster(GBx, GBy - 1);
			wait(500);
			DFSstack.push(new Integer (WEST));
			DFS(GBx, GBy - 1);	
      }
		//***If possible move up. Then recurse
      else if ((openSpace(GBx - 1, GBy))  &&  (!visited[GBx - 1][GBy])) 
		{
			moveGhostbuster(GBx - 1, GBy);
			wait(500);
			DFSstack.push(new Integer (NORTH));
			DFS(GBx - 1, GBy);

      }
		//***if possible move right. Then recurse
      else if ((openSpace(GBx, GBy + 1))  &&  (!visited[GBx][GBy + 1])) 
		{
			moveGhostbuster(GBx, GBy + 1);
			wait(500);
			DFSstack.push(new Integer (EAST));
			DFS(GBx, GBy + 1);
      }
		//***if possible move down. Then recurse
      else if ((openSpace(GBx + 1, GBy))  &&  (!visited[GBx + 1][GBy])) 
		{
			moveGhostbuster(GBx + 1, GBy);
			wait(500);
			DFSstack.push(new Integer (SOUTH));
			DFS(GBx + 1, GBy);
      }
		//***If the open stack is empty. Then Back track
		else if (!DFSstack.isEmpty())
		{
			lastMove = ((Integer) DFSstack.pop()).intValue();  //get last move
			if (lastMove == WEST)
			{
				moveGhostbuster(GBx, GBy + 1);
				DFS(GBx, GBy + 1);
			}
			else if (lastMove == NORTH)
			{
				moveGhostbuster(GBx + 1, GBy);
				DFS(GBx + 1, GBy);
			}
			else if (lastMove == EAST)
			{
				moveGhostbuster(GBx, GBy - 1);
				DFS(GBx, GBy - 1);
			}
			else if (lastMove == SOUTH)
			{
				moveGhostbuster(GBx - 1, GBy);
				DFS(GBx - 1, GBy);
			}
		}
		//***Else the goal could not be reached
		else
		{
			System.out.println("A Solution cannot be found");
		}
    }
 
  //**************************************
  //A method that performs a Breath first search algorithm
  //using recursion to implement the best possible way to
  //reach the ghost. given the search conditions
  public static void BFS(int GBx, int GBy) throws EmptyQueueException
  {
     //***Containing the Coordinate that needs to be visited as an object.
     Coordinate myMove;
	  wait(500);
	  //***Setting the coordinates altredy visited to true
	  visited[GBx][GBy] = true;
	  //***Removing the ghost buster form that coordinate
	  removeGhostbuster(GBx, GBy);
	  //***If the Ghost buster is able to move left, up, right or down
	  //***store it in the queue.
      if ((openSpace(GBx, GBy - 1)) &&  (!visited[GBx][GBy - 1]))
		{
			BFSqueue.enqueue(new Coordinate(GBx, GBy - 1));
			visited[GBx][GBy - 1] = true;
      }
      if ((openSpace(GBx - 1, GBy))  &&  (!visited[GBx - 1][GBy])) 
		{
			BFSqueue.enqueue(new Coordinate(GBx - 1, GBy));
			visited[GBx - 1][GBy] = true;
      }
      if ((openSpace(GBx, GBy + 1))  &&  (!visited[GBx][GBy + 1])) 
		{
			BFSqueue.enqueue(new Coordinate(GBx, GBy + 1));
			visited[GBx][GBy + 1] = true;
      }
      if ((openSpace(GBx + 1, GBy))  &&  (!visited[GBx + 1][GBy])) 
		{
			BFSqueue.enqueue(new Coordinate(GBx + 1, GBy));
			visited[GBx + 1][GBy] = true;
      }
		//***if you have reached your goal you are done
		if (GBx == ghostX && GBy == ghostY) 
	   {
	     System.out.println("you have reached the ghost");
		}
		//***else pop off the first coordinate of the queue and move
		//***the ghost buster to that position.
		else if (!BFSqueue.isEmpty())
		{
			myMove = (Coordinate) (BFSqueue.dequeue());
			moveGhostbuster(myMove.getX(), myMove.getY());
			BFS(myMove.getX(), myMove.getY());
		}
		else
		{
			System.out.println("You were unable to find the ghost");
		}
    }
  
  //**************************************
  //A method that performs a random first search algorithm
  //it picks which way to go randomly.
  public static void random(int GBx, int GBy) {

    int newGBx;
    int newGBy;
	 int myMove = -1;
	 removeGhostbuster(GBx, GBy);
	 //*** remove ghostbuster from location (gbx, gby)
    if (GBx == ghostX && GBy == ghostY)
	  {
	     System.out.println("You have reached the ghost");
	  }
	  else
	  {      
      //*** pick a new random board position for the ghostbuster
       do {
		   newGBx = GBx;
	   	newGBy = GBy;
         myMove = randomInt();
			//System.out.println("myMove "+ myMove);
         //*** pick a random board position
          if (myMove == 0) {
            newGBy--;
          }
          else if (myMove == 1) {
            newGBx--;
          }
          else if (myMove == 2) {
            newGBy++;
          }
          else{
            newGBx++;
          }
       }
       while (!openSpace(newGBx, newGBy));
      //*** place  ghostbuster into new location (gbx, gby)
      moveGhostbuster(newGBx, newGBy);
      //*** delay updating the screen
       wait(500);
		 random(newGBx, newGBy);
    }	  
  }
}
