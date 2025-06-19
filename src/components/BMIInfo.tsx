
import { useState } from 'react';

const BMIInfo = () => {
  const [activeSection, setActiveSection] = useState(0);

  const bmiRanges = [
    { range: "< 18.5", category: "Underweight", color: "from-blue-400 to-cyan-400", risks: "Malnutrition, osteoporosis, anemia" },
    { range: "18.5 - 24.9", category: "Healthy", color: "from-green-400 to-emerald-400", risks: "Lowest health risks" },
    { range: "25.0 - 29.9", category: "Overweight", color: "from-yellow-400 to-orange-400", risks: "Increased risk of heart disease" },
    { range: "≥ 30.0", category: "Obese", color: "from-red-400 to-pink-400", risks: "High risk of diabetes, heart disease" }
  ];

  const ageImpacts = [
    { age: "18-24", bmi: "18.5-24.9", description: "Ideal BMI range for young adults" },
    { age: "25-34", bmi: "20.0-25.0", description: "Slight increase in healthy range" },
    { age: "35-54", bmi: "21.0-26.0", description: "Metabolic changes affect optimal range" },
    { age: "55+", bmi: "22.0-27.0", description: "Higher BMI may be protective in older adults" }
  ];

  return (
    <div className="space-y-12">
      {/* BMI Ranges Visual */}
      <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          BMI Categories & Health Ranges
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bmiRanges.map((range, index) => (
            <div
              key={index}
              className={`backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 ${
                activeSection === index ? 'shadow-xl shadow-purple-500/20' : ''
              }`}
              onClick={() => setActiveSection(index)}
              onMouseEnter={() => setActiveSection(index)}
            >
              <div className={`w-full h-2 rounded-full bg-gradient-to-r ${range.color} mb-4`} />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{range.range}</div>
                <div className={`text-lg font-semibold bg-gradient-to-r ${range.color} bg-clip-text text-transparent mb-3`}>
                  {range.category}
                </div>
                <div className="text-sm text-gray-400">{range.risks}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Impact Section */}
      <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          BMI & Age Considerations
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {ageImpacts.map((impact, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-cyan-300">{impact.age} years</div>
                <div className="text-lg font-semibold text-purple-300">{impact.bmi}</div>
              </div>
              <p className="text-gray-300 text-sm">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Impact Visualization */}
      <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Health Impact Factors
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center text-2xl">
              ❤️
            </div>
            <h4 className="text-lg font-semibold text-white">Cardiovascular Health</h4>
            <p className="text-sm text-gray-300">BMI affects heart disease risk, blood pressure, and cholesterol levels</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-2xl">
              🧬
            </div>
            <h4 className="text-lg font-semibold text-white">Metabolism</h4>
            <p className="text-sm text-gray-300">Influences insulin sensitivity, diabetes risk, and metabolic syndrome</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-2xl">
              🦴
            </div>
            <h4 className="text-lg font-semibold text-white">Bone Health</h4>
            <p className="text-sm text-gray-300">Weight impacts bone density, joint health, and mobility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMIInfo;
