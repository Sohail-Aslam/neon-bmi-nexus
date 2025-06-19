
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface BMICalculatorProps {
  onBMIUpdate?: (bmi: number, category: string, height: number, weight: number, age: number) => void;
}

const BMICalculator = ({ onBMIUpdate }: BMICalculatorProps) => {
  const [height, setHeight] = useState([170]); // cm
  const [weight, setWeight] = useState([70]); // kg
  const [age, setAge] = useState([25]);
  const [isMetric, setIsMetric] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');

  // Convert units
  const getDisplayHeight = () => {
    if (isMetric) return height[0];
    const totalInches = height[0] / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  };

  const getDisplayWeight = () => {
    if (isMetric) return Math.round(weight[0]);
    return Math.round(weight[0] * 2.205);
  };

  const calculateBMI = () => {
    const heightM = height[0] / 100;
    const weightKg = weight[0];
    const bmiValue = weightKg / (heightM * heightM);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    setBmi(roundedBMI);

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Healthy';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';
    
    setBmiCategory(category);

    // Emit the BMI update to parent component
    if (onBMIUpdate) {
      onBMIUpdate(roundedBMI, category, height[0], weight[0], age[0]);
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, age]);

  const getBmiColor = () => {
    if (bmi < 18.5) return 'from-blue-400 to-cyan-400';
    if (bmi < 25) return 'from-teal-400 to-emerald-400';
    if (bmi < 30) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  };

  const getBmiGlow = () => {
    if (bmi < 18.5) return 'shadow-blue-500/30';
    if (bmi < 25) return 'shadow-teal-500/30';
    if (bmi < 30) return 'shadow-yellow-500/30';
    return 'shadow-red-500/30';
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-8">
          {/* Unit Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setIsMetric(true)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  isMetric 
                    ? 'bg-teal-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setIsMetric(false)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  !isMetric 
                    ? 'bg-teal-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          {/* Height Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-semibold text-gray-300">Height</label>
              <span className="text-2xl font-bold text-teal-400">
                {getDisplayHeight()}{isMetric ? ' cm' : ''}
              </span>
            </div>
            <div className="relative">
              <Slider
                value={height}
                onValueChange={setHeight}
                max={isMetric ? 220 : 220}
                min={isMetric ? 120 : 120}
                step={1}
                className="w-full [&>span:first-child]:bg-gray-600 [&>span:first-child>span]:bg-teal-500"
              />
            </div>
          </div>

          {/* Weight Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-semibold text-gray-300">Weight</label>
              <span className="text-2xl font-bold text-teal-400">
                {getDisplayWeight()} {isMetric ? 'kg' : 'lbs'}
              </span>
            </div>
            <div className="relative">
              <Slider
                value={weight}
                onValueChange={setWeight}
                max={200}
                min={30}
                step={1}
                className="w-full [&>span:first-child]:bg-gray-600 [&>span:first-child>span]:bg-teal-500"
              />
            </div>
          </div>

          {/* Age Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-semibold text-gray-300">Age</label>
              <span className="text-2xl font-bold text-teal-400">
                {age[0]} years
              </span>
            </div>
            <div className="relative">
              <Slider
                value={age}
                onValueChange={setAge}
                max={100}
                min={10}
                step={1}
                className="w-full [&>span:first-child]:bg-gray-600 [&>span:first-child>span]:bg-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* BMI Ring */}
          <div className="relative">
            <div className={`w-48 h-48 rounded-full bg-gradient-to-r ${getBmiColor()} p-1 shadow-2xl ${getBmiGlow()}`}>
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">{bmi}</div>
                  <div className="text-sm text-gray-400">BMI</div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping" />
          </div>

          {/* BMI Category */}
          <div className="text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${getBmiColor()} bg-clip-text text-transparent mb-2`}>
              {bmiCategory}
            </div>
            <div className="text-gray-400">
              Your BMI category
            </div>
          </div>

          {/* BMI Scale */}
          <div className="w-full max-w-xs">
            <div className="h-4 bg-gradient-to-r from-blue-400 via-teal-400 via-yellow-400 to-red-400 rounded-full relative">
              <div 
                className="absolute top-0 w-3 h-3 bg-white rounded-full border-2 border-gray-800 transform -translate-y-1"
                style={{ left: `${Math.min(Math.max((bmi - 15) * 100 / 25, 0), 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>15</span>
              <span>25</span>
              <span>40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
