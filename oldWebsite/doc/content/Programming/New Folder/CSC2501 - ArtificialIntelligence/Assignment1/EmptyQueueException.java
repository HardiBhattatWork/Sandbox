/*****************************************************************************/
/*                                                                           */
/* EmptyStackException.java                                                  */
/*                                                                           */
/* Author: Hardik Bhatt                                                      */
/* Date: February 6, 2006                                                    */
/*                                                                           */
/* A class that is used to throw an exception when a floating point          */
/* empty-queue-exception is attempted                                        */
/*                                                                           */
/*****************************************************************************/

public class EmptyQueueException extends RuntimeException
{
    // No-arg constructor specifies default error message
    public EmptyQueueException()
    {
	super( "Too many operator in input" );
    }
    
    // constructor to allow specialized message
    public EmptyQueueException( String message )
    {
	super( message );
    }
} // end class EmptyQueueException
