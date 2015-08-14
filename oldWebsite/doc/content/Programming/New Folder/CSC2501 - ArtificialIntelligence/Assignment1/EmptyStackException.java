/*****************************************************************************/
/*                                                                           */
/* EmptyStackException.java                                                  */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that is used to throw an exception when a floating point          */
/* empty-stack-exception is attempted                                        */
/*                                                                           */
/*****************************************************************************/

public class EmptyStackException extends RuntimeException
{
    // No-arg constructor specifies default error message
    public EmptyStackException()
    {
	super( "Too many operator in input" );
    }
    
    // constructor to allow specialized message
    public EmptyStackException( String message )
    {
	super( message );
    }
} // end class EmptyStackException
