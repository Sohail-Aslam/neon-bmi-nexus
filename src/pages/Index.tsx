
import { useState, useEffect } from 'react';
import BMICalculator from '../components/BMICalculator';
import HealthTips from '../components/HealthTips';
import BMIInfo from '../components/BMIInfo';
import SaveReportForm, { SavedReport } from '../components/SaveReportForm';
import SavedReports from '../components/SavedReports';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentBMI, setCurrentBMI] = useState(0);
  const [currentBMICategory, setCurrentBMICategory] = useState('');
  const [currentHeight, setCurrentHeight] = useState(170);
  const [currentWeight, setCurrentWeight] = useState(70);
  const [currentAge, setCurrentAge] = useState(25);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved reports from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('bmi-reports');
    if (saved) {
      const reports = JSON.parse(saved).map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp)
      }));
      setSavedReports(reports);
    }
  }, []);

  // Save reports to localStorage whenever savedReports changes
  useEffect(() => {
    localStorage.setItem('bmi-reports', JSON.stringify(savedReports));
  }, [savedReports]);

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBMIUpdate = (bmi: number, category: string, height: number, weight: number, age: number) => {
    setCurrentBMI(bmi);
    setCurrentBMICategory(category);
    setCurrentHeight(height);
    setCurrentWeight(weight);
    setCurrentAge(age);
  };

  const handleSaveReport = (report: SavedReport) => {
    setSavedReports(prev => [report, ...prev]);
  };

  const handleDeleteReport = (id: string) => {
    setSavedReports(prev => prev.filter(report => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 50%), 
                        radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Human Silhouette */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-teal-500/20 rounded-full opacity-20 animate-ping" />
              <div className="absolute inset-2 bg-teal-500/40 rounded-full opacity-40" />
              <div className="absolute inset-4 bg-teal-400/60 rounded-full opacity-80" />
              <div className="absolute inset-6 bg-teal-500 rounded-full" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            Calculate Your Body Mass Index
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500">
            Understand your health with our easy-to-use BMI calculator. 
            Get personalized recommendations to improve your well-being.
          </p>
          
          <Button 
            onClick={scrollToCalculator}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-1000"
          >
            Calculate Now
          </Button>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="calculator" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            BMI Calculator
          </h2>
          <BMICalculator onBMIUpdate={handleBMIUpdate} />
        </div>
      </section>

      {/* Save Report Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <SaveReportForm
            bmi={currentBMI}
            bmiCategory={currentBMICategory}
            height={currentHeight}
            weight={currentWeight}
            age={currentAge}
            onSaveReport={handleSaveReport}
          />
        </div>
      </section>

      {/* Saved Reports Section */}
      {savedReports.length > 0 && (
        <section className="py-20 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <SavedReports 
              reports={savedReports}
              onDeleteReport={handleDeleteReport}
            />
          </div>
        </section>
      )}

      {/* Health Tips Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            For You
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Personalized health recommendations based on your BMI
          </p>
          <HealthTips />
        </div>
      </section>

      {/* BMI Info Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            What is BMI?
          </h2>
          <BMIInfo />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 border-t border-gray-700">
        <p>© 2024 BMI Calculator. Your health companion.</p>
      </footer>
    </div>
  );
};

export default Index;
