/*****************************************************************************/
/*                                                                           */
/* Node.java                                                                 */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that a node to be used in a linked list data structure            */
/*                                                                           */
/* Instance Variables:                                                       */
/*      data - of type Object, is the data to be held by the node            */
/*      next - a reference to another node                                   */
/*                                                                           */
/* Constructors:                                                             */
/*   Node( Object, Node )                                                    */
/*                                                                           */
/* Methods:                                                                  */
/*   getData - returns the data portion of the node                          */
/*   getNext - returns the link portion of the node                          */
/*   setNext - sets the link to the given reference                          */
/*                                                                           */
/*****************************************************************************/

    public class Node
   {
      private Object data;
      private Node next;
    
       public Node( Object newData, Node newNext )
      {
         this.data = newData;
         this.next = newNext; // newNext may by null
      }
    
    // Accessor methods:
       public Object getData( )
      {
         return data;
      }
    
       public Node getNext( )
      {
         return next;
      }
    
    // Mutator methods:
    // We may change the links, but
    // never the data
       public void setNext( Node newNext )
      {
         next = newNext;
      }
   } // end class Node
