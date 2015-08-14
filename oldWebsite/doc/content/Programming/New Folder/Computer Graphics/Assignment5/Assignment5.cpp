//---------------------------------------------------------------------//
/* Hardik Bhatt                Assignment 5                            */
/*                                                                     */
/* Discription:  This assignment dealt with drawing a bunny using      */
/* vectors and triangle's. The strategy was to essentially draw a      */
/* bunny using triangles, placing them in specific locations in order  */
/* for the bunny to look specifically like a bunny. Later the task was */
/* to translate, rotate, and scale the bunny through right clicking    */
/* the mouse button to obtain the dropdown menu.                       */
/*                                                                     */
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

#define FOVY 60
#define NEAR 1               /*clipping plane near and far */
#define FAR 10000
#define NO_LIGHTS 2

FILE *BunnyFile;
GLboolean MYPAUSE = false; //boolean that keep track of pause of game
GLboolean MYTRACE = false;

long NumVer = 0;
long NumTri = 0;
float SCALE = 1;
float TRANSLATEX = 0;
float TRANSLATEY = 0;
float TRANSLATEZ = 0;
float ANGLE = 0;
float ROTATEX = 0;
float ROTATEY = 0;
float ROTATEZ = 0;
float METHOD = 1;
float VIEWERX = 0;
float VIEWERY = 0;
float VIEWERZ = 0;

/* spcular color component for an object */
GLfloat spec_color[4]={1.0, 1.0, 1.0, 1.0};

GLfloat global_ambient_intensity[4] = {0.2, 0.2, 0.2, 1.0};

/* light coordinates */
GLfloat light_coords[NO_LIGHTS][4]={{100,-1.0,1.5,0.0},
                           {-0.5,100,0.5,0.0}};

/* light components */
GLfloat light_ambient[NO_LIGHTS][4]={{0.2, 0.2, 0.2, 1.0},
                            {0.2, 0.2, 0.2, 1.0}};


GLfloat light_diffuse[NO_LIGHTS][4]={{1.0, 1.0, 1.0, 1.0},
                            {1.0, 1.0, 1.0, 1.0}};


GLfloat light_specular[NO_LIGHTS][4]={{2.0, 2.0, 2.0, 1.0},
                             {2.0, 2.0, 2.0, 1.0}}; 

GLfloat fog_color[]={ 0.5, 0.5, 0.5, 1.0}; /* fog color */

GLfloat bunny_color[4]={1.0, 1.0, 1.0, 1.0};

GLfloat shininess = 100.0;

/* initial viewer location and At location*/
static GLdouble viewer[]= {0.0, 0.0, 0.0}; 
static GLdouble at[]= {0.0, 0.0, 0.0};

/* window dimensi0ns */
int wh=500;
int ww=500;

struct vector
{
	float x;
	float y;
	float z;
};

struct vertex
{
	struct vector ver;
	struct vector normal_ver;
};

struct tvertex
{
	long vertex0;
	long vertex1;
	long vertex2;
	struct vector normal_tri;
};

struct vector p1;
struct vector p2;
struct vector ave_vector;
struct vertex *VectorArray;
struct tvertex *TriangleArray;

void myInit();
void myReshape(int ww, int wh);
void calcTriNormal (long j, long index1, long index2, long index3);
void calcVerNormal(long j, long index1, long index2, long index3);
void myDisplay();
void drawBunny1();
void drawBunny2();
void drawVector(long index1, long index2, long index3);
void drawTriangle(long i, long index1, long index2, long index3);
void myKeyboard(unsigned char c, int x, int y);
void myMenu();
void myMenuEvents(int option);

//-----------------------------------------------------------------------
// main program
//	
//-----------------------------------------------------------------------
int main(int argc, char **argv)
{
    				
    glutInit(&argc, argv);   //initialize glut and gl
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
    glutInitWindowSize(ww, wh);   // window
    //glutInitWindowPosition(0,0);    // upper left
    glutCreateWindow("My OpenGL Program: Assignment 5 - Bunny"); 	// create the window

	//register callbacks
	glutReshapeFunc(myReshape);     // call myReshape if window is resized
    glutDisplayFunc(myDisplay);		//  call myDisplay to redraw window
    //keyboard entries
    glutKeyboardFunc(myKeyboard);   // call myKeyboard when key is hit	

	glEnable(GL_DEPTH_TEST);
    
    myInit();				// our own initializations
	myMenu();				//our menu event
    glutMainLoop();			// pass control to GLUT, start it running
    return 0;               // ANSI C expects this
}

void myInit()
{
    glClearColor(0, 0, 0, 0);		// background color
    glShadeModel(GL_SMOOTH);		// smooth shading
	glEnable(GL_NORMALIZE);
	long i, j;
	char Ver, Tri;



	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);
	glEnable(GL_LIGHT1);

	glLightfv(GL_LIGHT0, GL_POSITION, light_coords[0]);
	glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient[0]);
	glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse[0]);
	glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular[0]);

	glLightfv(GL_LIGHT1, GL_POSITION, light_coords[1]);
	glLightfv(GL_LIGHT1, GL_AMBIENT, light_ambient[1]);
	glLightfv(GL_LIGHT1, GL_DIFFUSE, light_diffuse[1]);
	glLightfv(GL_LIGHT1, GL_SPECULAR, light_specular[1]);

	viewer[0] = 0;
	viewer[1] = 0;
	viewer[2] = -25;


	if ((BunnyFile = fopen("bunny.txt", "r")) == NULL)
      exit(0);

	if(fscanf(BunnyFile, "%d\n", &NumVer) == EOF)
	{
		printf("P: There is not data in input file\n");
		exit(0);
	}
	printf("The Number of vectors %d\n", NumVer);
	
	if(fscanf(BunnyFile, "%d\n", &NumTri) == EOF)
	{
		printf("P: There is not data in input file\n");
		exit(0);
	}
	printf("The Number of triangles %d \n", NumTri);

	VectorArray = (struct vertex *)malloc(NumVer * sizeof(struct vertex));
	for (i = 0; i < NumVer; i++)
	{
		if(fscanf(BunnyFile, "%c %f %f %f\n", &Ver, &VectorArray[i].ver.x, &VectorArray[i].ver.y, &VectorArray[i].ver.z) != EOF)
		{
			VectorArray[i].normal_ver.x = 0;
			VectorArray[i].normal_ver.y = 0;
			VectorArray[i].normal_ver.z = 0;
			ave_vector.x += VectorArray[i].ver.x;
			ave_vector.y += VectorArray[i].ver.y;
			ave_vector.z += VectorArray[i].ver.z;
			//printf("The vector array %c %f %f %f\n",Ver, VectorArray[i].ver.x, VectorArray[i].ver.y, VectorArray[i].ver.z);
		}
		else
		{
			printf("P: There is not data in input file\n");
			exit(0);
		}
	}
	
	ave_vector.x = ave_vector.x / NumVer;
	ave_vector.y = ave_vector.y / NumVer;
	ave_vector.z = ave_vector.z / NumVer;
	at[0] = (double) ave_vector.x;
	at[1] = (double) ave_vector.y;
	at[2] = (double) ave_vector.z;

	TriangleArray = (struct tvertex *)malloc(NumTri * sizeof(struct tvertex));

	for (j = 0; j < NumTri; j++)
	{
		
		if(fscanf(BunnyFile, "%c %ld %ld %ld\n", &Tri, &TriangleArray[j].vertex0, &TriangleArray[j].vertex1, &TriangleArray[j].vertex2) != EOF)
		{
			//printf("The triangle array %ld %ld %ld\n", TriangleArray[j].vertex0, TriangleArray[j].vertex1, TriangleArray[j].vertex2);
			//printf("i am in front of triangle norlal\n");
			calcTriNormal(j, TriangleArray[j].vertex0, TriangleArray[j].vertex1, TriangleArray[j].vertex2);
			calcVerNormal(j, TriangleArray[j].vertex0, TriangleArray[j].vertex1, TriangleArray[j].vertex2);
		}
		else
		{
			printf("P: There is not data in input file\n");
			exit(0);
		}
	}		
}

void myReshape(int ww, int wh) 
{
	
   // update projection
  glViewport (0, 0, ww,  wh);  // update the viewport
/* Use a perspective view */
  glMatrixMode(GL_PROJECTION);              // update the projection
  glLoadIdentity();               
  gluPerspective(FOVY,(GLdouble) ww/wh, NEAR, FAR);
  glMatrixMode(GL_MODELVIEW);

  glutPostRedisplay();                      // request redisplay
}

//-----------------------------------------------------------------------
// Normalise program
//	
//-----------------------------------------------------------------------
void calcTriNormal (long j, long index1, long index2, long index3)
{
	struct vector v1;
	struct vector v2;
	struct vector v3;

	// Finds The Vector Between 2 Points By Subtracting
	// The x,y,z Coordinates From One Point To Another.
	v1.x = VectorArray[index1].ver.x;
	v1.y = VectorArray[index1].ver.y;
	v1.z = VectorArray[index1].ver.z;
	
	v2.x = VectorArray[index2].ver.x;
	v2.y = VectorArray[index2].ver.y;
	v2.z = VectorArray[index2].ver.z;

	v3.x = VectorArray[index3].ver.x;
	v3.y = VectorArray[index3].ver.y;
	v3.z = VectorArray[index3].ver.z;

	// Calculate The Vector From Point 1 To Point 0
	p1.x = v1.x - v2.x;					// Vector 1.x=Vertex[0].x-Vertex[1].x
	p1.y = v1.y - v2.y;					// Vector 1.y=Vertex[0].y-Vertex[1].y
	p1.z = v1.z - v2.z;					// Vector 1.z=Vertex[0].y-Vertex[1].z
	// Calculate The Vector From Point 2 To Point 1
	p2.x = v2.x - v3.x;					// Vector 2.x=Vertex[0].x-Vertex[1].x
	p2.y = v2.y - v3.y;					// Vector 2.y=Vertex[0].y-Vertex[1].y
	p2.z = v2.z - v3.z;					// Vector 2.z=Vertex[0].z-Vertex[1].z
	// Compute The Cross Product To Give Us A Surface Normal
	TriangleArray[j].normal_tri.x = (p1.y*p2.z) - (p1.z*p2.y);				// Cross Product For Y - Z
	TriangleArray[j].normal_tri.y = (p1.z*p2.x) - (p1.x*p2.z);				// Cross Product For X - Z
	TriangleArray[j].normal_tri.z = (p1.x*p2.y) - (p1.y*p2.x);				// Cross Product For X - Y
}

void calcVerNormal(long j, long index1, long index2, long index3)
{
	//compute vertex normals  by adding traignle normals to vertex normals
	VectorArray[index1].normal_ver.x = VectorArray[index1].normal_ver.x + TriangleArray[j].normal_tri.x;
	VectorArray[index2].normal_ver.y = VectorArray[index2].normal_ver.y + TriangleArray[j].normal_tri.y;
	VectorArray[index3].normal_ver.z = VectorArray[index3].normal_ver.z + TriangleArray[j].normal_tri.z;
}


//-----------------------------------------------------------------------
// Display program
//	
//-----------------------------------------------------------------------
void myDisplay()
{
	//glClearColor(1.0,1.0,1.0,0.0);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);       // clear the window
	glMatrixMode(GL_MODELVIEW);

	/* Update viewer position in modelview matrix */
	glLoadIdentity();
	gluLookAt(viewer[0] + VIEWERX, viewer[1] + VIEWERY, viewer[2] + VIEWERZ, at[0], at[1], at[2], 0.0, 1.0, 0.0);

	if (METHOD == 1)
	{
		glScalef(SCALE, SCALE, SCALE);
		glTranslated(TRANSLATEX, TRANSLATEY, TRANSLATEZ);
		glRotatef(ANGLE, ROTATEX, ROTATEY, ROTATEZ);
		drawBunny1();
	}
	else if (METHOD == 2)
	{
		glScalef(SCALE, SCALE, SCALE);
		glTranslated(TRANSLATEX, TRANSLATEY, TRANSLATEZ);
		glRotatef(ANGLE, ROTATEX, ROTATEY, ROTATEZ);
		drawBunny2();
	}
	else 
	{
		printf("ERROR: Displaying Bunny");
	}

	glutSwapBuffers();		// swap buffers			
    glFlush();				// force OpenGL to render now		
}

void drawVector(long index1, long index2, long index3)
{
	glBegin(GL_POLYGON);
			
		glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT, bunny_color);
		glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, bunny_color);
		glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, bunny_color);
		glMaterialf(GL_FRONT_AND_BACK, GL_SHININESS, shininess);

		glNormal3f(VectorArray[index1].normal_ver.x, VectorArray[index1].normal_ver.y, VectorArray[index1].normal_ver.z);
		glVertex3f(VectorArray[index1].ver.x, VectorArray[index1].ver.y, VectorArray[index1].ver.z);

		glNormal3f(VectorArray[index2].normal_ver.x, VectorArray[index2].normal_ver.y, VectorArray[index2].normal_ver.z);
		glVertex3f(VectorArray[index2].ver.x, VectorArray[index2].ver.y, VectorArray[index2].ver.z);
			
		glNormal3f(VectorArray[index3].normal_ver.x, VectorArray[index3].normal_ver.y, VectorArray[index3].normal_ver.z);
		glVertex3f(VectorArray[index3].ver.x, VectorArray[index3].ver.y, VectorArray[index3].ver.z);

	glEnd();
}

void drawTriangle(long j, long index1, long index2, long index3)
{

	glBegin(GL_POLYGON);
		
		glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT, bunny_color);
		glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, bunny_color);
		glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, bunny_color);
		glMaterialf(GL_FRONT_AND_BACK, GL_SHININESS, shininess);

		glNormal3f(TriangleArray[j].normal_tri.x, TriangleArray[j].normal_tri.y, TriangleArray[j].normal_tri.z );
		glVertex3f(VectorArray[index1].ver.x, VectorArray[index1].ver.y, VectorArray[index1].ver.z);

		glNormal3f(TriangleArray[j].normal_tri.x, TriangleArray[j].normal_tri.y, TriangleArray[j].normal_tri.z);
		glVertex3f(VectorArray[index2].ver.x, VectorArray[index2].ver.y, VectorArray[index2].ver.z);
	
		glNormal3f(TriangleArray[j].normal_tri.x, TriangleArray[j].normal_tri.y, TriangleArray[j].normal_tri.z);
		glVertex3f(VectorArray[index3].ver.x, VectorArray[index3].ver.y, VectorArray[index3].ver.z);
	glEnd();
}

void drawBunny1()
{
	long j = 0;

	for (j = 0; j < NumTri; j++)
	{
		drawTriangle(j, TriangleArray[j].vertex0, TriangleArray[j].vertex1, TriangleArray[j].vertex2);
	}

}

void drawBunny2()
{
	long i = 0;

	for (i = 0; i < NumVer; i++)
	{
		drawVector(TriangleArray[i].vertex0, TriangleArray[i].vertex1, TriangleArray[i].vertex2);
	}
}
//-----------------------------------------------------------------------
// Keyboard program
//	
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
// Menu program
//	
//-----------------------------------------------------------------------
void myMenu()
{
	int menu, scaleMenu, translateMenu, rotateMenu, shadingMenu, viewerMenu;

	scaleMenu = glutCreateMenu(myMenuEvents);
	glutAddMenuEntry("Double", 1);
	glutAddMenuEntry("Half", 2);
	glutAddMenuEntry("20%", 3);

	translateMenu = glutCreateMenu(myMenuEvents);
	glutAddMenuEntry("+X", 4);
	glutAddMenuEntry("-X", 5);
	glutAddMenuEntry("+Y", 6);
	glutAddMenuEntry("-Y", 7);
	glutAddMenuEntry("+Z", 8);
	glutAddMenuEntry("-Z", 9);

	rotateMenu = glutCreateMenu(myMenuEvents);
	glutAddMenuEntry("+X", 10);
	glutAddMenuEntry("-X", 11);
	glutAddMenuEntry("+Y", 12);
	glutAddMenuEntry("-Y", 13);
	glutAddMenuEntry("+Z", 14);
	glutAddMenuEntry("-Z", 15);	

	shadingMenu = glutCreateMenu(myMenuEvents);
	glutAddMenuEntry("Method 1", 16);
	glutAddMenuEntry("Method 2", 17);

	viewerMenu = glutCreateMenu(myMenuEvents);
	glutAddMenuEntry("+X", 18);
	glutAddMenuEntry("-X", 19);
	glutAddMenuEntry("+Y", 20);
	glutAddMenuEntry("-Y", 21);
	glutAddMenuEntry("+Z", 22);
	glutAddMenuEntry("-Z", 23);	

	menu = glutCreateMenu(myMenuEvents);
	glutAddSubMenu("Scale Options", scaleMenu);
	glutAddSubMenu("Translate Options", translateMenu);
	glutAddSubMenu("Rotate Options", rotateMenu);
	glutAddSubMenu("Switch Shading Option", shadingMenu);
	glutAddSubMenu("Viewer Option", viewerMenu);

	glutAttachMenu(GLUT_RIGHT_BUTTON);

}

void myMenuEvents(int option) 
{
	switch (option) {
		case 1:  
			printf("Double Scale\n"); 
			SCALE += 2;
			break;
		case 2:	  printf("Half Scale\n"); 
			SCALE -= 2;
			break;
		case 3:  printf("Twenty % scale\n");
			SCALE -= .2;
			break;
		case 4:    printf("Positive X trans\n");
			TRANSLATEX += 1;
			break;
		case 5:	  printf("Negative X trans");
			TRANSLATEX -= 1;
			break;
		case 6:    printf("Pos Y trans\n");
			TRANSLATEY += 1;
			break;
		case 7:	  printf("Neg Y trans\n");
			TRANSLATEY -= 1;
			break;
		case 8:    printf("Pos Z trans\n");
			TRANSLATEZ += 1;
			break;
		case 9:	  printf("Neg Z trans\n");
			TRANSLATEZ -= 1;
			break;
		case 10:   printf("Post X Rot\n");
			ANGLE += 30;
			ROTATEX += 1;
			break;
		case 11:	  printf("Neg X rot\n");
			ANGLE -= 30;
			ROTATEX -= 1;
			break;
		case 12:   printf("Pos Y Rot\n");
			ANGLE += 30;
			ROTATEY += 1;
			break;
		case 13:   printf("Neg Y rot\n");
			ANGLE -= 30;
			ROTATEY -= 1;
			break;
		case 14:   printf("Pos Z rot\n");
			ANGLE += 30;
			ROTATEZ += 1;
			break;
		case 15:   printf("Neg Z rot\n");
			ANGLE -= 30;
			ROTATEZ -= 1;
			break;
		case 16:   printf("drawBunny1\n");
			METHOD = 1;
			break;
		case 17:   printf("drawBunny2\n");
			METHOD = 2;
			break;
		case 18:    printf("Positive X view\n");
			VIEWERX += 5;
			break;
		case 19:	  printf("Negative X view");
			VIEWERX -= 5;
			break;
		case 20:    printf("Pos Y view\n");
			VIEWERY += 5;
			break;
		case 21:	  printf("Neg Y view\n");
			VIEWERY -= 5;
			break;
		case 22:    printf("Pos Z view\n");
			VIEWERZ += 5;
			break;
		case 23:	  printf("Neg Z view\n"); 
			VIEWERZ -= 5;
			break;
	}
	glutPostRedisplay();		// request redisplay
}
