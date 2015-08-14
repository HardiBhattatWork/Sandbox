/*****************************************************************************/
/*                                                                           */
/* Stack.java                                                                */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that represents a Queue data structure using composition of the   */
/* LinkedList class                                                          */
/*                                                                           */
/* Instance Variables:                                                       */
/*      list - a linked list                                                 */
/*      numItems - the number of items in the queue                          */
/*                                                                           */
/* Constructors:                                                             */
/*   Queue( )                                                                */
/*   Queue( Queue )                                                          */
/*                                                                           */
/* Methods:                                                                  */
/*   push - adds a node to the end of the stack                              */
/*   pop - removes a node from the eld of the stack and returns the          */
/*             data portion                                                  */
/*   peek - returns the data portion from the front of the queue without     */
/*           removing the node                                               */
/*   isEmpty - returns true if the queue is empty, false otherwise           */
/*   clear - empties the queue                                               */
/*   count - returns the number of items in the queue                        */
/*   toString - returns the string representation of the queue               */
/*                                                                           */
/*****************************************************************************/

public class Stack
{
    private LinkedList list;
    private int numItems;

    // No-arg constructor
    public Stack ()
    {
	list = new LinkedList ();
	numItems = 0;
    }


    // Copy constructor
    public Stack (Stack q)
    {
	list = new LinkedList (q.list);
	numItems = q.numItems;
    }


    // Adds an item to the back of the queue
    public void push (Object newData)
    {
	list.insertFront (newData);
	numItems++;
    }


    // Removes an item from the front of the queue and
    // returns the data
    public Object pop ()
    {
	Object item;
	item = list.removeFront ();
	if (item == null)
	 throw new EmptyStackException();
	else if (item != null)
	    numItems--;
	return item;
    }


    // Returns the data from the front of the queue without
    // removing the item from the queue
    public Object peek ()
    {
	return list.getHead ().getData ();
    }


    // returns true if the queue is empty, false otherwise
    public boolean isEmpty ()
    {
	return list.isEmpty ();
    }


    // empties the queue
    public void clear ()
    {
	list.clear ();
	numItems = 0;
    }


    // returns the count of the number of items in the queue
    public int count ()
    {
	return numItems;
    }


    // Returns a string representation of this queue in the form:
    // head --> data --> data --> ... --> data --> null
    public String toString ()
    {
	return list.toString ();
    }
} // End class Queue
