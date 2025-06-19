
import { useState } from 'react';

const BMIInfo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'categories', label: 'BMI Categories', icon: '📊' },
    { id: 'age', label: 'Age Impact', icon: '🎂' },
    { id: 'health', label: 'Health Factors', icon: '❤️' }
  ];

  const bmiRanges = [
    { 
      range: "< 18.5", 
      category: "Underweight", 
      color: "from-blue-400 to-cyan-400", 
      risks: "Malnutrition, osteoporosis, anemia, weakened immune system",
      recommendations: "Increase caloric intake with nutrient-dense foods, strength training"
    },
    { 
      range: "18.5 - 24.9", 
      category: "Healthy Weight", 
      color: "from-green-400 to-emerald-400", 
      risks: "Lowest health risks, optimal metabolic function",
      recommendations: "Maintain current lifestyle, regular exercise, balanced nutrition"
    },
    { 
      range: "25.0 - 29.9", 
      category: "Overweight", 
      color: "from-yellow-400 to-orange-400", 
      risks: "Increased risk of heart disease, high blood pressure, type 2 diabetes",
      recommendations: "Moderate calorie reduction, increase physical activity, portion control"
    },
    { 
      range: "≥ 30.0", 
      category: "Obese", 
      color: "from-red-400 to-pink-400", 
      risks: "High risk of diabetes, heart disease, stroke, sleep apnea, certain cancers",
      recommendations: "Significant lifestyle changes, medical supervision, structured diet plan"
    }
  ];

  const ageImpacts = [
    { 
      age: "18-24", 
      bmi: "18.5-24.9", 
      description: "Ideal BMI range for young adults",
      details: "Metabolism is typically at its peak. Focus on building healthy habits that will last a lifetime. Bone density is still developing."
    },
    { 
      age: "25-34", 
      bmi: "20.0-25.0", 
      description: "Slight increase in healthy range",
      details: "Metabolism begins to slow slightly. Career stress may impact eating habits. Good time to establish consistent exercise routines."
    },
    { 
      age: "35-54", 
      bmi: "21.0-26.0", 
      description: "Metabolic changes affect optimal range",
      details: "Hormonal changes affect weight distribution. Muscle mass naturally decreases. Focus on strength training and stress management."
    },
    { 
      age: "55+", 
      bmi: "22.0-27.0", 
      description: "Higher BMI may be protective in older adults",
      details: "Some extra weight can be protective against bone fractures and illness. Focus on maintaining muscle mass and mobility."
    }
  ];

  const healthFactors = [
    {
      icon: '❤️',
      title: 'Cardiovascular Health',
      color: 'from-red-400 to-pink-400',
      details: [
        'BMI directly correlates with heart disease risk',
        'Higher BMI increases blood pressure and cholesterol',
        'Optimal BMI reduces risk of heart attacks and strokes',
        'Weight loss of 5-10% can significantly improve heart health'
      ]
    },
    {
      icon: '🧬',
      title: 'Metabolic Function',
      color: 'from-green-400 to-emerald-400',
      details: [
        'BMI influences insulin sensitivity and diabetes risk',
        'Excess weight can lead to metabolic syndrome',
        'Healthy BMI improves energy levels and metabolism',
        'Weight management helps regulate blood sugar levels'
      ]
    },
    {
      icon: '🦴',
      title: 'Bone & Joint Health',
      color: 'from-blue-400 to-cyan-400',
      details: [
        'Excess weight puts additional stress on joints',
        'Low BMI can indicate poor bone density',
        'Optimal weight reduces arthritis and joint pain risk',
        'Weight-bearing exercise at healthy BMI strengthens bones'
      ]
    },
    {
      icon: '🧠',
      title: 'Mental Health',
      color: 'from-purple-400 to-pink-400',
      details: [
        'BMI can affect self-esteem and body image',
        'Healthy weight is linked to better mood regulation',
        'Exercise for weight management releases endorphins',
        'Balanced nutrition supports brain function'
      ]
    }
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
      <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Complete BMI Health Guide
      </h3>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="backdrop-blur-md bg-white/5 rounded-2xl p-2 border border-white/10">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* BMI Categories Tab */}
      {activeTab === 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-white mb-2">Understanding BMI Categories</h4>
            <p className="text-gray-300">Learn about the different BMI ranges and their health implications</p>
          </div>
          
          <div className="grid gap-6">
            {bmiRanges.map((range, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${range.color}`} />
                    <div>
                      <span className="text-xl font-bold text-white">{range.range}</span>
                      <span className={`ml-3 text-lg font-semibold bg-gradient-to-r ${range.color} bg-clip-text text-transparent`}>
                        {range.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-semibold text-cyan-300 mb-1">Health Risks:</h5>
                    <p className="text-gray-300 text-sm">{range.risks}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-purple-300 mb-1">Recommendations:</h5>
                    <p className="text-gray-300 text-sm">{range.recommendations}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Age Impact Tab */}
      {activeTab === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-white mb-2">How Age Affects BMI</h4>
            <p className="text-gray-300">BMI recommendations change as we age due to metabolic and physiological changes</p>
          </div>

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
                <h5 className="text-white font-semibold mb-2">{impact.description}</h5>
                <p className="text-gray-300 text-sm leading-relaxed">{impact.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Factors Tab */}
      {activeTab === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-white mb-2">Health Impact Factors</h4>
            <p className="text-gray-300">How BMI affects different aspects of your health and wellbeing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {healthFactors.map((factor, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${factor.color} flex items-center justify-center text-xl`}>
                    {factor.icon}
                  </div>
                  <h5 className="text-lg font-semibold text-white">{factor.title}</h5>
                </div>
                
                <ul className="space-y-2">
                  {factor.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIInfo;
