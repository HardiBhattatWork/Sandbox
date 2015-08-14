package knapsack;

/**
 * <p>Title: KnapsackFitness </p>
 *
 * <p>Description: This is example 8 from my lecture on GAs found at:
 *   http://www.sju.edu/~bforoura/courses/lectures/luger/lab6.html
 *
 *   This program uses Java GA package JGAP:
 *   http://jgap.sourceforge.net/index.html</p>
 *
 * <p>Copyright: Copyright (c) 2006</p>
 *
 *
 * @author Hardik Bhatt
 * March 2006
 * @version 1.0
 */


//*** GA package contains all the needed classes
import org.jgap.*;


//*** We just need to add functionality to  class FitnessFunction
public class KnapsackFitness extends FitnessFunction {
    public KnapsackFitness() {
    }

    private double x1, x2;


    //*** evaluate fitness of a chromosome ***
     public double evaluate(Chromosome aChrome) {
         x1 = getValueAtGene(aChrome, 0);
         x2 = getValueAtGene(aChrome, 1);

         double funcVal = (21.5 + x1 * Math.sin(4.0 * Math.PI * x1) +
                           x2 * Math.sin(20.0 * Math.PI * x2));

         return funcVal;
     }


    //*** get the allele of a gene from a specific locus ************
     public static double getValueAtGene(Chromosome aChrome, int locus) {
         Double val = (Double) aChrome.getGene(locus).getAllele();

         return val.doubleValue();
     }

}
