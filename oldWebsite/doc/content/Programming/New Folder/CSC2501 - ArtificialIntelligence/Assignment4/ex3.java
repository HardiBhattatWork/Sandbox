/*   *****************************************************************************  
     Forouraghi
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


public class ex3 extends JFrame
{

  private static final int MAX_ALLOWED_EVOLUTIONS = 500;
  private static final int POPULATION_SIZE        = 50;

  //*****************************************************
  public static void main(String[] args)
    {
        try
           {new ex3().start();} 
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
    conf.setFitnessFunction(new ex3Fitness());


    Gene[] sampleGenes = new Gene[4];
    sampleGenes[0] = new DoubleGene(10,  80);   // x1 in [10, 80]
    sampleGenes[1] = new DoubleGene(10,  50);   // x2 in [10, 50]
    sampleGenes[2] = new DoubleGene(0.9, 5);    // x3 in [0.9, 5]
    sampleGenes[3] = new DoubleGene(0.9, 5);    // x4 in [0.9, 5]


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
       gaPlot.addPoint(0,                         //*** plot #0 
                       i,                         //*** x is generation number
                       (1000.0 - fitness),        //*** 1000-y is best fitness in this generation
                       true);
       }



    //*** we keep track of the "best" or "fittest" chromosome here
    Chromosome bestChrome = population.getFittestChromosome();


    System.out.println("The best solution has the fitness value of " + 
                        (1000 - bestChrome.getFitnessValue())  + " at: ");

    System.out.println("[X1, X2, X3, X4] = [" +
                        ex3Fitness.getValueAtGene(bestChrome, 0) + ", " +
                        ex3Fitness.getValueAtGene(bestChrome, 1) + ", " +
                        ex3Fitness.getValueAtGene(bestChrome, 2) + ", " +
                        ex3Fitness.getValueAtGene(bestChrome, 3) + "]" );
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

    gaPlot.setYRange(20, 50);                       // y range [20...900]
    gaPlot.setYLabel("Best Fitness");               // title of y axis

    //*** draw the plot
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    getContentPane().add(gaPlot);

    pack();
    show();
    }
}