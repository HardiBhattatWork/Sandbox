/*****************************************************************************/
/*                                                                           */
/* MazePanel.java                                                            */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that implements the MazePanel algorithm                           */
/*                                                                           */
/* Instance Variables:                                                       */
/*      wall - Constant that holds the position of a wall                    */
/*      icon - Image Icon                                                    */
/*      label - Labeling                                                     */
/*                                                                           */
/* Constructors:                                                             */
/*   MazePanel(int[][] mazePlan, boolean[][] visited)                        */
/*                                                                           */
/* Methods:                                                                  */
/*   setupChar(i, j, charac) - place an image in a cell                      */
/*   removeChar(int i, int j) - erase image from a cell                      */
/*                                                                           */
/*****************************************************************************/

import java.util.*;
import java.awt.*;
import javax.swing.*;
import java.net.*;
import java.applet.*;

//***********************************************************************
class MazePanel extends JPanel
{

  JPanel[][] wall;
  ImageIcon icon;
  JLabel label;

  //******************************************
   MazePanel(int[][] mazePlan, boolean[][] visited)
   {
     setLayout(new GridLayout(mazePlan.length, mazePlan[0].length));
     wall = new JPanel[mazePlan.length][mazePlan[0].length];
     
     //*** draw maze
      for (int i = 0; i < mazePlan.length; i++)
      {
        for (int j = 0; j < mazePlan[0].length; j++)
        {
          //*** initially, mark each state as unvisited
           visited[i][j] = false;

          wall[i][j] = new JPanel();

          //*** empty positions are colored black
           if (mazePlan[i][j] == 0)
           {
             wall[i][j].setBackground(Color.black);
             wall[i][j].setBorder(BorderFactory.createLineBorder(new Color(60,
                 60, 60), 1));
           }

           //*** color orange marks obstacles and walls
            else
            {
              wall[i][j].setBackground(Color.orange);
              wall[i][j].setBorder(BorderFactory.createLineBorder(Color.orange,
                  1));
              visited[i][j] = true;
            }

          add(wall[i][j]);
        }
      }

   }

  //********************************************
   //*** place an image in a cell
    void setupChar(int i, int j, String charac)
    {
      icon = new ImageIcon(charac);
      label = new JLabel(icon);
		wall[i][j].removeAll();
      wall[i][j].add(label);
      wall[i][j].validate();

    }

  //********************************************
   //*** erase image from a cell by replacing it with blank
    void removeChar(int i, int j)
    {
      icon = new ImageIcon("bblock.gif");
      label = new JLabel(icon);
      wall[i][j].removeAll();
      wall[i][j].add(label);

      wall[i][j].setVisible(true);
      wall[i][j].validate();

    }
}
