/*   ****************************************************************************  
     Forouraghi
     March 2006

     This is example 17 from my lecture on GAs found at: 
     http://www.sju.edu/~bforoura/courses/lectures/luger/lab6.html

     This program uses Java GA package JGAP:
     http://jgap.sourceforge.net/index.html
     ************************************************************************* */

//*** GA package contains all the needed classes
import org.jgap.*;


//*** We just need to add functionality to  class FitnessFunction
public class ex3Fitness extends FitnessFunction
{

  private double x1, x2, x3, x4;

  //****************************************
  public double evaluate(Chromosome aChrome)
  {

      x1 = getValueAtGene(aChrome, 0);
      x2 = getValueAtGene(aChrome, 1);
      x3 = getValueAtGene(aChrome, 2);
      x4 = getValueAtGene(aChrome, 3);

      //*** to minimize cross area, we maximize the difference
      double func = 1000.00 - (2.0*x2*x4 + x3*(x1-2.0*x4));

      return func;
  }




  //*** get the allele of a gene from a specific locus ************
  public static double getValueAtGene(Chromosome aChrome, int locus)
  {
    Double val = (Double) aChrome.getGene(locus).getAllele();

    return val.doubleValue();
  }


}
