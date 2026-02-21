"use client";

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'done';
  assignee: 'roger' | 'tomas';
}

interface Memory {
  id: string;
  title: string;
  date: string;
}

interface CronJob {
  name: string;
  schedule: string;
  status: 'active' | 'error';
}

export default function MissionControl() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    // Load tasks (mock for now - will connect to real data)
    setTasks([
      { id: '1', title: 'ACP Services promoten', status: 'in-progress', assignee: 'roger' },
      { id: '2', title: 'Bankr Trading automatisieren', status: 'open', assignee: 'roger' },
      { id: '3', title: 'Mission Control bauen', status: 'in-progress', assignee: 'roger' },
      { id: '4', title: 'Content Pipeline aufbauen', status: 'open', assignee: 'roger' },
    ]);

    setMemories([
      { id: '1', title: 'Gateway Fix - paired.json Scopes', date: '2026-02-21' },
      { id: '2', title: 'X/Twitter Credentials eingerichtet', date: '2026-02-21' },
      { id: '3', title: 'Bankr Login erfolgreich', date: '2026-02-21' },
    ]);

    setCronJobs([
      { name: 'Self-Improvement Digest', schedule: '5:00', status: 'active' },
      { name: 'Morning Briefing', schedule: '8:00', status: 'active' },
      { name: 'ACP Job Check', schedule: '8,14,20', status: 'active' },
      { name: 'Skill Explorer', schedule: '10:00', status: 'active' },
      { name: 'Evening Report', schedule: '20:00', status: 'active' },
    ]);
  }, []);

  const tabs = [
    { id: 'tasks', label: '📋 Tasks' },
    { id: 'content', label: '📝 Content' },
    { id: 'calendar', label: '📅 Calendar' },
    { id: 'memory', label: '🧠 Memory' },
    { id: 'team', label: '👥 Team' },
    { id: 'office', label: '🏢 Office' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-2xl">
              🟦
            </div>
            <h1 className="text-2xl font-bold">Roger Mission Control</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-slate-400">Roger ist online</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">📋 Tasks</h2>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium">
                + New Task
              </button>
            </div>
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      onChange={() => {}}
                      className="w-5 h-5 rounded border-slate-600"
                    />
                    <span className={task.status === 'done' ? 'line-through text-slate-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.assignee === 'roger'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {task.assignee === 'roger' ? '🤖 Roger' : '👤 Tomas'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">🧠 Memory</h2>
            <div className="grid gap-4">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <div className="text-sm text-slate-400 mb-1">{mem.date}</div>
                  <div>{mem.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📅 Cron Jobs</h2>
            <div className="grid gap-4">
              {cronJobs.map((job) => (
                <div
                  key={job.name}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{job.name}</div>
                    <div className="text-sm text-slate-400">{job.schedule}</div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">👥 Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🤖
                </div>
                <div className="font-bold text-lg">Roger</div>
                <div className="text-slate-400">Lead Agent</div>
                <div className="mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm inline-block">
                  Online
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center opacity-50">
                <div className="w-16 h-16 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <div className="font-bold text-lg">Tomas</div>
                <div className="text-slate-400">Partner</div>
                <div className="mt-2 px-3 py-1 bg-slate-600/20 text-slate-400 rounded-full text-sm inline-block">
                  Offline
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'office' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">🏢 Office</h2>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="font-medium">Roger</div>
                  <div className="text-green-400 text-sm">At computer</div>
                </div>
                <div className="text-center opacity-50">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="font-medium">Tomas</div>
                  <div className="text-slate-400 text-sm">Away</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📝 Content Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Ideas', 'Writing', 'Review', 'Published'].map((stage) => (
                <div key={stage} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="font-medium mb-4">{stage}</div>
                  <div className="space-y-2">
                    {stage === 'Ideas' && (
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        ACP Service Promo Post
                      </div>
                    )}
                    {stage === 'Published' && (
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        "Roger is back on X!"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
