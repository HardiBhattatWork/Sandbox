/*******************************************************************
     AStar
     Hardik Bhatt
     February 2006

     Performs path-finding on a map using A* algorithm: F = G + H

     Cost function G must vary based on the type of cell being
     visited: ocean, desert, forest, hill, mountain.

     order of preference: forest, desert, hill, mountain, ocean (shallow)
     avoided:             deep ocean where a cell is sorrounded by water
			  (radius 3 or more)

     color codes:         ocean = blue = 0,     hill = red = 1,
			  forest = green = 2,   desert = yellow = 3,
			  mountain = white = 4
*/


import java.awt.*;
import javax.swing.*;
import java.applet.*;


//*******************************************************************
//*** implements path-finding through a map using A* algorithm
//***
public class AStar extends JFrame
{
    //*** user preferences for map go here; map dimension is included
    static Map mp;
    static int mapSize = 40;
    static int[] [] mapPlan =
	{
	    {2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 1, 4, 1, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 1, 4, 1, 4, 4, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {4, 4, 4, 4, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2},
	    {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2}
	};

    static boolean[] [] visited = new boolean [mapPlan.length] [mapPlan [0].length];

    ///< each map cell is 16 pixels long and wide
    static int panelWidth = 16;

    ///< a simple random number generator for random search
    static int randomInt (int n)
    {
	return (int) (n * Math.random ());
    }


    //*******************************************************************
    /* brief AStar
    * constructor builds a random map plan */
    public AStar ()
    {

	///< now draw the map
	mp = new Map (mapPlan, visited);

	///< close frame on exit
	setDefaultCloseOperation (EXIT_ON_CLOSE);
	setSize (mapSize * panelWidth, mapSize * panelWidth);
	setVisible (true);
	getContentPane ().add (mp);
    }


    //*******************************************************************
    /* brief wait
    * pause */
    public static void wait (int milliseconds)
    {
	try
	{
	    Thread.sleep (milliseconds);
	}
	catch (Exception e)
	{
	}
    }


    //*******************************************************************
    /* brief moveToCell
    * paint a new cell black to indicate a move */
    public void moveToCell (int i, int j)
    {
	mp.setupCell (mapPlan, i, j, false);
    }


    //*******************************************************************
    //*** erase a cell, wait a while and restore it to its original color
    //***
    public void clearCell (int i, int j)
    {
	//*** paint cell black
	mp.setupCell (mapPlan, i, j, true);

	//*** wait a little
	wait (100);

	//*** redraw cell its original terrain color
	//*** comment out this line if you wish to mark the traversed path
	// mp.setupCell (mapPlan, i, j, false);
    }


    //*** Implementing the hurestic
    public static int H_Manhattan (int currentx, int currenty)
    {
	int val = 0;
	val = Math.abs (mapPlan.length - currentx) + Math.abs (mapPlan.length - currenty);
	//System.out.println();
	//System.out.println("Manhatan val " + val);
	return val;
    }


    //*** Implementing the G()
    public static int G_Path (int currentx, int currenty)
    {
	int val = 0;
	val = 5 * Math.abs (mapPlan [currentx] [currenty] - 2);
	/*if (mapPlan [currentx] [currenty] < 2)
	{
	    val = 5 * Math.abs (mapPlan [currentx] [currenty] - 2);
	    val = val + 1;
	}*/
	//System.out.println();
	//System.out.println("G_Path val " + mapPlan [currentx] [currenty]+ "," + val);
	return val;
    }


    public static boolean istoDeep (int x, int y)
    {
	int counter = 0;
	if (mapPlan [x] [y] > 0)
	{
	    return false;
	}
	if (mapPlan [x + 1] [y] == 0)
	{
	    counter++;
	}
	if (mapPlan [x - 1] [y] == 0)
	{
	    counter++;
	}
	if (mapPlan [x] [y + 1] == 0)
	{
	    counter++;
	}
	if (mapPlan [x] [y - 1] == 0)
	{
	    counter++;
	}
	if (mapPlan [x + 1] [y + 1] == 0)
	{
	    counter++;
	}
	if (mapPlan [x - 1] [y - 1] == 0)
	{
	    counter++;
	}
	if (mapPlan [x + 1] [y - 1] == 0)
	{
	    counter++;
	}
	if (mapPlan [x - 1] [y + 1] == 0)
	{
	    counter++;
	}

	return (counter <= 3);
    }


    public static boolean goalReached (int currentx, int currenty)
    {
	if (currentx == mapPlan.length - 1 && currenty == mapPlan.length - 1)
	{
	    return true;
	}
	else
	{
	    return false;
	}
    }


    //*** Implementing the Astar method
    public static void Astar ()
    {
	AStar star = new AStar ();
	star.setVisible (true);
	PriorityQueue openQueue = new PriorityQueue ();
	Coordinate currentState = new Coordinate (0, 0);
	Coordinate temp = new Coordinate (0, 0);
	int currentX = 0, currentY = 0;
	int priority = 0;

	while (!goalReached (currentX, currentY))
	{
	    System.out.println ("Re looped");
	    System.out.println ();
	    System.out.println ("Front of loop " + currentX + ", " + currentY);
	    //*** Going Down
	    if ((currentState.getX () + 1) < mapPlan.length && (!visited [currentState.getX () + 1] [currentState.getY ()]))
	    {
		if (!istoDeep (currentState.getX () + 1, currentState.getY ()))
		{
		    //System.out.println ("Astar(): Going Down ");
		    temp.setX (currentState.getX () + 1);
		    temp.setY (currentState.getY ());
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going Right
	    if ((currentState.getY () + 1) < mapPlan.length && (!visited [currentState.getX ()] [currentState.getY () + 1]))
	    {
		if (!istoDeep (currentState.getX (), currentState.getY () + 1))
		{
		    //System.out.println ("Astar(): Going Right ");
		    temp.setX (currentState.getX ());
		    temp.setY (currentState.getY () + 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going Up
	    if ((currentState.getX () - 1) >= 0 && (!visited [currentState.getX () - 1] [currentState.getY ()]))
	    {
		if (!istoDeep (currentState.getX () - 1, currentState.getY ()))
		{
		    //System.out.println ("Astar(): Going Up ");
		    temp.setX (currentState.getX () - 1);
		    temp.setY (currentState.getY ());
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going Left
	    if ((currentState.getY () - 1) >= 0 && (!visited [currentState.getX ()] [currentState.getY () - 1]))
	    {
		if (!istoDeep (currentState.getX (), currentState.getY () - 1))
		{
		    //System.out.println ("Astar(): Going Left ");
		    temp.setX (currentState.getX ());
		    temp.setY (currentState.getY () - 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going South East
	    if ((currentState.getX () + 1) < mapPlan.length && (currentState.getY () + 1) < mapPlan.length && (!visited [currentState.getX () + 1] [currentState.getY () + 1]))
	    {
		if (!istoDeep (currentState.getX () + 1, currentState.getY () + 1))
		{
		    //System.out.println ("Astar(): Going South East ");
		    temp.setX (currentState.getX () + 1);
		    temp.setY (currentState.getY () + 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going North West
	    if ((currentState.getX () - 1) >= 0 && (currentState.getY () - 1) >= 0 && (!visited [currentState.getX () - 1] [currentState.getY () - 1]))
	    {
		if (!istoDeep (currentState.getX () - 1, currentState.getY () - 1))
		{
		    //System.out.println ("Astar(): Going North West ");
		    temp.setX (currentState.getX () - 1);
		    temp.setY (currentState.getY () - 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going North East
	    if ((currentState.getX () - 1) >= 0 && (currentState.getY () + 1) < mapPlan.length && (!visited [currentState.getX () - 1] [currentState.getY () + 1]))
	    {
		if (!istoDeep (currentState.getX () - 1, currentState.getY () + 1))
		{
		    //System.out.println ("Astar(): Going North East ");
		    temp.setX (currentState.getX () - 1);
		    temp.setY (currentState.getY () + 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    //*** Going South West
	    if ((currentState.getX () + 1) < mapPlan.length && (currentState.getY () - 1) >= 0 && (!visited [currentState.getX () + 1] [currentState.getY () - 1]))
	    {
		if (!istoDeep (currentState.getX () + 1, currentState.getY () - 1))
		{
		    //System.out.println ("Astar(): Going South West ");
		    temp.setX (currentState.getX () + 1);
		    temp.setY (currentState.getY () - 1);
		    visited [currentX] [currentY] = true;
		    priority = H_Manhattan (temp.getX (), temp.getY ()) + G_Path (temp.getX (), temp.getY ());
		    System.out.println ("The Priority " + priority);
		    openQueue.arrive (temp, priority);
		    temp = new Coordinate (0, 0);
		}
	    }
	    if (!openQueue.isEmpty ())
	    {
		Coordinate myMove = new Coordinate (0, 0);
		myMove = (Coordinate) openQueue.leave ();
		currentX = myMove.getX ();
		currentY = myMove.getY ();
	    }
	    currentState.setX (currentX);
	    currentState.setY (currentY);
	    System.out.println ();
	    //System.out.println ("I move here to " + currentX + ", " + currentY);
	    System.out.println ("I move here to " + currentState.getX () + ", " + currentState.getY ());
	    //*** display move to a new state by painting cell black
	    star.moveToCell (currentX, currentY);
	    star.wait (100);
	    //*** erase current move and repaint previous cell color
	    star.clearCell (currentX, currentY);
	    openQueue = new PriorityQueue();

	}
	System.out.println ("Congratulations You have reached the Goal");
    }


    public static void Spath ()
    {
	//*** create a new frame and make it visible
	AStar star = new AStar ();
	star.setVisible (true);


	//*** start at position (0,0)
	//*** goal is at the lower right-hand corner (mapPlan.length-1, mapPlan.length-1)
	//***
	int currentX = 0, currentY = 0;
	boolean toggle = true;
	while (currentX < mapPlan.length && currentY < mapPlan.length)
	{
	    //*** display move to a new state by painting cell black
	    star.moveToCell (currentX, currentY);

	    //*** erase current move and repaint previous cell color
	    star.clearCell (currentX, currentY);

	    //*** zig-zag down right down right down ...
	    if (toggle)
		currentX++;
	    else
		currentY++;

	    toggle = !toggle;
	}

    }


    //*******************************************************************
    //*** include A* algorithm here
    //***
    public static void main (String[] args)
    {
	//*** add some random colors to the interior map
	for (int i = 3 ; i < mapPlan.length - 3 ; i++)
	    for (int j = 3 ; j < mapPlan.length - 3 ; j++)
		if (mapPlan [i] [j] == 4)
		    mapPlan [i] [j] = randomInt (4);


	//Spath();
	Astar ();
    }
}
