import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import { Button } from './Button';
import { ExerciseLog } from '../types';
import { loadHistory, clearHistory, exportHistory } from '../utils/storage';

export const History: React.FC = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = () => {
    setHistory(loadHistory());
  };

  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} ${t('minutes')} ${secs} ${t('seconds')}`;
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistoryData();
    }
  };

  const handleExportHistory = () => {
    const json = exportHistory();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workoutbeat-history-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleExportHistory}
          variant="primary"
          className="flex-1"
          disabled={history.length === 0}
        >
          {t('exportHistory')}
        </Button>
        <Button
          onClick={handleClearHistory}
          variant="danger"
          className="flex-1"
          disabled={history.length === 0}
        >
          {t('clearHistory')}
        </Button>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <Card>
          <p className="text-center text-[var(--text-secondary)]">
            {t('noHistory')}
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((log) => (
            <Card key={log.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t('startTime')}: {formatDateTime(log.startTime)}
                  </p>
                  {log.endTime && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      {t('endTime')}: {formatDateTime(log.endTime)}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--primary-color)]">
                    {log.bpm} BPM
                  </p>
                  <p className="text-sm text-[var(--text-primary)]">
                    {formatDuration(log.duration)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-[var(--text-secondary)]">
                <span>{t('soundType')}_{log.soundType}</span>
                {log.enableCount && (
                  <span>• Count 1-{log.countMax}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
