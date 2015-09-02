/* ********************************************************************
   PQueue
   Forouraghi
   February 2006

   This code demonstrates how to use java.util.PriorityQueue for MINIMAX
***********************************************************************/

import java.util.*;

//*********************************************************************
public class PQueue
{

    /*   simulate a few dummy MIN moves where 4 moves has moved in
         4 diagonal diractions: NE, SE, SW, NW in here

           {0, 0, 0, 0, 0, 0, 0, 0}   
           {0, 0, 0, 0, 0, 0, 0, 0}
           {0, 0, 0, 0, 0, 0, 0, 0}
           {0, 0, 0, 0, 0, 0, 0, 0}
           {0, 0, 0, 0, 0, 0, 0, 1}
           {1, 0, 4, 0, 3, 0, 0, 0}
           {0, 0, 0, 0, 0, 0, 0, 0}
           {0, 0, 0, 0, 2, 0, 0, 0}   
    */

    static int [][] MINstate1 =
      {
         {0, 0, 0, 0, 0, 0, 0, 0},   
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 4, 0, 0, 0, 0, 0, 1},
         {1, 0, 0, 0, 3, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 2, 0, 0, 0}   
      };

    static int [][] MINstate2 =
      {
         {0, 0, 0, 0, 0, 0, 0, 0},   
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 1, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {1, 0, 0, 0, 3, 0, 0, 0},
         {0, 4, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 2, 0, 0, 0}   
      };

    static int [][] MINstate3 =
      {
         {0, 0, 0, 0, 0, 0, 0, 0},   
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 1, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {1, 0, 0, 0, 3, 0, 0, 0},
         {0, 0, 0, 4, 0, 0, 0, 0},
         {0, 0, 0, 0, 2, 0, 0, 0}   
      };

    static int [][] MINstate4 =
      {
         {0, 0, 0, 0, 0, 0, 0, 0},   
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 1, 0},
         {0, 0, 0, 4, 0, 0, 0, 0},
         {1, 0, 0, 0, 3, 0, 0, 0},
         {0, 0, 0, 0, 0, 0, 0, 0},
         {0, 0, 0, 0, 2, 0, 0, 0}   
      };

    //**************************************************************
    public static void main(String[] args)
    {
          //*** simulate two MIN moves and evaluate them
          CState minMove1 = new CState(MINstate1, "MIN");
          minMove1.evalState();

          //*** simulate a MIN move and evaluate it
          CState minMove2 = new CState(MINstate2, "MIN");
          minMove2.evalState();

          //*** simulate a MIN move and evaluate it
          CState minMove3 = new CState(MINstate3, "MIN");
          minMove3.evalState();

          //*** simulate a MIN move and evaluate it
          CState minMove4 = new CState(MINstate4, "MIN");
          minMove4.evalState();

          //*** create a priority queue of an initial size 6
          PriorityQueue<CState> pQueue = new PriorityQueue<CState>

                (6, new Comparator<CState>()
                   {
                      //*** define your own comparator object for ordering	                   
                      public int compare(CState stateA, CState stateB)
                      {
                       //*** sort into ascending order based on evaluation function e()	          
                       if (stateA.getE() >= stateB.getE())
                         return 1;

                       else
                         return -1;
                      }
                   }
                );

         //*** push the four MIN moves onto the prioity queue
         //*** use the built-in "offer" method
         pQueue.offer(minMove1);
         pQueue.offer(minMove2);
         pQueue.offer(minMove3);
         pQueue.offer(minMove4);

         //*** now remove states from the front of the queue based on their e() values
         //*** use the built-in "poll" method
         int queueSize = pQueue.size();

         for (int i =0; i< queueSize; i++)
             {
             CState temp = pQueue.poll();
             System.out.println(temp.getState()+"\n" + temp.getType() + ": " + temp.getE() + "\n\n");
             }
    }
}




