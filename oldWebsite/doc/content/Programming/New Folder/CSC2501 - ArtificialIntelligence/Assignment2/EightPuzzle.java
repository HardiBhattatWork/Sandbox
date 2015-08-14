/*****************************************************************************/
/*                                                                           */
/* EightPuzzle.java                                                          */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: March 11, 2006                                                      */
/*                                                                           */
/*                                                                           */
/*                                                                           */
/* Instance Variables:                                                       */
/*      currentState - represents the current state you are in               */
/*      goalState - Represents the goal you want to reach from currentState  */
/*      SIZE - the size of the array                                         */
/*      BoardPanel - set up the board                                        */
/*      panelWidth - 100 pixel board cell                                    */
/*      blankX, blankY - The X-Y position of the blank space                 */
/*      depthCounter - The counter of f(n)                                   */
/*                                                                           */
/*                                                                           */
/* Methods:                                                                  */
/*   main - A simple main method that implements the Astar algorithm         */
/*   EightPuzzle - setting up the board a 2D grid                            */
/*   wait - Pause the program for the given amount                           */
/*   findBlank - finds the blank tile in the board                           */
/*   goalReached - checks to see if the goral is reached                     */
/*   evalState1 - Evaluates the state, check the difference in current and   */ 
/*                goal states                                                */
/*   evalState2 - Evaluates the state, check the similarity from the current */
/*                and goal state                                             */
/*   finalState - Used by evalState1 and evalState2 to get the final state   */
/*   move - moves the blank tile to the indicated spot                       */
/*   legalmove - checks to see if you are able to go to a perticular position*/
/*   Astar - performs the Astar routine                                      */
/*   random - performs a random routine                                      */
/*                                                                           */
/*****************************************************************************/

import java.awt.*;
import javax.swing.*;

//***********************************************************************
public class EightPuzzle
    extends JFrame
{
    //*** this is initially the start state
    static char[] [] currentState = {
	    {'1', '2', '3'},
	    {'4', '5', '6'},
	    {'7', '8', ' '}
	};

    //*** the desired goal state
    static char[] [] goalState = {
	    {' ', '1', '2'},
	    {'4', '5', '3'},
	    {'7', '8', '6'}
	};
    //*** size of the 2d array
    static int SIZE = 3;

    //*** set up the board and set all visited states to false
    static BoardPanel bp = new BoardPanel (currentState);

    //*** each board cell is 100 pixels long and wide
    static int panelWidth = 100;

    //*** current X-Y position of the blank tile
    int blankX, blankY;

    //*** a simple counter that keep track of the depth or g(n)
    int depthCounter = 0;

    //*** a simple random number generator for random search
    static int randomInt (int n)
    {
	return (int) (n * Math.random ());
    }


    //*************************************
    public static void main (String[] args)
    {

	//*** create a new frame and make it visible
	EightPuzzle ePuzz = new EightPuzzle ();

	//ePuzz.random();
	ePuzz.Astar ();
    }


    //*********************************************************************
    //*** set up the board a 2D grid where each cell has a predefined width
    public EightPuzzle ()
    {
	getContentPane ().setLayout (new GridLayout ());
	setSize (currentState [0].length * panelWidth,
		currentState [0].length * panelWidth);
	setDefaultCloseOperation (EXIT_ON_CLOSE);
	getContentPane ().add (bp);
    }


    //*****************************************************
    //*** a delay routine used for screen updating purposes
    public void wait (int milliseconds)
    {
	try
	{
	    Thread.sleep (milliseconds);
	}
	catch (Exception e)
	{
	}
    }


    //************************************************
    //*** update the global position of the blank tile
    public void findBlank (char[] [] currentState)
    {
	for (int i = 0 ; i < currentState.length ; i++)
	{
	    for (int j = 0 ; j < currentState [0].length ; j++)
	    {
		if (currentState [i] [j] == ' ')
		{
		    blankX = i;
		    blankY = j;
		}
	    }
	}
    }


    //******************************************
    //*** A* ends when the gaol state is reached
    public static boolean goalReached (char[] [] currentState)
    {
	for (int i = 0 ; i < currentState.length ; i++)
	{
	    for (int j = 0 ; j < currentState [0].length ; j++)
	    {
		if (currentState [i] [j] != goalState [i] [j])
		{
		    return false;
		}
	    }
	}

	return true;
    }


    //*******************************************
    //*** display a state
    public static void showState (char[] [] currentState)
    {
	for (int i = 0 ; i < currentState.length ; i++)
	{
	    for (int j = 0 ; j < currentState [0].length ; j++)
	    {
		System.out.print (currentState [i] [j] + " ");
	    }
	    System.out.println ();
	}

	System.out.println ();
    }


    //*******************************************************
    //*** The hurestic evaluate a state based on its difference
    //*** from the goal node
    public int evalState1 (char[] [] state, int depth)
    {
	int val = 0;
	for (int i = 0 ; i < SIZE ; i++)
	{
	    for (int j = 0 ; j < SIZE ; j++)
	    {
		if (state [i] [j] != goalState [i] [j])
		{
		    val++;
		}
	    }
	}
	//System.out.println("The state value is "+ val);
	return finalState (val, depth);
    }


    //*******************************************************
    //*** evaluate a state based on its similarity from the
    //*** goal node
    public int evalState2 (char[] [] state, int depth)
    {
	int correctVal = 0;
	for (int i = 0 ; i < SIZE ; i++)
	{
	    for (int j = 0 ; j < SIZE ; j++)
	    {
		if (state [i] [j] == goalState [i] [j])
		{
		    correctVal++;
		}
	    }
	}
	return finalState (correctVal, depth);
    }


    //*******************************************************
    //*** Calculating the final result
    public int finalState (int h, int g)
    {
	int f = 0;
	f = g + h;
	return f;
    }


    //*******************************************************
    //*** must move the blank tile in the indicated direction
    public char[] [] move (char dir)
    {

	//*** identify where blank is in current configuration
	findBlank (currentState);

	//*** the new blank positions are initialized
	int nblankX = blankX, nblankY = blankY;

	//*** new blank locations are updated based on directions
	if (dir == 'L')
	{
	    nblankY = nblankY - 1;
	    if (nblankY < 0)
	    {
		nblankY = 0;
	    }
	}

	else if (dir == 'R')
	{
	    nblankY = nblankY + 1;
	    if (nblankY >= currentState.length)
	    {
		nblankY = currentState.length - 1;
	    }
	}

	else if (dir == 'U')
	{
	    nblankX = nblankX - 1;
	    if (nblankX < 0)
	    {
		nblankX = 0;
	    }
	}

	else if (dir == 'D')
	{
	    nblankX = nblankX + 1;
	    if (nblankX >= currentState.length)
	    {
		nblankX = currentState.length - 1;
	    }
	}
	else
	{
	    nblankX = blankX;
	    nblankY = blankY;
	}

	//*** Modify this part so only legal states are visited here

	//*** background printing to see what move is being applied
	System.out.println ("Going " + dir);
	//*** display puzzle on the console
	showState (currentState);
	//** update graphics
	bp.reDraw (blankX, blankY, nblankX, nblankY, currentState);

	return currentState;

    }

    public boolean legalmove (char movedir, char[][] state)
    {
	//*** identify where blank is in current configuration
	findBlank (currentState);
	//*** the new blank positions are initialized
	int nblankX = blankX, nblankY = blankY;
	//*** new blank locations are updated based on directions
	showState (state);
	if ((movedir == 'L') && ((nblankY - 1) >= 0))
	    return true;
	else if ((movedir == 'R') && ((nblankY + 1) < state.length))
	    return true;
	else if ((movedir == 'U') && ((nblankX - 1) >= 0))
	    return true;
	else if ((movedir == 'D') && ((nblankX + 1) < state.length))
	    return true;

	return false;
    }


    public void Astar ()
    {
	PriorityQueue openQueue;
	PQLinkEntry closeQueue, front;
	//*** create a new frame and make it visible
	EightPuzzle ePuzz = new EightPuzzle ();
	ePuzz.setVisible (true);
	char temp;
	EPuzzleMove lastMove;
	int MyPriority = 0;

	//*** starting the program
	lastMove = new EPuzzleMove (currentState);
	openQueue = new PriorityQueue ();
	front = new PQLinkEntry(lastMove, -1, null);
	closeQueue = new PQLinkEntry (lastMove, evalState1 (currentState, depthCounter), front);
	System.out.println ("The starting priority " + closeQueue.getPriority ());

	while (!ePuzz.goalReached (currentState))
	{
	    depthCounter++;
	    ePuzz.wait (200); //waiting
	    if (legalmove ('L', currentState))
	    {
	    
		System.out.println ("Going Left is valid.");
		lastMove = (EPuzzleMove) front.getElement ();
		if (lastMove.getMove () != 'R' || lastMove.getMove () == ' ')
		{
		    findBlank (currentState);
		    int nblankX = blankX, nblankY = blankY;
		    temp = currentState [nblankX] [nblankY - 1];
		    currentState [nblankX] [nblankY - 1] = ' ';
		    currentState [nblankX] [nblankY] = temp;
		    openQueue.arrive (new EPuzzleMove (currentState, 'L'), evalState1 (currentState, depthCounter));
		    System.out.println ("The Left priority " + openQueue.getPriority ());
		    
		    currentState [nblankX] [nblankY - 1] = temp;
		    currentState [nblankX] [nblankY] = ' ';
		}
	    }
	    if (legalmove ('R', currentState))
	    {
		System.out.println ("Going Right is valid.");
		lastMove = (EPuzzleMove) front.getElement ();
		if (lastMove.getMove () != 'L' || lastMove.getMove () == ' ')
		{
		    findBlank (currentState);
		    int nblankX = blankX, nblankY = blankY;
		    temp = currentState [nblankX] [nblankY + 1];
		    currentState [nblankX] [nblankY + 1] = ' ';
		    currentState [nblankX] [nblankY] = temp;
		    openQueue.arrive (new EPuzzleMove (currentState, 'R'), evalState1 (currentState, depthCounter));
		    System.out.println ("The Right priority " + openQueue.getPriority ());
		    
		    currentState [nblankX] [nblankY + 1] = temp;
		    currentState [nblankX] [nblankY] = ' ';
		}
	    }
	    if (legalmove ('U', currentState))
	    {
		System.out.println ("Going Up is valid.");
		lastMove = (EPuzzleMove) front.getElement ();
		if (lastMove.getMove () != 'D' || lastMove.getMove () == ' ')
		{
		    findBlank (currentState);
		    int nblankX = blankX, nblankY = blankY;
		    temp = currentState [nblankX - 1] [nblankY];
		    currentState [nblankX - 1] [nblankY] = ' ';
		    currentState [nblankX] [nblankY] = temp;
		    openQueue.arrive (new EPuzzleMove (currentState, 'U'), evalState1 (currentState, depthCounter));
		    System.out.println ("The Up priority " + openQueue.getPriority ());
		    
		    currentState [nblankX - 1] [nblankY] = temp;
		    currentState [nblankX] [nblankY] = ' ';
		}
	    }
	    if (legalmove ('D', currentState))
	    {
		System.out.println ("Going Down is valid.");
		lastMove = (EPuzzleMove) front.getElement ();
		if (lastMove.getMove () != 'U' || lastMove.getMove () == ' ')
		{
		    findBlank (currentState);
		    int nblankX = blankX, nblankY = blankY;
		    temp = currentState [nblankX + 1] [nblankY];
		    currentState [nblankX + 1] [nblankY] = ' ';
		    currentState [nblankX] [nblankY] = temp;
		    openQueue.arrive (new EPuzzleMove (currentState, 'D'), evalState1 (currentState, depthCounter));
		    System.out.println ("The Down priority " + openQueue.getPriority ());
		    
		    currentState [nblankX + 1] [nblankY] = temp;
		    currentState [nblankX] [nblankY] = ' ';
		}
	    }
	    if (!openQueue.isEmpty ())
	    {
		MyPriority = openQueue.getPriority ();
		lastMove = (EPuzzleMove) openQueue.leave ();
		closeQueue = new PQLinkEntry (lastMove, MyPriority, front);
		ePuzz.move (lastMove.getMove ());
	    }
	    else if (ePuzz.goalReached (currentState))
	    {
		System.out.println ("You have reached your goal");
	    }
	}
	System.out.println ("You have reached your goal");
    }


    public static void random ()
    {
	//*** create a new frame and make it visible
	EightPuzzle ePuzz = new EightPuzzle ();
	ePuzz.setVisible (true);

	//*** keep trying until the goal state is reached
	while (!goalReached (currentState))
	{
	    //*** wait for a while before updating the screen
	    ePuzz.wait (200);

	    //*** move in a random direction, 0=L, 1=U, 2=R, 3=D
	    int randDir = randomInt (4);

	    switch (randDir)
	    {
		case 0:
		    {
			ePuzz.move ('L');
			break;
		    }

		case 1:
		    {
			ePuzz.move ('U');
			break;
		    }

		case 2:
		    {
			ePuzz.move ('R');
			break;
		    }

		case 3:
		    {
			ePuzz.move ('D');
			break;
		    }
	    }
	}
    }
}
