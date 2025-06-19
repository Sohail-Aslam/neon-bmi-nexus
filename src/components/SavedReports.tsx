
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SavedReport } from './SaveReportForm';
import { Trash2 } from 'lucide-react';

interface SavedReportsProps {
  reports: SavedReport[];
  onDeleteReport: (id: string) => void;
}

const SavedReports = ({ reports, onDeleteReport }: SavedReportsProps) => {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const getEnergyEmoji = (level: number) => {
    if (level <= 2) return '🥱';
    if (level <= 4) return '😐';
    if (level <= 6) return '🙂';
    if (level <= 8) return '😊';
    return '😄';
  };

  const getBmiColor = (bmi: number) => {
    if (bmi < 18.5) return 'from-blue-400 to-cyan-400';
    if (bmi < 25) return 'from-green-400 to-emerald-400';
    if (bmi < 30) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No reports saved yet</div>
        <div className="text-gray-500">Save your first BMI report to track your health journey</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Your Health Reports
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <div
            key={report.id}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{report.name}</h4>
                <p className="text-gray-300 text-sm">{report.description}</p>
              </div>
              <Button
                onClick={() => onDeleteReport(report.id)}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {/* BMI Display */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${getBmiColor(report.bmi)} bg-clip-text text-transparent`}>
                  BMI {report.bmi}
                </div>
                <div className="text-sm text-gray-400">{report.bmiCategory}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">{getEnergyEmoji(report.energyLevel)}</div>
                <div className="text-xs text-gray-400">Energy {report.energyLevel}/10</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-400">
              <div>
                <div className="text-gray-300 font-semibold">{report.height}cm</div>
                <div>Height</div>
              </div>
              <div>
                <div className="text-gray-300 font-semibold">{report.weight}kg</div>
                <div>Weight</div>
              </div>
              <div>
                <div className="text-gray-300 font-semibold">{report.age}y</div>
                <div>Age</div>
              </div>
            </div>

            {/* Notes Section */}
            {report.notes && (
              <div className="mb-4">
                <div
                  className={`text-sm text-gray-300 ${
                    expandedReport === report.id ? '' : 'line-clamp-2'
                  }`}
                >
                  {report.notes}
                </div>
                {report.notes.length > 100 && (
                  <button
                    onClick={() => setExpandedReport(
                      expandedReport === report.id ? null : report.id
                    )}
                    className="text-xs text-cyan-400 hover:text-cyan-300 mt-1"
                  >
                    {expandedReport === report.id ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}

            {/* Timestamp */}
            <div className="text-xs text-gray-500 border-t border-white/10 pt-3">
              {formatDate(report.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedReports;
