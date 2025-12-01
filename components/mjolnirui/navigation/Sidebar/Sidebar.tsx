// components/mjolnirui/navigation/Sidebar.tsx
"use client";

import * as React from "react";
import { ChevronRight, Home, Sparkles, Crown, User, Settings, LogOut, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const navMain = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Atomic Lab", url: "/atomic", icon: Sparkles, isActive: true },
  {
    title: "Components",
    url: "/components",
    icon: Crown,
    items: [
      { title: "Backgrounds", url: "/components/backgrounds" },
      { title: "Sidebar", url: "/components/sidebar" },
      { title: "Cards", url: "/components/cards" },
      { title: "Buttons", url: "/components/buttons" },
    ],
  },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      className={`h-screen bg-black/95 backdrop-blur-xl border-r border-gold/20 transition-all duration-300 ${
        collapsed ? "w-20" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold via-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl">
            <Zap className="w-6 h-6 text-black" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                Mjolnir
              </h1>
              <p className="text-xs text-gold/70 tracking-widest">DESIGN STUDIOS</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navMain.map((item) => (
          <Collapsible key={item.title} defaultOpen={item.isActive}>
            <CollapsibleTrigger asChild>
              <button
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  ${item.isActive ? "bg-gold/10 text-gold font-bold" : "text-gray-300"}
                  hover:bg-gradient-to-r hover:from-gold/10 hover:to-yellow-500/5 hover:text-gold
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {!collapsed && <span className="font-medium tracking-wide">{item.title}</span>}
                </div>
                {item.items && !collapsed && (
                  <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                )}
              </button>
            </CollapsibleTrigger>

            {item.items && !collapsed && (
              <CollapsibleContent className="pl-12 space-y-1 mt-1">
                {item.items.map((subItem) => (
                  <a
                    key={subItem.title}
                    href={subItem.url}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-gold transition-colors rounded-lg"
                  >
                    {subItem.title}
                  </a>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </nav>

      <Separator className="bg-gold/20" />

      {/* Pro Card */}
      {!collapsed && (
        <div className="p-6">
          <div className="bg-gradient-to-br from-gold/20 via-yellow-600/10 to-orange-700/10 rounded-2xl p-6 border border-gold/40 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-gold" />
              <h3 className="text-xl font-bold text-gold">Mjolnir Pro</h3>
            </div>
            <p className="text-sm text-gray-300 mb-5">
              Unlock all Atomic backgrounds & premium components.
            </p>
            <Button className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-black font-bold">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gold/20">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all">
          <Avatar className="w-10 h-10 border-2 border-gold/50">
            <AvatarImage src="/lovable-uploads/skyleen.jpg" />
            <AvatarFallback className="bg-gradient-to-br from-gold to-yellow-600 text-black font-bold">
              SK
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="text-left">
              <p className="font-bold text-gold">Skyleen</p>
              <p className="text-xs text-gold/70">God Tier</p>
            </div>
          )}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}