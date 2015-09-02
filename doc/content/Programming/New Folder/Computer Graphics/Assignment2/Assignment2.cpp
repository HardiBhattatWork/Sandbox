#include <stdlib.h>			// standard definitions
#include <iostream.h>			// C++ I/O
#include <stdio.h>			// C I/O (for sprintf) 
#include <math.h>			// standard definitions

#include <GL/glut.h>			// GLUT
#include <GL/glu.h>			// GLU
#include <GL/gl.h>			// OpenGL

// global variable declarations
GLint windowHeight = 700;
GLint windowWidth = 500;
GLint MAX_X = 5;
GLint MIN_X = 0;
GLfloat NUMALIENX = 4;   //number of alliens in a row in the x direction
GLfloat NUMALIENY = 2;   //number of alliens in a collumn in the y direction
GLfloat ALIENALIVE[NUMALIENX][NUMALIENY]=
{
	{0, 0, 0, 0,},
	{0, 0, 0, 0,}
}; 

//-----------------------------------------------------------------------
//Starting location of the allien ships	
//-----------------------------------------------------------------------
struct Sposition 
{
	GLfloat UpLx;
	GLfloat UpLy;
	GLfloat LoRx;
	GLfloat LoRy;
	GLfloat S_Scale;
}SHIP;

struct Aposition 
{
	GLfloat UpLx;
	GLfloat UpLy;
	GLfloat LoRx;
	GLfloat LoRy;
}ALIEN;

#define  NUMAMMO 200
typedef struct 
{
	float U_x;
	float U_y;
	float D_x;
	float D_y;
}Bomb;

Bomb Bombarray[NUMAMMO];

typedef struct 
{
	float U_x;
	float U_y;
	float D_x;
	float D_y;
}Missile;

Missile Missilearray[NUMAMMO];
int NUMMiss = 0;

//-----------------------------------------------------------------------
//booleans to keep track of actions
//-----------------------------------------------------------------------
GLboolean MYBUMP = false;  //boolean to keep track of the boundries
GLboolean SHIPBUMP = false;
GLboolean MYPAUSE = false; //boolean that keep track of pause of game
GLboolean FIREUP = false;  //boolean to keeps track of the ships ammo fireing
GLboolean FIREDOWN = false; //boolean that keeps track of the allien bombing
GLboolean COLLISION = false; //boolean that keeps track of collisions 
//-----------------------------------------------------------------------
//Starting coordinate holders for actions
//-----------------------------------------------------------------------
GLfloat MOUSEX = 0;   
GLfloat LASERY = 0;  //Maintaning the speed and direction of the bomb fired by the aliens



//Function decleration
void myInit();
void myReshape(int winWidth, int winHeight);
void MyAliens();
float MyShip();
void myAmmo();
void createAmmo();
//void myLaser()
void myDisplay();
void myKeyboard(unsigned char c, int x, int y);
void myMotion(int x, int y);
void myMouse(int b, int s, int x, int y);
void myCollisions();
void myTimeOut(int id);
void myIdle();


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

    glutInitWindowSize(500, 700);   // 400x400 window
    glutInitWindowPosition(0,0);    // upper left
    glutCreateWindow("My OpenGL Program: Assignment 2"); 	// create the window

	//register callbacks
    glutDisplayFunc(myDisplay);		//  call myDisplay to redraw window
    //keyboard entries
    glutKeyboardFunc(myKeyboard);   // call myKeyboard when key is hit
	
    //Mouse entries
    glutReshapeFunc(myReshape);     // call myReshape if window is resized
    glutMouseFunc(myMouse);         // call in mouse event
	glutPassiveMotionFunc(myMotion);

	//OpenGL Timer
	glutIdleFunc(myIdle);
    glutTimerFunc(10000, myTimeOut, 0);

    myInit();				// our own initializations

    glutMainLoop();			// pass control to GLUT, start it running
    return 0;               // ANSI C expects this
}

//-----------------------------------------------------------------------
//	Sets up some default OpenGL values.
//-----------------------------------------------------------------------

void myInit()
{
    glClearColor(0.0, 0.0, 0.0, 1.0);		// background color
    glShadeModel(GL_SMOOTH);		// smooth shading

	ALIEN.UpLx = .5;    //starting top left x coordinate of the allien
	ALIEN.UpLy = 6.5;   //starting top left y coordinate of the allien
	ALIEN.LoRx = 1;     //starting bottom right x coordinate of the allien
	ALIEN.LoRy = 6;     //starting bottom right y coordinate of the allien

	SHIP.UpLx = 2;    //starting top left x coordinate of the ship
	SHIP.UpLy= 0.3;   //starting top left y coordinate of the ship
	SHIP.LoRx = 3;     //starting bottom right x coordinate of the ship
	SHIP.LoRy = 0.0;     //starting bottom right y coordinate of the ship
	SHIP.S_Scale = 0.247;   //Scaling the gunner of the ship

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

  gluOrtho2D(0.0, 5.0, 0.0, 7.0);           // map unit square to viewport
  glMatrixMode(GL_MODELVIEW);

  glutPostRedisplay();                      // request redisplay
}


//-----------------------------------------------------------------------
// display callback function
//	This is called each time application needs to redraw itself.
//-----------------------------------------------------------------------
	
void myAliens()
{
	int i;
	int j;
	GLfloat SPACE = 1;      //proper space between each allien in the x and y direction
	glColor3f(0.0, 1.0, 0.0);       // set color to green
	for (i = 0; i < NUMALIENY; i++)
	{
		for (j = 0; j < NUMALIENX; j++)
		{
			if (ALIENALIVE[i][j] != 0)
				glRectf(ALIEN.UpLx + (j*SPACE), ALIEN.UpLy - (i*SPACE), ALIEN.LoRx + (j*SPACE), ALIEN.LoRy - (i*SPACE));
		}
	}
}

void myShip()
{
	glColor3f(0.0, 0.0, 1.0);      // set color to blue
	//glRectf((SHIP.UpLx + (SHIP.S_Scale*2.0)), SHIP.UpLy, (SHIP.LoRx - (SHIP.S_Scale*2.0)), SHIP.LoRy);
	glRectf(SHIP.UpLx + MOUSEX, SHIP.UpLy, SHIP.LoRx + MOUSEX, SHIP.LoRy);
}

void myAmmo()
{
	int i;
	for (i = 0; i < NUMMiss; i++)
	{
		glColor3f(1.0, 1.0, 0.0);      // set color to yellow
		glRectf(Missilearray[i].U_x, Missilearray[i].U_y, Missilearray[i].D_x, Missilearray[i].D_y);
		
	}
}

void createAmmo()
{	
	if(Missilearray[NUMMiss].U_y == 7)
	{
		NUMMiss--;
	}
	else
	{
		Missilearray[NUMMiss].U_x = SHIP.UpLx + (SHIP.S_Scale*2);
		Missilearray[NUMMiss].U_y = SHIP.UpLy;
		Missilearray[NUMMiss].D_x = SHIP.LoRx - (SHIP.S_Scale*2);
		Missilearray[NUMMiss].D_y = SHIP.LoRy + (SHIP.S_Scale*2);
		NUMMiss++;
	}                    
}

void myLaser()
{
	int i;
	int j;
	glColor3f(1.0, 0.0, 0.0);       // set color to red
	for (i = 0; i < NUMALIENY; i++)
	{
		for (j = 0; j < NUMALIENX; j++)
		{

		}
	}
}

void createLaser()
{

glutPostRedisplay();
}

void myDisplay()
{
    glClear(GL_COLOR_BUFFER_BIT);       // clear the window

   	    
	//myLaser();
	myAliens();
	myShip();
	myAmmo();


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

//-----------------------------------------------------------------------
// mouse callback function
//	This is called whenever mouse responce is given.
//-----------------------------------------------------------------------

void myMotion(int x, int y)
{
	MOUSEX = ((x - (windowWidth/2.0))/(windowWidth/2.0))*0.3;
	glutPostRedisplay();
}

// called if mouse click
void myMouse(int b, int s, int x, int y) 
{
	
	if ((b == GLUT_LEFT_BUTTON)&&(s == GLUT_DOWN))
	{
		createAmmo();
	//	FIREUP = true;
	}
	
	if ((b == GLUT_RIGHT_BUTTON)&&(s == GLUT_DOWN) && MYPAUSE == false)
	{
		glutIdleFunc(NULL);
		MYPAUSE = true;
	}
	else if ((b == GLUT_RIGHT_BUTTON)&&(s == GLUT_DOWN) && MYPAUSE == true)
	{
		glutIdleFunc(myIdle);
		MYPAUSE = false;
	}
	if ((b == GLUT_MIDDLE_BUTTON)&&(s == GLUT_DOWN) && MYPAUSE == false)
	{
		glutIdleFunc(NULL);
		MYPAUSE = true;
	}
	else if ((b == GLUT_MIDDLE_BUTTON)&&(s == GLUT_DOWN) && MYPAUSE == true)
	{
		glutIdleFunc(myIdle);
		MYPAUSE = false;
	}

	glutPostRedisplay();			  // request redisplay
}

//-----------------------------------------------------------------------
// idle callback function
//	
//-----------------------------------------------------------------------
void myCollisions()
{	
	int i;
	int j;
	int k;
	GLfloat SPACE = 1;
	for (i = 0; i < NUMALIENY; i++)
	{
		for (j = 0; j < NUMALIENX; j++)
		{
			for (k =0; k < NUMMiss; k++)
			{
				if (((ALIEN.UpLx + (j*SPACE)) <= Missilearray[k].U_x) || ((ALIEN.UpLx + (j*SPACE)) <= Missilearray[k].D_x) &&
					((ALIEN.UpLy - (i*SPACE)) >= Missilearray[k].U_y) || ((ALIEN.UpLy - (i*SPACE)) >= Missilearray[k].D_y) &&
				    ((ALIEN.LoRx + (j*SPACE)) >= Missilearray[k].U_x) || ((ALIEN.LoRx + (j*SPACE)) >= Missilearray[k].D_x) &&
				    ((ALIEN.LoRy - (i*SPACE)) <= Missilearray[k].U_y) || ((ALIEN.LoRy - (i*SPACE)) <= Missilearray[k].D_y))
				{
					COLLISION = true;
					ALIENALIVE[i][j] = 0;
				}
			}
			if ((ALIEN.LoRy + (j*SPACE)) == SHIP.UpLy)
				{
					printf("GAME OVER");
					exit(0);
				}
		}
	}
}

void myIdle()
{
	GLfloat ALSPEED = .0009;  //Maintains the speed of the allien ships
	GLfloat BOMBSPEED = .0059;  //Maintains the speed of the ammo of the ships
	//Point Ammo;
	int i;
	if (FIREDOWN == true)
	{
		LASERY += BOMBSPEED;
	}
	if (((ALIEN.LoRx + (NUMALIENX - 1)) < MAX_X) && MYBUMP == false)
	{
		ALIEN.UpLx += ALSPEED;
		ALIEN.UpLy -= ALSPEED;
		ALIEN.LoRx += ALSPEED;
		ALIEN.LoRy -= ALSPEED;
		if ((ALIEN.LoRx + (NUMALIENX - 1)) >= 5)
			MYBUMP = true;
	}
	else if (ALIEN.UpLx > MIN_X && MYBUMP == false)
	{
		ALIEN.UpLx += ALSPEED;
		ALIEN.UpLy -= ALSPEED;
		ALIEN.LoRx += ALSPEED;
		ALIEN.LoRy -= ALSPEED;
		if (ALIEN.UpLx >= 0)
			MYBUMP = true;
	}
	else
	{
		ALIEN.UpLx -= ALSPEED;
		ALIEN.UpLy -= ALSPEED;
		ALIEN.LoRx -= ALSPEED;
		ALIEN.LoRy -= ALSPEED;
		if ((ALIEN.UpLx <= 0) || (ALIEN.LoRx + (NUMALIENX - 1) == 5))
			MYBUMP = false;
	}

		SHIP.UpLx += MOUSEX;
		SHIP.LoRx += MOUSEX;
	if (SHIP.LoRx  >= 5)
	{
		SHIP.UpLx -= MOUSEX;
		SHIP.LoRx -= MOUSEX;
		MOUSEX = 0;
	}
    else if (SHIP.UpLx < MIN_X )
	{
		SHIP.UpLx -= MOUSEX;
		SHIP.LoRx -= MOUSEX;
	    MOUSEX = 0;
	}
	
	for (i=0; i< NUMMiss; i++)
	{
		Missilearray[i].U_y += BOMBSPEED;
		Missilearray[i].D_y += BOMBSPEED;
	}

	myCollisions();

		
glutPostRedisplay();
}

// called if timer event occurs
void myTimeOut(int id) 
{
	// advance the state of animation incrementally
	glutPostRedisplay();			  // request redisplay
	glutTimerFunc(100, myTimeOut, 0);  // request next timer event
}

