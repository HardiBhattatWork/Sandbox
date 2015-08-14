/**
    \file JImageViewer.java
    JImageViewer class.

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

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;

import javax.media.jai.PlanarImage;
import javax.media.jai.JAI;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;

//----------------------------------------------------------------------
/** \brief JImageViewer class.
 */
public class JImageViewer
    extends JFrame implements ActionListener {

  String myMessage = " ";

  JMenuBar mMenuBar = new JMenuBar();
  JMenu mFile = new JMenu("File");
  JMenuItem mOpen = new JMenuItem("Open");
  JMenuItem mClose = new JMenuItem("Close");
  JMenuItem mSave = new JMenuItem("Save");
  JMenuItem mSaveAs = new JMenuItem("Save As");
  JMenuItem mExit = new JMenuItem("Exit");

  JMenu mBinary = new JMenu("Binary");
  JMenuItem mIsBinary = new JMenuItem("Is binary?");
  JMenuItem mHasBorder = new JMenuItem("Border pixels are 0's?");
  JMenuItem mIs4Connected = new JMenuItem("Is 4-connected?");
  JMenuItem mNumObjects = new JMenuItem("Number of objects");

  ImagePanel mImagePanel = new ImagePanel(this); ///< panel in which an image may be displayed
  Image mImage;
  //----------------------------------------------------------------------
  /** \brief Ctor that simply creates an empty window.
   */
  public JImageViewer() {
    try {
      jbInit(null);
    }
    catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  //----------------------------------------------------------------------
  /** \brief Ctor that given the name of an image file, displays that
   *  image in a window.
   */
  public JImageViewer(String fname) {
    try {
      jbInit(fname);
    }
    catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  //----------------------------------------------------------------------
  /** \brief Main application entry point.
   *
   *  \param args Each image file name in args will cause that image to be
   *  displayed in a window.
   */
  public static void main(String[] args) {
    if (args.length == 0) {
      new JImageViewer();
    }
    else {
      for (int i = 0; i < args.length; i++) {
        new JImageViewer(args[i]);
      }
    }
  }

  //----------------------------------------------------------------------
  /** \brief Load and display an image.
   */
  private void jbInit(String fn) {
    setupMenu();
    //was a file name specified?
    if (fn != null) {
      mImage = new Image(fn);
    }
    getContentPane().add(mImagePanel);
    if (fn == null) {
      setSize(300, 200);
      setTitle("JImageViewer");
    }
    else {
      setSize(mImage.mW + 100, mImage.mH + 100);
      setTitle("JImageViewer: " + fn);
    }
    setLocation(50, 50);
    setVisible(true);
  }

  //----------------------------------------------------------------------
  /** \brief Respond to menu actions.
   */
  public void actionPerformed(ActionEvent e) {
    float NumObj = 0;
    if (e.getSource() == mExit) {
      System.exit(0);
    }
    else if (e.getSource() == mOpen) {
      JFileChooser chooser = new JFileChooser();
      int ret = chooser.showOpenDialog(this);
      if (ret == JFileChooser.APPROVE_OPTION) {
        new JImageViewer(chooser.getSelectedFile().getAbsolutePath());
      }
    }
    else if (e.getSource() == mIsBinary) {

      if (isBinary()) {
        JOptionPane.showMessageDialog(this, "Yes it is Binary");
      }
      else {
        JOptionPane.showMessageDialog(this, "No it is not Binary");
      }
    }
    else if (e.getSource() == mHasBorder) {
      if (hasBorder()) {
        JOptionPane.showMessageDialog(this,
                                      "Yes the image border pixels are 0's");
      }
      else {
        JOptionPane.showMessageDialog(this,
                                      "No the image border pixels are not 0's ");
      }
      //JOptionPane.showMessageDialog(this, "hello");
    }
    else if (e.getSource() == mIs4Connected) {
      if (is4Connected()) {
        JOptionPane.showMessageDialog(this, "Yes the image is 4 connected");
      }
      else {
        JOptionPane.showMessageDialog(this, "Yes the image is not 4 connected");
      }
    }
    else if (e.getSource() == mNumObjects) {
      NumObj = numObjects();
      if (NumObj >= 0) {
        JOptionPane.showMessageDialog(this,
                                      "The number of objects are " + NumObj);
      }
      else {
        JOptionPane.showMessageDialog(this,
                                      "The number of objects cannot be determined");
      }
    }
  }

  //----------------------------------------------------------------------
  /** \brief Set up the menu bar.
   */
  private void setupMenu() {
    setJMenuBar(mMenuBar);

    mMenuBar.add(mFile);
    mFile.add(mOpen);
    mFile.add(mClose);
    mFile.add(mSave);
    mFile.add(mSaveAs);
    mFile.addSeparator();
    mFile.add(mExit);

    mMenuBar.add(mBinary);
    mBinary.add(mIsBinary);
    mBinary.add(mHasBorder);
    mBinary.add(mIs4Connected);
    mBinary.add(mNumObjects);

    mOpen.addActionListener(this);
    mSave.addActionListener(this);
    mSaveAs.addActionListener(this);
    mExit.addActionListener(this);

    mIsBinary.addActionListener(this);
    mHasBorder.addActionListener(this);
    mIs4Connected.addActionListener(this);
    mNumObjects.addActionListener(this);
  }

  //----------------------------------------------------------------------
  /** \brief Set up Is binary method
   *
   * @return boolean
   */
  public boolean isBinary() {
    for (int row = 0; row < mImage.mH; row++) {
      for (int col = 0; col < mImage.mW; col++) {
        //System.out.println( mImage.mImage[(row*mImage.mW)+col] );
        if (mImage.mImage[ (row * mImage.mW) + col] != mImage.mMin &&
            mImage.mImage[ (row * mImage.mW) + col] != mImage.mMax) {
          return false;
        }
      }
    }
    return true;
  }

  //----------------------------------------------------------------------
  /** \brief Set up has Border method
   *
   * @return boolean
   */


  public boolean hasBorder() {
    int row = 0, col = 0;
    for (col = 0; col < mImage.mH; col++) {
      if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
          mImage.mImage[ ( (mImage.mH - 1) * mImage.mW) + col] == mImage.mMax) {
        return false;
      }
    }
    row = 0;
    col = 0;
    for (row = 0; row < mImage.mW; row++) {
      if (mImage.mImage[ ( (row * mImage.mW) + col)] == mImage.mMax &&
          mImage.mImage[ ( (row * mImage.mW) + (mImage.mW - 1))] == mImage.mMax) {
        return false;
      }
    }
    return true;
  }

  //----------------------------------------------------------------------
  /** \brief Set up Is 4 Connected method
   *
   * 1 0    0 1
   * 0 1    1 0
   * @return boolean
   */
  public boolean is4Connected() {
    for (int row = 0; row < mImage.mH - 1; row++) {
      for (int col = 0; col < mImage.mW - 1; col++) {
        if (row != 0 && col != 0) {
          if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
              mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMin &&
              mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMin &&
              mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] ==
              mImage.mMax) {
            return false;
          }
          if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMin &&
              mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMax &&
              mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMax &&
              mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] ==
              mImage.mMin) {
            return false;
          }
        }
      }
    }

    return true;
  }

  //----------------------------------------------------------------------
  /** \brief Counting the number of objects
   * external_match
   * 0 0  0 1  1 0  0 0
   * 0 1  0 0  0 0  1 0
   *
   * internal_match
   * 1 1  1 0  1 1  0 1
   * 1 0  1 1  0 1  1 1
   *
   * @return int
   */

  public float numObjects() {
    float NumObj = -1;
    long extCount = 0;
    long intCount = 0;
    for (int row = 0; row < mImage.mH - 1; row++) {
      for (int col = 0; col < mImage.mW - 1; col++) {
        if (external_match(row, col)) {
          extCount++;
        }
        if (internal_match(row, col)) {
          intCount++;
        }
      }
    }
    NumObj = (extCount - intCount) / 4;
    return NumObj;
  }

  //----------------------------------------------------------------------
  /** \brief Counting the external corners of the object
   *
   */
  public boolean internal_match(int row, int col) {
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMin) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMax) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMax) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMax) {
      return true;
    }

    return false;
  }

  //----------------------------------------------------------------------
  /** \brief Counting the internal corners of the object
   *
   */
  public boolean external_match(int row, int col) {
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMax) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMin) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMin) {
      return true;
    }
    if (mImage.mImage[ (row * mImage.mW) + col] == mImage.mMax &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + col] == mImage.mMin &&
        mImage.mImage[ (row * mImage.mW) + (col + 1)] == mImage.mMin &&
        mImage.mImage[ ( (row + 1) * mImage.mW) + (col + 1)] == mImage.mMin) {
      return true;
    }

    return false;
  }
}
//----------------------------------------------------------------------
