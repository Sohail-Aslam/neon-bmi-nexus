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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Sci-fi Human Silhouette */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-20 animate-ping" />
              <div className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-40" />
              <div className="absolute inset-4 bg-gradient-to-r from-white to-cyan-300 rounded-full opacity-80" />
              <div className="absolute inset-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Calculate Your Body Mass Index
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500">
            Discover insights about your health with our advanced BMI calculator. 
            Get personalized recommendations powered by AI.
          </p>
          
          <Button 
            onClick={scrollToCalculator}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 animate-fade-in delay-1000"
          >
            Calculate Now
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300" />
          </Button>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="calculator" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            BMI Calculator
          </h2>
          <BMICalculator onBMIUpdate={handleBMIUpdate} />
        </div>
      </section>

      {/* Save Report Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
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
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SavedReports 
              reports={savedReports}
              onDeleteReport={handleDeleteReport}
            />
          </div>
        </section>
      )}

      {/* Health Tips Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            For You
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Personalized health recommendations based on your BMI
          </p>
          <HealthTips />
        </div>
      </section>

      {/* BMI Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            What is BMI?
          </h2>
          <BMIInfo />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 BMI Calculator. Powered by AI for better health insights.</p>
      </footer>
    </div>
  );
};

export default Index;
