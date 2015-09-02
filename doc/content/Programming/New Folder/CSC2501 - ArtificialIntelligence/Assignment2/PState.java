

   import java.util.*;

//********************************************************************
//*** this aux class represents an ADT for puzzle states
    public class PState
   {
      private char goalState[][]; //*** the state
      private int g;       //*** the actual cost(n)
      private int h;       //*** the heuristic h(n)
      private int f;       //*** the evaluation function f(n) = g(n) + h(n)
		//*** size of the 2d array
		static int SIZE = 3;
   
      //**************************************************************
      //*** set up a state
       PState(char[][] goalState)
      {
	 this.goalState = goalState;
      }
   
      //**************************************************************
      //*** evaluate a state based on its difference from the goal node
      public int evalState1(char[][] state, int depth)
      {
	 int val = 0;
			this.g = depth;
	 for (int i = 0; i < SIZE; i++) {
	    for (int j = 0; j < SIZE; j++) {
	       if (state[i][j] != goalState[i][j]) {
		  val++;
	       }
	    }
	 }
	 this.h = val;
			return finalState(val, depth);
      }
   //**************************************************************
      //*** evaluate a state based on its similar tiles from the goal node
      public int evalState2(char[][] state, int depth)
      {
	 int correctVal = 0;
			this.g = depth;
	 for (int i = 0; i < SIZE; i++) {
	    for (int j = 0; j < SIZE; j++) {
	       if (state[i][j] == goalState[i][j]) {
		  correctVal++;
	       }
	    }
	 }
	this.h = correctVal;
		  return finalState(correctVal, depth);
      }
	
		public int finalState (int h,int g)
		{
			this.f = g + h;
			return this.f;
		}
   
      //**************************************************************
      //*** get a node's F() value
       int getF()
      {
	 return f;
      }
	
       public void setG(int g)
      {
	 this.g = g;
      }
	
       public int getG ()
      {
	 return g;
      }
	
       public void setH (int h)
      {
	 this.h = h;
      }
	
       public int getH ()
      {
	 return h;
      }
   
      //**************************************************************
      //*** display a matrix representation of a state followed by the
      //*** state's f() value
       public String toString(char[][] state)
      {
	 String s = "";
	 for (int i=0; i<state.length; i++)
	 {
	    for (int j=0; j<state.length; j++)
	       s = s + state[i][j] + " ";
	    s = s + "\n";
	 }
      
	 s = s + "f()=" + f + "\n";
	 return s;
      }
   }
