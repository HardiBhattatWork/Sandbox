/*   ****************************************************************************
     Hardik Bhatt
     March 2006

     This is example 8 from my lecture on GAs found at:
     http://www.sju.edu/~bforoura/courses/lectures/luger/lab6.html

     This program uses Java GA package JGAP:
     http://jgap.sourceforge.net/index.html
     ************************************************************************* */

//*** GA package contains all the needed classes
   import org.jgap.*;


//*** We just need to add functionality to  class FitnessFunction
    public class KnapsackFitness extends FitnessFunction
   {
   
      private double x1, x2, x3, x4, x5, x6, x7;
   
   
    //*** evaluate fitness of a chromosome ***
       public double evaluate (Chromosome aChrome)
      {
         x1 = getValueAtGene (aChrome, 0);
         x2 = getValueAtGene (aChrome, 1);
         x3 = getValueAtGene (aChrome, 2);
         x4 = getValueAtGene (aChrome, 3);
         x5 = getValueAtGene (aChrome, 4);
         x6 = getValueAtGene (aChrome, 5);
         x7 = getValueAtGene (aChrome, 6);
      
         double funcVal = (x1 * 350) + (x2 * 500) + (x3 * 470) + (x4 * 127) + (x5 * 33) + (x6 * 220) + (x7 * 95);
      
         return funcVal;
      }
   
   
    //*** get the allele of a gene from a specific locus ************
       public static double getValueAtGene (Chromosome aChrome, int locus)
      {
         Double val = (Double) aChrome.getGene (locus).getAllele ();
      
         return val.doubleValue ();
      }
   }
