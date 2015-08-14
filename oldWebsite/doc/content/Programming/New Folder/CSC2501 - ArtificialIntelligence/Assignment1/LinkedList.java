/*****************************************************************************/
/*                                                                           */
/* LinkedList.java                                                           */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that represents a linked list data structure                      */
/*                                                                           */
/* Instance Variables:                                                       */
/*      head - a reference to the front of the list                          */
/*      tail - a reference to the end of the list                            */
/*                                                                           */
/* Constructors:                                                             */
/*   LinkedList( )                                                           */
/*   LinkedList( LinkedList )                                                */
/*                                                                           */
/* Methods:                                                                  */
/*   isEmpty - returns true if the list is empty, false otherwise            */
/*   getHead - returns the head reference                                    */
/*   getTail - returns the tail reference                                    */
/*   insertFront - inserts a new node at the front of the list               */
/*   insertBack - inserts a new node at the back of the list                 */
/*   removeFront - removes the node from the front of the list and returns   */
/*                 the data portion                                          */
/*   removeBack - removes the node from the back of the list and returns the */
/*                 data portion                                              */
/*   clear - empties the list                                                */
/*   toString - returns a string representation of the list                  */
/*                                                                           */
/*****************************************************************************/

    public class LinkedList
   {
      private Node head; // Reference to first node in list
      private Node tail; // Reference to last node in list
   
    // No-arg constructor
       public LinkedList ()
      {
         head = tail = null;
      }
   
   
    // Copy constructor
       public LinkedList (LinkedList copy)
      {
         Node copyptr = copy.head;
      
         if (copyptr != null)
         {
            head = tail = new Node (copyptr.getData (), null);
            copyptr = copyptr.getNext ();
            while (copyptr != null)
            {
               tail.setNext (new Node (copyptr.getData (), null));
               tail = tail.getNext ();
               copyptr = copyptr.getNext ();
            }
         }
         else
            head = tail = null;
      } // end copy constuctor
   
   
    // Returns true if list is empty, false otherwise
       public boolean isEmpty ()
      {
         return (head == null);
      }
   
   
    // Returns the head reference
       public Node getHead ()
      {
         return head;
      }
   
   
    // Returns the tail reference
       public Node getTail ()
      {
         return tail;
      }
   
   
    // Inserts a node at the front of the list
    // The data is given, and the node is created
    // in this method
       public void insertFront (Object newData)
      {
         if (isEmpty ())
            head = tail = new Node (newData, null);
         else
         {
            Node newNode = new Node (newData, null);
         
            newNode.setNext (head);
            head = newNode;
         // Alternative code:
         // 1. Node newNode = new Node( newData, head );
         //    head = newNode;
         // 2. head = new Node( newData, head );
         }
      } // End method insertFront
   
   
    // Inserts a node at the back of the list
    // The data is given, and the node is created
    // in this method
       public void insertBack (Object newData)
      {
         if (isEmpty ())
            head = tail = new Node (newData, null);
         else
         {
            Node newNode = new Node (newData, null);
         
            tail.setNext (newNode);
            tail = newNode;
         // Alternative code:
         // tail.setNext( new Node( newData, null ) );
         // tail = tail.getNext();
         }
      } // end method insertBack
   
   
    // Removes the node from the front of the list
    // and returns the data from that node
       public Object removeFront ()
      {
         Object returnData;
      
         if (isEmpty ())
            return null;
      
         returnData = head.getData ();
      
         if (head == tail)   // Removing the last node in the list
            head = tail = null;
         else
         {
            head = head.getNext ();
         }
         return returnData;
      } // end method removeFront
   
   
    // Removes the node from the back of the list
    // and returns the data from that node
       public Object removeBack ()
      {
         Object returnData;
      
         if (isEmpty ())
            return null;
      
         returnData = tail.getData ();
      
         if (head == tail)   // Removing last node in the list
            head = tail = null;
         else
         {
            Node previous = head;
         
         // After the while loop, previous will point to the
         // next to last node (which will become the new tail)
            while (previous.getNext () != tail)
               previous = previous.getNext ();
         
            tail = previous;
            tail.setNext (null);
         }
      
         return returnData;
      } // End method removeBack
   
   
    // Empties the list
       public void clear ()
      {
         head = tail = null;
      } // end method clear
   
   
       public int length ()
      {
         return lengthAux (head);
      }
   
   
       private int lengthAux (Node ptr)
      {
         if (ptr == null)
            return 0;
         else
         {
            return 1 + lengthAux (ptr.getNext ());
         }
      }
   
   
       public boolean member (Object data)
      {
         return memberAux (head, data);
      }
   
   
       private boolean memberAux (Node ptr, Object data)
      {
         if (ptr == null)
            return false;
         else if (ptr.getData ().equals (data))
            return true;
         else
            return memberAux (ptr.getNext (), data);
      }
   
   
       public void printReverse ()
      {
         printReverseAux (head);
      }
   
   
       private void printReverseAux (Node ptr)
      {
         if (ptr == null)
            return;
         else
         {
            printReverseAux(ptr.getNext());
            System.out.println(ptr.getData());
         }
      }
   
   
    // Returns a string representation of this list in the form:
    // head --> data --> data --> ... --> data --> null
       public String toString ()
      {
         String str = "";
         Node current;
      
         current = head;
         str += "head --> ";
      
         while (current != null)
         {
            str += (current.getData ()).toString () + " --> ";
            current = current.getNext ();
         }
      
         str += "null";
      
         return str;
      } // End method toString
   } // End class LinkedList


