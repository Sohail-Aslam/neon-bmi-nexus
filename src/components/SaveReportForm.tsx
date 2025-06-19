
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface SaveReportFormProps {
  bmi: number;
  bmiCategory: string;
  height: number;
  weight: number;
  age: number;
  onSaveReport: (report: SavedReport) => void;
}

export interface SavedReport {
  id: string;
  name: string;
  description: string;
  bmi: number;
  bmiCategory: string;
  height: number;
  weight: number;
  age: number;
  notes: string;
  energyLevel: number;
  timestamp: Date;
}

const SaveReportForm = ({ bmi, bmiCategory, height, weight, age, onSaveReport }: SaveReportFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [energyLevel, setEnergyLevel] = useState([5]);

  const getEnergyEmoji = (level: number) => {
    if (level <= 2) return '🥱';
    if (level <= 4) return '😐';
    if (level <= 6) return '🙂';
    if (level <= 8) return '😊';
    return '😄';
  };

  const getEnergyColor = (level: number) => {
    if (level <= 2) return 'from-gray-400 to-blue-400';
    if (level <= 4) return 'from-blue-400 to-yellow-400';
    if (level <= 6) return 'from-yellow-400 to-orange-400';
    if (level <= 8) return 'from-orange-400 to-green-400';
    return 'from-green-400 to-emerald-400';
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const report: SavedReport = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      bmi,
      bmiCategory,
      height,
      weight,
      age,
      notes: notes.trim(),
      energyLevel: energyLevel[0],
      timestamp: new Date()
    };

    onSaveReport(report);
    
    // Reset form
    setName('');
    setDescription('');
    setNotes('');
    setEnergyLevel([5]);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
        Save Your Report
      </h3>
      
      <div className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-cyan-300 font-semibold">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-cyan-300 font-semibold">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Morning measurement, Post-workout check"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>

        {/* Energy Level Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-cyan-300 font-semibold">Energy Level</Label>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getEnergyEmoji(energyLevel[0])}</span>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {energyLevel[0]}/10
              </span>
            </div>
          </div>
          <div className="relative">
            <Slider
              value={energyLevel}
              onValueChange={setEnergyLevel}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className={`absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r ${getEnergyColor(energyLevel[0])}/20 rounded-full -z-10`} />
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-cyan-300 font-semibold">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about your health, diet, exercise, or how you're feeling today..."
            rows={4}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Save Report
        </Button>
      </div>
    </div>
  );
};

export default SaveReportForm;
