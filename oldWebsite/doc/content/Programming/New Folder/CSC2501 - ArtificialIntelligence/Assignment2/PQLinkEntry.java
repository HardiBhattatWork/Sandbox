/*****************************************************************************/
/*                                                                           */
/* PQLinkEntry.java                                                          */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: March 10, 2006                                                      */
/*                                                                           */
/* This is an entry for a priority queue implemented                         */
/* using a linked list containing an Object as the entry's data.             */
/*                                                                           */
/* Instance Variables:                                                       */
/*      element - A reference to the data store in the list                  */
/*      priority - A reference to the priority stored in the list            */
/*      link - A likn to the next entry in the list                          */
/*                                                                           */
/* Constructors:                                                             */
/*   PQLinkEntry ( )                                                         */
/*   PQLinkEntry ( PQLinkEntry )                                             */
/*   PQLinkEntry ( Object, int, PQLinkEntry)                                 */
/*                                                                           */
/* Methods:                                                                  */
/* getElement - Return the element of the link entry.                        */
/* getPriority - Return the entry's priority.                                */
/* getLink - Return the link to the next link entry.                         */
/* setLink - Set the link to the next link entry.                            */
/*                                                                           */
/*****************************************************************************/

public class PQLinkEntry
{
    protected Object element; // The entry's data.
    protected int priority; // The entry's priority.
    protected PQLinkEntry link; // The link to the next entry.

    public PQLinkEntry ()
    {
	this.element = null;
	this.priority = -1;
	this.link = null;
    }


    public PQLinkEntry (PQLinkEntry link)
    {
	this.element = null;
	this.priority = -1;
	this.link = link;
    }


    // Create a new priority queue array entry.
    public PQLinkEntry (Object element, int priority, PQLinkEntry link)
    {
	this.element = element;
	this.priority = priority;
	this.link = link;
    } // PQLinkEntry constructor


    // Return the element of the link entry.
    public Object getElement ()
    {
	return element;
    } // getElement method


    // Return the entry's priority.
    public int getPriority ()
    {
	return priority;
    } // getPriority method


    // Return the link to the next link entry.
    public PQLinkEntry getLink ()
    {
	return link;
    } // getLink method


    // Set the link to the next link entry.
    public void setLink (PQLinkEntry newLink)
    {
	link = newLink;
    } // setLink method
} /* PQLinkEntry class */
