/*****************************************************************************/
/*                                                                           */
/** \file Coordinate.java                                                    */
/*  Coordinate class.                                                        */
/*                                                                           */
/* \author Hardik Bhatt., hb259138@sju.edu                                   */
/* \date February 6, 2006                                                    */
/*                                                                           */
/* A class that a node to be used in a linked list data structure            */
/*                                                                           */
/* Instance Variables:                                                       */
/*      x - of type int, is the x coordinate this is to be held by the class */
/*      y - of type int, is the y coordinate this is to be held by the class */
/*                                                                           */
/* Constructors:                                                             */
/*   Coordinate( x, y )                                                      */
/*                                                                           */
/* Methods:                                                                  */
/*   getX - returns the x coordinate                                         */
/*   getY - returns the y coordinate                                         */
/*   setx - sets the x coordinate                                            */
/*   setY - sets the y coordinate                                            */
/*                                                                           */
/*****************************************************************************/

public class Coordinate
{
    private int x;
    private int y;

    public Coordinate (int x, int y)
    {
	this.x = x;
	this.y = y;
    }


    public int getX ()
    {
	return x;
    }


    public int getY ()
    {
	return y;
    }


    public void setX (int x)
    {
	this.x = x;
    }


    public void setY (int y)
    {
	this.y = y;
    }
} // end class
