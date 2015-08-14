/*****************************************************************************/
/*                                                                           */
/* EPuzzleMove.java                                                          */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: March 10, 2006                                                      */
/*                                                                           */
/*                                                                           */
/*                                                                           */
/* Instance Variables:                                                       */
/*      tile - Holds the tile representating the number                      */
/*      icon - The icon of the image                                         */
/*      label - The label of the image                                       */
/*                                                                           */
/* Constructors:                                                             */
/*   BoardPanel( boardPlan )                                                 */
/*                                                                           */
/* Methods:                                                                  */
/*   makeBlankTile - Creates the blank tile for the board                    */
/*   makeNonBlankTile - places the nonblank tiles or numbers on the board    */
/*   drawBoard - Drews the board including the blank                         */
/*   reDraw - Redraws the board                                              */
/*                                                                           */
/*****************************************************************************/

import javax.swing.*;
import java.awt.*;

//***********************************************************************
class BoardPanel extends JPanel
{

   JPanel[][] tile;
   ImageIcon  icon;
   JLabel     label;

   //******************************************
   BoardPanel(char[][] boardPlan)
   {
      //*** set up the puzzle board based on user preference matrix boardPlan
      setLayout(new GridLayout(boardPlan.length, boardPlan[0].length));
      tile = new JPanel[boardPlan.length][boardPlan[0].length];

      //*** get to work
      drawBoard(boardPlan);
   }


   //********************************************
   void makeBlankTile(int i, int j, JPanel[][] tile)
   {
       //*** give the tile black background
       tile[i][j].setBackground(Color.black);

       //*** line thickness is 5
       tile[i][j].setBorder(BorderFactory.createLineBorder (new Color(80,80,80), 5));

       //*** display new component
       tile[i][j].validate();
   }


   //********************************************
   void makeNonBlankTile(int i, int j, JPanel[][] tile, char[][] boardPlan)
   {
       //*** first clean up the tile
       makeBlankTile(i, j, tile);

       //*** now Set up the tile label
       label = new JLabel(Character.toString(boardPlan[i][j]), JLabel.CENTER);
       label.setFont(new Font("Serif", Font.BOLD, 48));
       label.setForeground(Color.yellow);
       label.setVerticalTextPosition(JLabel.CENTER);
       label.setHorizontalTextPosition(JLabel.CENTER);

       //*** add the label onto the tile and display it
       tile[i][j].add(label);
       tile[i][j].validate();
   }

   
   //*****************************************************
   void drawBoard(char[][] boardPlan)
   {
      //*** draw board
      for (int i=0; i<boardPlan.length; i++)
	for (int j=0; j<boardPlan[0].length;j++)
	{
	   //*** each tile is a small JPanel
	   tile[i][j] = new JPanel();

	   //*** empty tile is colored black
	   if (boardPlan[i][j]==' ')
	      makeBlankTile(i, j, tile);

	   //*** other tiles get a label
	   else
	      makeNonBlankTile(i, j, tile, boardPlan);

	//*** add the new tile to the puzzle board
	add(tile[i][j]);
	}
   }

   //**********************************************
   //*** switch two tiles second of which is the blank
   void reDraw(int i1, int j1, int i2, int j2, char[][] currentState)
   {
      //*** swap blank and nonblank tiles
      char temp = currentState[i1][j1];
      currentState[i1][j1] = currentState[i2][j2];
      currentState[i2][j2] = temp;

      //*** empty tile is colored black
      tile[i2][j2].removeAll();
      makeBlankTile(i2, j2, tile);

      //*** Set up the numbered tile
      makeNonBlankTile(i1, j1, tile, currentState);
   }
}








