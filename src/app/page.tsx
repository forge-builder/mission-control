"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Brain, 
  Calendar, 
  BarChart3, 
  Building2,
  Zap,
  Wallet,
  Activity,
  ChevronRight,
  Bot,
  User
} from "lucide-react";

// Animated Pixel Avatar
function AnimatedAvatar({ name, color, status = "online", size = 80 }: { 
  name: string; 
  color: string; 
  status?: "online" | "away" | "offline";
  size?: number;
}) {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);
  
  // Simple breathing animation
  const scale = 1 + Math.sin(frame * 0.5) * 0.05;
  
  return (
    <motion.div 
      animate={{ scale }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div 
        className="rounded-lg overflow-hidden"
        style={{ 
          width: size, 
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-4xl">
          {name === "ROGER" ? "🤖" : "👤"}
        </div>
      </div>
      {/* Status dot */}
      <div 
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black"
        style={{ 
          backgroundColor: status === "online" ? "#00FF88" : status === "away" ? "#FFE600" : "#FF2E63",
          boxShadow: `0 0 10px ${status === "online" ? "#00FF88" : status === "away" ? "#FFE600" : "#FF2E63"}`
        }}
      />
    </motion.div>
  );
}

// Stat Card
function StatCard({ label, value, subValue, color }: { 
  label: string; 
  value: string; 
  subValue?: string;
  color: string;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-[#16213E] rounded-xl p-4 border border-[#333] hover:border-[#00FFF5]/50 transition-colors cursor-pointer"
      style={{ boxShadow: `0 0 20px ${color}10` }}
    >
      <div className="text-[#A0A0A0] text-sm mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      {subValue && <div className="text-[#666] text-sm">{subValue}</div>}
    </motion.div>
  );
}

// Task Card
function TaskCard({ title, assignee, progress }: { 
  title: string; 
  assignee: "roger" | "tomas";
  progress?: number;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-[#0D0D0D] rounded-lg p-3 border border-[#333] hover:border-[#00FFF5]/30 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{title}</span>
        <ChevronRight size={16} className="text-[#666]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded bg-[#00FFF5]/10 text-[#00FFF5]">
          {assignee === "roger" ? "🤖 Roger" : "👤 Tomas"}
        </span>
        {progress !== undefined && (
          <div className="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#00FFF5] to-[#00FF88]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Memory Item
function MemoryItem({ title, date, type }: { title: string; date: string; type: string }) {
  const typeColors: Record<string, string> = {
    learn: "#FFE600",
    system: "#00FFF5",
    build: "#00FF88",
    error: "#FF2E63",
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#16213E] border-l-4 p-4 hover:bg-[#1A1A2E] transition-colors cursor-pointer"
      style={{ borderColor: typeColors[type] || "#00FFF5" }}
    >
      <div className="font-medium">{title}</div>
      <div className="text-[#666] text-sm flex items-center gap-2">
        <span>{date}</span>
        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${typeColors[type] || "#00FFF5"}20`, color: typeColors[type] || "#00FFF5" }}>
          {type}
        </span>
      </div>
    </motion.div>
  );
}

// Cron Job Item
function CronJob({ name, time, status }: { name: string; time: string; status: "active" | "error" }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#333]">
      <div className="flex items-center gap-3">
        <Calendar size={16} className="text-[#A0A0A0]" />
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#666] text-sm">{time}</span>
        <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-[#00FF88]" : "bg-[#FF2E63]"}`} 
             style={{ boxShadow: status === "active" ? "0 0 10px #00FF88" : "0 0 10px #FF2E63" }}
        />
      </div>
    </div>
  );
}

// Main App
export default function MissionControl() {
  const [activeTab, setActiveTab] = useState("overview");
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "memory", label: "Memory", icon: Brain },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "office", label: "Office", icon: Building2 },
  ];
  
  const tasks = [
    { title: "Mission Control V2 bauen", assignee: "roger" as const, progress: 65 },
    { title: "ACP Services promoten", assignee: "roger" as const, progress: 30 },
    { title: "Content Pipeline aufbauen", assignee: "roger" as const, progress: 10 },
    { title: "Bankr Trading automatisieren", assignee: "roger" as const, progress: 0 },
  ];
  
  const memories = [
    { title: "Gateway Pairing Fix", date: "2026-02-21", type: "learn" },
    { title: "Bankr Login Successful", date: "2026-02-21", type: "system" },
    { title: "Mission Control V1 Deployed", date: "2026-02-21", type: "build" },
    { title: "X Credentials Setup", date: "2026-02-21", type: "system" },
  ];
  
  const cronJobs = [
    { name: "Self-Improvement Digest", time: "5:00", status: "active" as const },
    { name: "Morning Briefing", time: "8:00", status: "active" as const },
    { name: "ACP Job Check", time: "8,14,20", status: "active" as const },
    { name: "Skill Explorer", time: "10:00", status: "active" as const },
    { name: "Evening Report", time: "20:00", status: "active" as const },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A2E] to-[#0D0D0D] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#333] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedAvatar name="ROGER" color="#00FFF5" size={48} />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00FFF5] to-[#FF2E63] bg-clip-text text-transparent">
                  MISSION CONTROL
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#666]">
                  <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
                  <span>Roger ist online</span>
                  <span>•</span>
                  <span>{time}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#666]">
                <Zap size={16} className="text-[#FFE600]" />
                <span className="text-sm">Level 5</span>
              </div>
              <div className="flex items-center gap-2 text-[#666]">
                <Wallet size={16} className="text-[#00FFF5]" />
                <span className="text-sm">0.004 ETH</span>
              </div>
              <div className="flex items-center gap-2 text-[#666]">
                <Activity size={16} className="text-[#00FF88]" />
                <span className="text-sm">5 ACP</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="max-w-6xl mx-auto px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#00FFF5] text-black"
                    : "bg-[#16213E] text-[#A0A0A0] hover:text-white hover:bg-[#1A1A2E]"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="WALLET" value="0.004 ETH" subValue="$9.82" color="#00FFF5" />
                <StatCard label="ACP SERVICES" value="5" subValue="Active" color="#FFE600" />
                <StatCard label="ROGER TOKEN" value="$ROGER" subValue="0xf01D..." color="#FF2E63" />
                <StatCard label="XP" value="1,250" subValue="Level 5" color="#00FF88" />
              </div>
              
              {/* Recent Tasks */}
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CheckSquare size={20} className="text-[#00FFF5]" />
                  Aktive Tasks
                </h2>
                <div className="grid gap-3">
                  {tasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <TaskCard {...task} />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Recent Memories */}
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Brain size={20} className="text-[#FFE600]" />
                  Neueste Memories
                </h2>
                <div className="grid gap-2">
                  {memories.map((mem, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <MemoryItem {...mem} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === "tasks" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Alle Tasks</h2>
              {tasks.map((task, i) => (
                <TaskCard key={i} {...task} />
              ))}
            </motion.div>
          )}
          
          {activeTab === "memory" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <h2 className="text-2xl font-bold">Memory Stream</h2>
              {memories.map((mem, i) => (
                <MemoryItem key={i} {...mem} />
              ))}
            </motion.div>
          )}
          
          {activeTab === "calendar" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Cron Jobs</h2>
              <div className="bg-[#16213E] rounded-xl p-4 border border-[#333]">
                {cronJobs.map((job, i) => (
                  <CronJob key={i} {...job} />
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === "stats" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <StatCard label="WALLET" value="0.004 ETH" subValue="$9.82" color="#00FFF5" />
              <StatCard label="ACP SERVICES" value="5" subValue="Active" color="#FFE600" />
              <StatCard label="ROGER TOKEN" value="$ROGER" subValue="0xf01D..." color="#FF2E63" />
              <StatCard label="GITHUB REPOS" value="7" subValue="All deployed" color="#00FF88" />
              <StatCard label="TASKS" value="4" subValue="1 in progress" color="#00FFF5" />
              <StatCard label="MEMORIES" value="50+" subValue="Indexed" color="#FFE600" />
            </motion.div>
          )}
          
          {activeTab === "office" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Office</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#16213E] rounded-xl p-6 border border-[#00FFF5]/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <AnimatedAvatar name="ROGER" color="#00FFF5" size={64} />
                    <div>
                      <div className="font-bold text-lg">ROGER</div>
                      <div className="text-[#00FF88] text-sm">🤖 Lead Agent</div>
                    </div>
                  </div>
                  <div className="text-[#666] text-sm">
                    Aktuell: Building Mission Control V2
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#16213E] rounded-xl p-6 border border-[#FF2E63]/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <AnimatedAvatar name="TOMAS" color="#FF2E63" size={64} />
                    <div>
                      <div className="font-bold text-lg">TOMAS</div>
                      <div className="text-[#FFE600] text-sm">👤 Partner</div>
                    </div>
                  </div>
                  <div className="text-[#666] text-sm">
                    Aktuell: Offline
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
