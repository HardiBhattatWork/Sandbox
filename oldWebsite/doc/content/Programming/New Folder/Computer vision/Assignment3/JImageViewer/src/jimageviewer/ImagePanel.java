/**
    \file ImagePanel.java
    ImagePanel class.

    \author George J. Grevera, Ph.D., ggrevera@sju.edu

    Copyright (C) 2006, George J. Grevera

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307
    USA or from http://www.gnu.org/licenses/gpl.txt.

    This General Public License does not permit incorporating this
    code into proprietary programs.  (So a hypothetical company such
    as GH (Generally Hectic) should NOT incorporate this code into
    their proprietary programs.)
 */
package jimageviewer;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.awt.Graphics;
import java.awt.Image;

import javax.swing.JPanel;
//----------------------------------------------------------------------
/** \brief ImagePanel class.
 */
class ImagePanel extends JPanel implements MouseMotionListener {
    JImageViewer     mParent;
    private boolean  mMouseMoveValid = false;
    private int      mMouseX;  ///< mouse movement x position
    private int      mMouseY;  ///< mouse movement y position
    private Image    mDoubleBuffer = null;    ///< to avoid flicker
    //----------------------------------------------------------------------
    /** \brief Ctor
     */
    ImagePanel ( JImageViewer p ) {
	mParent = p;
	this.addMouseMotionListener( this );
    }
    //----------------------------------------------------------------------
    /** \brief simply call paint
     */
    public void update ( Graphics g ) {
	paint( g );
    }
    //----------------------------------------------------------------------
    /** \brief redraw the panel contents.
     *
     * To avoid flicker (when rapidly redrawing), we will draw into a single
     * image and then draw that image to the panel.
     */
    public void paint ( Graphics g ) {
	//if the size of the panel has changed, we need a new doublebuffer of
	// the correct size.
	Dimension  d = getSize();
	if ( mDoubleBuffer==null || mDoubleBuffer.getWidth(null)!=d.width
	  || mDoubleBuffer.getHeight(null)!=d.height ) {
	    mDoubleBuffer = createImage( d.width, d.height );
	}
	//draw into the doublebuffer
	Graphics  dbg = mDoubleBuffer.getGraphics();
	dbg.setColor( Color.BLACK );
	dbg.fillRect( 0, 0, d.width, d.height );
	dbg.setColor( Color.WHITE );
	if (mParent.mImage!=null && mParent.mImage.mScreenImage!=null) {
	    dbg.drawImage( mParent.mImage.mScreenImage, 0, 0, null );
	    if (mMouseMoveValid)
		dbg.drawString( "(" + mMouseX + "," + mMouseY + ")",
				mParent.mImage.mScreenImage.getWidth()+20, 100 );
	} else if (mMouseMoveValid) {
	    dbg.drawString( "(" + mMouseX + "," + mMouseY + ")", 100, 100 );
	}
	//draw the doublebuffer on the panel
	g.drawImage( mDoubleBuffer, 0, 0, null );
    }
    //----------------------------------------------------------------------
    /** \brief track mouse movement when button is not down.
     */
    public void mouseMoved ( MouseEvent e ) {
	mMouseMoveValid = true;
	mMouseX = e.getX();
	mMouseY = e.getY();
	repaint();
    }
    //----------------------------------------------------------------------
    /** \brief track mouse movement when button is down.
     */
    public void mouseDragged ( MouseEvent e ) {
        mMouseMoveValid = true;
        mMouseX = e.getX();
        mMouseY = e.getY();
        repaint();
    }
}
//----------------------------------------------------------------------
