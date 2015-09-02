/* ************************************************************************
   GameBoard
   Forouraghi
   February 2006
************************************************************************* */

import javax.swing.*;
import java.awt.*;

//**************************************************************************
class GameBoard extends JPanel
{

   JPanel[][] tile;
   ImageIcon  icon;
   JLabel     label;

   //***********************************************************************
   GameBoard(int[][] boardPlan)
   {
      //*** set up the game board based on user preference matrix boardPlan
      setLayout(new GridLayout(boardPlan.length, boardPlan.length));
      tile = new JPanel[boardPlan.length][boardPlan.length];

      //*** get to work
      drawBoard(boardPlan);
   }

   //***********************************************************************
   void makeTile(int i, int j, Color c)
   {
       //*** give the tile the requested background color
       tile[i][j].setBackground(c);

       //*** line thickness is 0
       tile[i][j].setBorder(BorderFactory.createEmptyBorder ());

       //*** display new component
       tile[i][j].validate();
   }

   //***********************************************************************
   //*** place an image in a cell
   void drawPiece(int i, int j, String image)
   {
       //*** start with a clean slate
       tile[i][j].removeAll();
       icon = new ImageIcon(image);
       label = new JLabel(icon);

       //*** add the image of the requested piece to this cell
       tile[i][j].add(label);
       tile[i][j].validate();
   }

   //***********************************************************************
   void drawBoard(int[][] boardPlan)
   {
      //*** draw board
      for (int i=0; i<boardPlan.length; i++)
        for (int j=0; j<boardPlan.length;j++)
        {
           //*** each tile is a small JPanel
           tile[i][j] = new JPanel();

           //*** color a tile according to its position on board
           colorTile(i, j);

        //*** add the new tile to the game board
        add(tile[i][j]);
        }
   }

   //***********************************************************************
   void colorTile(int i, int j)
   {
       //*** even numbered tiles are colored beige
       if ((i+j) % 2 == 0)
           makeTile(i, j, new Color(255,239,183));

       //*** odd numbered tiles are colored brown
       else
           makeTile(i, j, new Color(128,0,0));
   }

}







