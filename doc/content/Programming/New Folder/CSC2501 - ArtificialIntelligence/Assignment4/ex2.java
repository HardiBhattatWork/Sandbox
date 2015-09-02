/*   *****************************************************************************  
     Hardik Bhatt
     March 2006

     This is example 8 from my lecture on GAs found at: 
     http://www.sju.edu/~bforoura/courses/lectures/luger/lab6.html

     This program uses:

	    Java GA package JGAP:
	    http://jgap.sourceforge.net/index.html

	    Java plotting package ptPLotter II:
	    http://ptolemy.berkeley.edu/java/ptplot5.5/ptolemy/plot/doc/index.htm
     ***************************************************************************** */

//*** GA package JGAP

import org.jgap.*;
import org.jgap.data.*;
import org.jgap.impl.*;

//*** Plotting and graphics package 

import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import ptolemy.plot.Plot;


public class ex2 extends JFrame
{

  private static final int MAX_ALLOWED_EVOLUTIONS = 300;
  private static final int POPULATION_SIZE        = 10;

  //*****************************************************
  public static void main(String[] args)
    {
	try
	   {new ex2().start();} 
       catch(Exception e)
	   {}
    }


  //*****************************************************
  void start() throws Exception
  {

    //*** most parameter setups are done through this object
    Configuration conf = new DefaultConfiguration();
    conf.setPreservFittestIndividual(true);
    conf.setKeepPopulationSizeConstant(false);
    conf.setPopulationSize(POPULATION_SIZE);
 

    //*** use our own fitness function of for this optimization task
    conf.setFitnessFunction(new ex2Fitness());


    //*** each chromosome will have two genes, each of type double
    Gene[] sampleGenes = new Gene[2];
    sampleGenes[0] = new DoubleGene(-3.0, 12.1);   // gene x1 range [-3 , 12.1]
    sampleGenes[1] = new DoubleGene(4.1, 5.8);     // gene x2 range [4.1, 5.8]


    //*** set up the chromosomes
    Chromosome sampleChromosome = new Chromosome(sampleGenes);
    conf.setSampleChromosome(sampleChromosome);


    //*** create an initial random population
    Genotype population;
    population = Genotype.randomInitialGenotype(conf);


    //*** set up the plot window
    Plot gaPlot = new Plot();
    preparePlot(gaPlot);


    //*** create so many generations of solutions
    for (int i = 0; i < MAX_ALLOWED_EVOLUTIONS; i++)
       {

       //*** do your GA stuff and evolve good solutions using genetic operators and the
       //*** basic Darwinian natural selection
       population.evolve();


       //*** figure out the fitness of the best solutionin this generation
       double fitness = population.getFittestChromosome().getFitnessValue();


       //*** plot fitness plateau vs. generation number
       gaPlot.addPoint(0,              //*** plot #0 
		       i,              //*** x is generation number
		       fitness,        //*** y is best fitness in this generation
		       true);
       }



    //*** we keep track of the "best" or "fittest" chromosome here
    Chromosome bestChrome = population.getFittestChromosome();


    System.out.println("The best solution has the fitness value of " + bestChrome.getFitnessValue());
    System.out.println("at ");
    System.out.println("[X1, X2] = " +
		       "[" +
			ex2Fitness.getValueAtGene(bestChrome, 0) +
			", " +
			ex2Fitness.getValueAtGene(bestChrome, 1) +
			"]");
    }



   //************************************
   //*** aux method for plotting purposes
   void preparePlot(Plot gaPlot)
   {
    //*** our window size
    setSize(800, 400);


    //*** variou splot parameters
    gaPlot.setSize(800, 400);
    gaPlot.setButtons(true);
    gaPlot.setTitle("GA at Work");
    gaPlot.setMarksStyle("none");


    gaPlot.setXRange(0, MAX_ALLOWED_EVOLUTIONS);    // x range [0...MAX]
    gaPlot.setXLabel("Generation Number");          // title of x axis


    gaPlot.setYRange(30, 40);                       // y range [30...40]
    gaPlot.setYLabel("Best Fitness");               // title of y axis


    //*** draw the plot
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    getContentPane().add(gaPlot);

    pack();
    show();
    }
}
