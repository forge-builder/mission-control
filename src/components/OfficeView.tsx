"use client";

import { useState, useEffect } from "react";

// Animated Pixel Agent
function AnimatedAgent({ 
  name, 
  color, 
  status = "idle",
  x = 50, 
  y = 50,
  size = 48 
}: { 
  name: string; 
  color: string; 
  status?: "idle" | "coding" | "walking" | "away";
  x?: number;
  y?: number;
  size?: number;
}) {
  const [frame, setFrame] = useState(0);
  const [pos, setPos] = useState({ x, y });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4);
    }, status === "walking" ? 150 : 400);
    return () => clearInterval(interval);
  }, [status]);
  
  // 4-frame walk cycle
  const walkFrames = [
    [0,1,0,1, 1,1,1,1, 0,1,0,1, 1,0,1,0, 0,0,1,0],
    [0,1,0,1, 1,1,1,1, 0,1,0,1, 0,1,0,1, 0,0,1,0],
    [0,1,0,1, 1,1,1,1, 0,1,0,1, 1,0,1,0, 0,1,0,0],
    [0,1,0,1, 1,1,1,1, 0,1,0,1, 0,1,0,1, 0,0,0,0],
  ];
  
  const idleFrames = [
    [0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 1,0,1,0,1],
    [0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 1,0,1,0,1],
    [0,1,1,1,0, 1,0,0,1,1, 0,1,1,1,0, 1,0,1,0,1],
    [0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 1,0,1,0,1],
  ];
  
  const frames = status === "walking" ? walkFrames : idleFrames;
  const pixels = frames[frame];
  const pixelSize = size / 5;
  
  return (
    <div 
      className="absolute transition-all duration-500"
      style={{ 
        left: `${pos.x}%`, 
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Pixel Sprite */}
      <div 
        style={{ 
          width: size, 
          height: size,
          imageRendering: "pixelated",
        }}
      >
        {pixels.map((p: number, i: number) => (
          <div
            key={i}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: p ? color : "transparent",
              display: "inline-block",
            }}
          />
        ))}
      </div>
      
      {/* Name Tag */}
      <div 
        className="text-center mt-1 text-xs"
        style={{ 
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "2px 2px 0 #000",
        }}
      >
        {name}
      </div>
      
      {/* Status */}
      <div className="text-center text-[10px] text-gray-400">
        {status === "coding" && "⚙️ Coding..."}
        {status === "walking" && "🚶 Walking"}
        {status === "idle" && "💭 Idle"}
        {status === "away" && "😴 Away"}
      </div>
    </div>
  );
}

// Office Room Background
function OfficeRoom() {
  return (
    <div className="relative w-full h-96 bg-[#1a1a2e] border-4 border-[#333] overflow-hidden">
      {/* Floor */}
      <div className="absolute bottom-0 w-full h-1/3 bg-[#0d0d0d]" />
      
      {/* Desk 1 */}
      <div className="absolute bottom-10 left-10 w-24 h-16 bg-[#16213e] border-2 border-[#00fff5]/30">
        <div className="absolute top-2 left-2 w-4 h-3 bg-[#00fff5]/20" />
        <div className="absolute top-2 right-2 w-6 h-4 bg-[#00fff5]/30" />
      </div>
      
      {/* Desk 2 */}
      <div className="absolute bottom-10 right-10 w-24 h-16 bg-[#16213e] border-2 border-[#ff2e63]/30">
        <div className="absolute top-2 left-2 w-4 h-3 bg-[#ff2e63]/20" />
      </div>
      
      {/* Window */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-[#0f3460] border-4 border-[#333]">
        <div className="w-full h-1/2 border-b border-[#333]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#333]" />
      </div>
      
      {/* Plant */}
      <div className="absolute bottom-32 left-1/4 text-2xl">🌿</div>
      
      {/* Lamp */}
      <div className="absolute top-8 right-8 text-xl">💡</div>
    </div>
  );
}

export default function OfficeView() {
  const [agents, setAgents] = useState([
    { id: 1, name: "ROGER", color: "#00FFF5", status: "coding" as const, x: 25, y: 60 },
    { id: 2, name: "TOMAS", color: "#FF2E63", status: "away" as const, x: 75, y: 60 },
  ]);
  
  return (
    <div className="space-y-4">
      <h2 
        className="text-xl text-[#00FFF5]"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        🏢 OFFICE
      </h2>
      
      {/* Room */}
      <OfficeRoom />
      
      {/* Agents */}
      {agents.map(agent => (
        <AnimatedAgent
          key={agent.id}
          name={agent.name}
          color={agent.color}
          status={agent.status}
          x={agent.x}
          y={agent.y}
        />
      ))}
      
      {/* Legend */}
      <div className="bg-[#16213e] p-4 border-2 border-[#333]">
        <div className="text-sm text-gray-400 mb-2">STATUS:</div>
        <div className="flex gap-4 text-xs">
          <span>⚙️ Coding</span>
          <span>🚶 Walking</span>
          <span>💭 Idle</span>
          <span>😴 Away</span>
        </div>
      </div>
    </div>
  );
}
