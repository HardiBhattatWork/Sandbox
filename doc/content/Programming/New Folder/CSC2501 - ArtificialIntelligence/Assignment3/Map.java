/*****************************************************************
      Map
      Hardik Bhatt
      February 2006
      Sets up the needed map for the A* algorithm using a map plan
*/

import java.awt.*;
import javax.swing.*;
import java.applet.*;


//***********************************************************
//*** this class draws a map based on user preference mapPlan
//***
class Map extends JPanel
{

   JPanel[][] cell;
   ImageIcon  icon;
   JLabel     label;

   //********************************************************
   //*** draw the frame landscape based on user preferences
   //***
   Map(int[][] mapPlan, boolean[][] visited)
   {
     //*** set up a rectangular grid for the requested map
     GridLayout gl = new GridLayout(mapPlan.length, mapPlan.length, 0, 0);
     setLayout(gl);
     cell = new JPanel[mapPlan.length][mapPlan.length];

     //*** draw map
     for (int i=0; i<mapPlan.length; i++)
       for (int j=0; j<mapPlan.length; j++)
	   {
	     //*** initially, mark each state as unvisited
	     visited[i][j] = false;
	   
	     //*** create a new cell
	     cell[i][j] = new JPanel();

	     //*** empty border with 0 gaps on all four sides
	     cell[i][j].setBorder(BorderFactory.createEmptyBorder(0,0,0,0));

	     //*** draw a cell as ocean = blue = 0,   hill = red = 1,
	     //***                forest = green = 2, desert = yellow = 3,
	     //***                mountain =  white = 4;
	     setupCell(mapPlan, i, j, false);

	     //*** add cell to the overall frame and display it
	     add(cell[i][j]);
	     validate();
	  }
   }

   //********************************************************
   //*** place a picture in a cell or remove it
   //***
   void setupCell(int[][] mapPlan, int i, int j, boolean remove)
   {
       //*** user decides whether to erase or draw a cell
       if (remove)
	  cell[i][j].setBackground(Color.black);

       //*** cells are color coded using predefined values
       else
	  switch(mapPlan[i][j])
	  {
	  case 0:
	      cell[i][j].setBackground(ColorCode.ocean);
	      break;
	  case 1:
	      cell[i][j].setBackground(ColorCode.hill);
	      break;
	  case 2:
	      cell[i][j].setBackground(ColorCode.forest);
	      break;
	  case 3:
	      cell[i][j].setBackground(ColorCode.desert);
	      break;
	  case 4:
	      cell[i][j].setBackground(ColorCode.mountain);
	      break;
	 }

      cell[i][j].validate();
   }

}


//*****************************************************
//*** an auxiliary class
//***
class ColorCode
{
     static Color  ocean    = Color.blue;
     static Color  desert   = Color.yellow;
     static Color  forest   = Color.green;
     static Color  hill     = Color.red;
     static Color  mountain = Color.white;
}






