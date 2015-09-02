/*****************************************************************************/
/*                                                                           */
/* PriorityQueue.java                                                        */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 25, 2006                                                   */
/*                                                                           */
/* Implements a priority queue using a linked list. A queue consists of a    */
/* list (a sequence) of elements. The elements can be added to and removed   */
/* from the list on a priority basis (lowest priority values first,          */
/* first-in-first-out (FIFO) basis within priority).                         */
/*                                                                           */
/* Instance Variables:                                                       */
/*      list - a linked list                                                 */
/*      numItems - the number of items in the queue                          */
/*                                                                           */
/* Constructors:                                                             */
/*   PriorityQueue( )                                                        */
/*   PriorityQueue( PriorityQueue )                                          */
/*                                                                           */
/* Methods:                                                                  */
/*   arrive - adds a node in terms of it priority                            */
/*   leave - removes a node from the front of the queue and returns the      */
/*             data portion                                                  */
/*   getLength - return the number of elements in the queue                  */
/*   isEmpty - returns true if the queue is empty, false otherwise           */
/*   isFull - Return true if the queue cannot hold any more elements         */
/*   peek - returns the data portion from the front of the queue without     */
/*           removing the node                                               */
/*   count - returns the number of items in the queue                        */
/*   compare - 
/*                                                                           */
/*****************************************************************************/
   import java.util.*;
    public class PriorityQueue
   {
      protected PQLinkEntry front; // Locate the next element to leave.
      protected int count; // Number of elements in the queue.
   
    // Create a new PriorityQueue object.
       public PriorityQueue ()
      {
         front = null;;
         count = 0;
      } // PriorityQueue constructor.
    
       public PriorityQueue (PriorityQueue pq)
      {
         front = new PQLinkEntry (pq.front);
         count = pq.count;
      }
    // Add element to the priority queue. The queue must not be full.
       public void arrive (Object element, int priority)
      {
      // pre: !full ()
         PQLinkEntry entry;
      
         if ((front == null) || (priority < front.getPriority ()))
         {
            entry = new PQLinkEntry (element, priority, front);
            front = entry;
         }
         else
         {
            PQLinkEntry previous = front;
            PQLinkEntry where;
            while (true)
            {
               where = previous.getLink ();
               if ((where == null) || (priority < where.getPriority ()))
               {
                  break;
               }
               previous = where;
            }
            entry = new PQLinkEntry (element, priority, where);
            previous.setLink (entry);
         }
      
         count++;
      } // arrive method
   
    // Remove the element at the front of the priority queue. The queue 
    // must not be empty.
       public Object leave ()
      {
      // pre: count > 0
         Object element = front.getElement ();
         front = front.getLink ();
         count--;
         return element;
      } // leave method
		
		public int getPriority ()
      {
			PQLinkEntry where = this.front;
         return where.getPriority ();
      } // getPriority method

    // Return number of elements in the queue.
       public int getLength ()
      {
         return count;
      } // length method
   
    // Return true if the queue contains no elements.
       public boolean isEmpty ()
      {
         return count == 0;
      } // empty method
   
    // Return true if the queue cannot hold any more elements.
       public boolean isFull ()
      {
         PQLinkEntry entry = new PQLinkEntry (null, 0, null);
      
         return entry != null;
      } // full method
   	
       public Object peek ()
      {
         return front.getElement ();
      }
   	
       public int count ()
      {
         return count;
      }
   
   } /* PriorityQueue class */
