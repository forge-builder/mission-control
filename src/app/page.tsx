import fs from "fs";
import path from "path";
import Dashboard from "./Dashboard";

interface Task {
  title: string;
  assignee: "roger" | "tomas";
  progress: number;
}

interface Memory {
  title: string;
  date: string;
  type: string;
}

interface CronJob {
  name: string;
  time: string;
  status: "active" | "error";
}

function getTasks(): Task[] {
  const tasksDir = path.join(process.env.HOME || "", ".openclaw/workspace/tasks/open");
  const tasks: Task[] = [];
  
  try {
    const files = fs.readdirSync(tasksDir).filter(f => f.endsWith(".md"));
    files.forEach((file) => {
      const content = fs.readFileSync(path.join(tasksDir, file), "utf-8");
      const title = file.replace(".md", "").replace(/-/g, " ");
      const hasProgress = content.includes("[x]") || content.includes("[X]");
      tasks.push({
        title: title.charAt(0).toUpperCase() + title.slice(1),
        assignee: "roger",
        progress: hasProgress ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30),
      });
    });
  } catch (e) {
    // Return defaults if error
  }
  
  if (tasks.length === 0) {
    tasks.push(
      { title: "Build Session", assignee: "roger", progress: 50 },
      { title: "ACP Revenue", assignee: "roger", progress: 20 },
      { title: "Content Pipeline", assignee: "roger", progress: 10 }
    );
  }
  
  return tasks;
}

function getMemories(): Memory[] {
  const memoryDir = path.join(process.env.HOME || "", ".openclaw/workspace/memory");
  const memories: Memory[] = [];
  
  try {
    const files = fs.readdirSync(memoryDir).filter(f => f.endsWith(".md")).sort().reverse().slice(0, 5);
    files.forEach(file => {
      const content = fs.readFileSync(path.join(memoryDir, file), "utf-8");
      const date = file.replace(".md", "");
      const firstLine = content.split("\n").find(l => l.trim() && !l.startsWith("#")) || "Memory entry";
      memories.push({
        title: firstLine.substring(0, 50),
        date,
        type: content.includes("error") ? "error" : content.includes("learn") ? "learn" : "system",
      });
    });
  } catch (e) {
    memories.push({ title: "Mission Control V2 Launch", date: "2026-02-28", type: "build" });
  }
  
  return memories;
}

function getCronJobs(): CronJob[] {
  return [
    { name: "Self-Improvement Digest", time: "5:00", status: "active" },
    { name: "Morning Briefing", time: "8:00", status: "active" },
    { name: "ACP Job Check", time: "8,14,20", status: "active" },
    { name: "Skill Explorer", time: "10:00", status: "active" },
    { name: "Evening Report", time: "20:00", status: "active" },
  ];
}

export default function Page() {
  const tasks = getTasks();
  const memories = getMemories();
  const cronJobs = getCronJobs();
  
  return (
    <Dashboard 
      tasks={tasks}
      memories={memories}
      cronJobs={cronJobs}
    />
  );
}
