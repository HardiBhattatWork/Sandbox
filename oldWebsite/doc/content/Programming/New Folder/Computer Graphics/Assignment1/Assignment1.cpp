//---------------------------------------------------------------------//
/* Hardik Bhatt                Assignment 1                    9/29/05 */
/*                                                                     */
/* Discription: A program that originally creates a red diamond a blue */
/*   rectangle and a green triangle and using library functions the    */
/*   purpose of this assignment is to make the colors of the diamond,  */
/*   rectangle and triangle change by using the given operations. And  */
/*   move the positions of the rectangle and diamond by clicking and   */
/*   moving the mouse                                                  */
/*                                                                     */
/*                                                                     */
/*                                                                     */
//---------------------------------------------------------------------//

#include <stdlib.h>			// standard definitions
#include <iostream.h>			// C++ I/O
#include <stdio.h>			// C I/O (for sprintf) 
#include <math.h>			// standard definitions

#include <GL/glut.h>			// GLUT
#include <GL/glu.h>			// GLU
#include <GL/gl.h>			// OpenGL

// global variable declarations

GLint windowHeight, windowWidth;
//boolean used to manage the color changing
GLboolean MY_SWAP = true;
GLboolean MY_TRI = true;

//temperary variable holders
GLfloat REC_X, REC_Y = 0;
GLfloat TRI_X, TRI_Y = 0;
GLfloat DIM_X, DIM_Y = 0;
GLfloat MY_DIR = 0.02;


//-----------------------------------------------------------------------
//	Sets up some default OpenGL values.
//-----------------------------------------------------------------------

void myInit()
{
    glClearColor(0.5, 0.5, 0.5, 1.0);		// background color
    glShadeModel(GL_SMOOTH);		// smooth shading
}

//-----------------------------------------------------------------------
// reshape callback function
//	This is called each time the window is reshaped
//-----------------------------------------------------------------------
void myReshape(int winWidth, int winHeight) 
{

  windowHeight = winHeight;
  windowWidth = winWidth;

  // update projection
  glViewport (0, 0, winWidth,  winHeight);  // update the viewport
  glMatrixMode(GL_PROJECTION);              // update the projection
  glLoadIdentity();               

  gluOrtho2D(-1.0, 1.0, -1.0, 1.0);           // map unit square to viewport
  glMatrixMode(GL_MODELVIEW);

  glutPostRedisplay();                      // request redisplay
  
  
}



//-----------------------------------------------------------------------
// display callback function
//	This is called each time application needs to redraw itself.
//-----------------------------------------------------------------------

void myDisplay()
{
    glClear(GL_COLOR_BUFFER_BIT);       // clear the window
   	
    
	if (MY_SWAP == true)
		glColor3f(1.0, 0.0, 0.0);       // set color to red
	else
		glColor3f(0.0, 0.0, 1.0);       // set color to blue
	
    glBegin(GL_POLYGON);            // list the vertices to draw a diamond
	glVertex2f(0.00 + DIM_X, 0.80 + DIM_Y);
	glVertex2f(-0.80 + DIM_X, 0.00 + DIM_Y);
	glVertex2f(0.00 + DIM_X, -0.80 + DIM_Y);
	glVertex2f(0.80 + DIM_X, 0.00 + DIM_Y);
    glEnd();
    
	if (MY_SWAP == true)
		glColor3f(0.0, 0.0, 1.0);       // set color to blue
	else
		glColor3f(1.0, 0.0, 0.0);       // set color to red
	
	glRectf(-0.5 + REC_X, -0.5 + REC_Y, 0.5 + REC_X, 0.5 + REC_Y);  // draw a rectangle (lower left and upper right corners specified)
	
	
	if (MY_TRI == true)
		glColor3f(0.0, 1.0, 0.0);       // set color to green
	else
		glColor3f(0.0, 0.0, 0.0);       // set color to black
	
	glBegin(GL_TRIANGLES);		// Drawing Using Triangles
	glVertex2f( 0.0 + TRI_X, 0.35 + TRI_Y);		// Top
	glVertex2f(-0.2 + TRI_X,-0.17 + TRI_Y);		// Bottom Left
	glVertex2f( 0.2 + TRI_X,-0.17 + TRI_Y);		// Bottom Right
    glEnd();					// Finished Drawing

    glFlush();				// force OpenGL to render now

    glutSwapBuffers();			// swap buffers
}

//-----------------------------------------------------------------------
// keyboard callback function
//	This is called whenever a keyboard key is hit.
//-----------------------------------------------------------------------

void myKeyboard(unsigned char c, int x, int y)
{
    switch (c)
    {
      case 'q':
		  exit(0);			// exit
	  break;
	}
    glutPostRedisplay();		// request redisplay
}

void mySpecialKeys (int key, int x, int y)
{
	//if the ctrl key is pressed the triangle moves if not
	//the rectangle will move using the arrow keys
	if (glutGetModifiers() == GLUT_ACTIVE_CTRL)
	{
		switch(key)		//mainting the movement key fot the triangle
		{
			case GLUT_KEY_LEFT:		
				TRI_X = TRI_X - MY_DIR;
			break;
			case GLUT_KEY_RIGHT:
				TRI_X = TRI_X + MY_DIR;
			break;
			case GLUT_KEY_UP:
				TRI_Y = TRI_Y + MY_DIR;
			break;
			case GLUT_KEY_DOWN:
				TRI_Y = TRI_Y - MY_DIR;
			break;
		}	//end switch statement
	}	//end if statement
	else
	{
		switch(key)		//mainting the movement key fot the rectangle
		{
			case GLUT_KEY_LEFT:
				REC_X	= REC_X - MY_DIR;
		    break;
			case GLUT_KEY_RIGHT:
				REC_X	= REC_X + MY_DIR;
		    break;
			case GLUT_KEY_UP:
				REC_Y	= REC_Y + MY_DIR;
			break;
			case GLUT_KEY_DOWN:
				REC_Y	= REC_Y - MY_DIR;
			break;
		}	//end switch statement
	}	//end else statement
	glutPostRedisplay();		// request redisplay
}

void myMotionRec(int x, int y)
{
	//maintaning the x and y coordinate of the mouse to move the
	//rectangle respectively
	REC_X = ((x - 200.0)/200.0);
	REC_Y = (((400.0 - y) - 200.0)/200.);
	glutPostRedisplay();		// request redisplay
}

void myMotionDim(int x, int y)
{
	//maintaning the x and y coordinate of the mouse to move the
	//diamond respectively
	DIM_X = ((x - 200.0)/200.0);
	DIM_Y = (((400.0 - y)-200.0)/200.0);
	glutPostRedisplay();			// request redisplay
}


// called if mouse click
void myMouse(int b, int s, int x, int y) 
{
	switch  ( b ) 
	{    // b indicates the button
	case GLUT_LEFT_BUTTON:
		if (s == GLUT_DOWN)      // button pressed
		{
			MY_SWAP = !MY_SWAP;
			glutMotionFunc(myMotionRec);
		}
		else if (s == GLUT_UP)   // button released
		{
			MY_SWAP = MY_SWAP;
		}
	break;
		
	case GLUT_RIGHT_BUTTON:
		if (s == GLUT_DOWN)      // button pressed
		{
			MY_TRI = !MY_TRI;
			glutMotionFunc(myMotionDim);
		}
		else if (s == GLUT_UP)   // button released
		{
			MY_TRI = !MY_TRI;
		}
		break;
	}	//end switch statement
	glutPostRedisplay();			  // request redisplay
}



// called if timer event occurs
void myTimeOut(int id) 
{
	// advance the state of animation incrementally
	glutPostRedisplay();			  // request redisplay
	glutTimerFunc(10000, myTimeOut, 0);  // request next timer event
	MY_SWAP = !MY_SWAP;
}



//-----------------------------------------------------------------------
// main program
//	
//-----------------------------------------------------------------------
int main(int argc, char **argv)
{
    				
    glutInit(&argc, argv);   //initialize glut and gl
    glutInitDisplayMode(		
		GLUT_DOUBLE |		// double buffering
		GLUT_RGB );		    // RGB color mode

    glutInitWindowSize(400, 400);   // 400x400 window
    glutInitWindowPosition(0,0);    // upper left
    glutCreateWindow("My First OpenGL Program: Assignment 1"); 	// create the window

	//register callbacks
    glutDisplayFunc(myDisplay);		//  call myDisplay to redraw window
    //keyboard entries
    glutKeyboardFunc(myKeyboard);   // call myKeyboard when key is hit
	glutSpecialFunc(mySpecialKeys); //call mySpecialKeys when key is hit
	
    //Mouse entries
    glutReshapeFunc(myReshape);     // call myReshape if window is resized
    glutMouseFunc(myMouse);         // call in mouse event
	glutMotionFunc(NULL);

	//OpenGL Timer
    glutTimerFunc(10000, myTimeOut, 0);

    myInit();				// our own initializations

    glutMainLoop();			// pass control to GLUT, start it running
    return 0;               // ANSI C expects this
}