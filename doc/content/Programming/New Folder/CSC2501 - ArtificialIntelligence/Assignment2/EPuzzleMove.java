/*****************************************************************************/
/*                                                                           */
/* EPuzzleMove.java                                                          */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: March 10, 2006                                                      */
/*                                                                           */
/*                                                                           */
/*                                                                           */
/* Instance Variables:                                                       */
/*      state - of type char[][], Holds the state that is given              */
/*      move - of type char, Holds a char indicating the move made           */
/*                                                                           */
/* Constructors:                                                             */
/*   Coordinate( stae, move )                                                */
/*                                                                           */
/* Methods:                                                                  */
/*   getState - returns the x coordinate                                     */
/*   getMove - returns the y coordinate                                      */
/*                                                                           */
/*****************************************************************************/

public class EPuzzleMove
{
    protected char[] [] state;
    protected char mymove;

    public EPuzzleMove(char[][] state)
    {
	this.state = state;
	this.mymove = ' ';
    }
    public EPuzzleMove (char[] [] state, char move)
    {
	this.state = state;
	this.mymove = move;
    }


    public char[] [] getState ()
    {
	return state;
    }


    public char getMove ()
    {
	return mymove;
    }
    
    public void setState(char[][] state)
    {
	this.state = state;
    }
    
    public void setMove(char move)
    {
	this.mymove = move;
    }
} // end class
