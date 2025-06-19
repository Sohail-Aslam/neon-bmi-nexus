
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
  const scrollToInfo = () => {
    document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHome = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 p-4 rgb(31 41 55 / var(--tw-bg-opacity, 1)) backdrop-blur-md shadow-md  gray-800%20rounded-2xl%20p border border-gray-600">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo or Brand */}
          <div className="text-2xl font-bold cursor-pointer" onClick={scrollToHome}>
            BMI App
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 text-lg font-medium rgb(71 61 55 / var(--tw-bg-opacity, 1))">
            <p onClick={scrollToHome} className="cursor-pointer hover:text-peach transition">Home</p>
            <p onClick={scrollToCalculator} className="cursor-pointer hover:text-peach transition">Calculator</p>
            <p onClick={scrollToInfo} className="cursor-pointer hover:text-peach transition">Info</p>
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-xl focus:outline-none"
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 px-4 py-3 flex flex-col gap-4 bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg text-base font-medium">
            <p onClick={() => { scrollToHome(); setIsOpen(false); }} className="cursor-pointer hover:text-peach transition">Home</p>
            <p onClick={() => { scrollToCalculator(); setIsOpen(false); }} className="cursor-pointer hover:text-peach transition">Calculator</p>
            <p onClick={() => { scrollToInfo(); setIsOpen(false); }} className="cursor-pointer hover:text-peach transition">Info</p>
          </div>
       
        )}
      </header>
      {/* Hero Section */}
      <section id='home' className="relative min-h-screen flex items-center justify-center px-4">

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
          <div className='flex itmes-center gap-4 justify-center'>

          <Button
            onClick={scrollToCalculator}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-1000"
          >
            Calculate Now
          </Button>
          <Button
            onClick={scrollToInfo}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-1000 "
          >
            BMI Info          </Button>
          </div>

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
      <section id='info' className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            What is BMI?
          </h2>
          <p className='mb-6 mx-6'>BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.</p>
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
