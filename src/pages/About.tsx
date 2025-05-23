
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">About ModalMaster</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Revolutionizing freight transport decisions with prescriptive analytics
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg">
              <h2>Our Mission</h2>
              <p>
                At ModalMaster, we're on a mission to transform how companies make freight transport decisions. 
                By leveraging the power of prescriptive analytics, we help businesses optimize their export routes, 
                reducing costs, improving delivery times, and minimizing environmental impact.
              </p>
              
              <h2>The Problem We Solve</h2>
              <p>
                Logistics managers face daily challenges when determining the optimal route and transport mode for their cargo. 
                With multiple variables to consider—cost, time, reliability, and environmental impact—making the best choice 
                becomes increasingly complex.
              </p>
              <p>
                Traditional planning methods often rely on historical data and intuition, which can lead to suboptimal decisions 
                and missed opportunities for efficiency gains.
              </p>
              
              <h2>Our Approach</h2>
              <p>
                ModalMaster uses a sophisticated prescriptive analytics model that considers a comprehensive range of factors:
              </p>
              <ul>
                <li>Cargo characteristics (weight, volume, value, urgency)</li>
                <li>Transport capacity and availability</li>
                <li>Distance and geographical considerations</li>
                <li>Seasonal variations and weather patterns</li>
                <li>Regulatory constraints and border requirements</li>
                <li>Carbon emissions and environmental impact</li>
                <li>Cost structures across multiple carriers</li>
              </ul>
              
              <h2>The Technology</h2>
              <p>
                Our platform combines machine learning algorithms with operations research techniques to not just predict outcomes 
                but to prescribe the optimal solution. We've built our system to be both powerful in its analysis and intuitive 
                in its interface, ensuring that logistics professionals can make informed decisions quickly.
              </p>
              
              <h2>Our Team</h2>
              <p>
                ModalMaster was founded by a team of logistics experts and data scientists who recognized the untapped potential of 
                applying prescriptive analytics to freight transport decisions. With decades of combined experience in supply chain 
                management and artificial intelligence, our team is uniquely positioned to drive innovation in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
