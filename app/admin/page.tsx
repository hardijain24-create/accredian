"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowLeft, Search, RefreshCw, Briefcase, Users, Calendar, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTeamSize, setFilterTeamSize] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error("Failed to fetch leads:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filtered list
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.message.toLowerCase().includes(search.toLowerCase());

    const matchesTeamSize = !filterTeamSize || lead.teamSize === filterTeamSize;

    return matchesSearch && matchesTeamSize;
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const enterpriseLeads = leads.filter((l) => l.teamSize === "1000+" || l.teamSize === "201-1000").length;
  
  // Find most common team size request
  const teamSizeCounts: Record<string, number> = {};
  leads.forEach((l) => {
    teamSizeCounts[l.teamSize] = (teamSizeCounts[l.teamSize] || 0) + 1;
  });
  
  let topTeamSize = "N/A";
  let maxCount = 0;
  Object.entries(teamSizeCounts).forEach(([size, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topTeamSize = `${size} emp`;
    }
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-dark font-body pb-16 relative">
      
      {/* Background blobs for aesthetics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-accent-purple/5 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-accent-pink/5 blur-[110px]" />
      </div>

      {/* Admin header */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-border-neutral py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full border border-border-neutral text-text-secondary hover:text-text-dark hover:border-text-dark/30 transition-colors focus-visible:outline-none cursor-pointer"
              title="Go back to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-accent-purple" />
              <span className="text-md sm:text-lg font-heading font-bold text-text-dark">
                accredian
                <span className="text-accent-purple font-sans text-[10px] uppercase tracking-wider ml-1.5 font-bold border border-accent-purple/20 rounded-md px-1.5 py-0.5 bg-accent-purple/5">
                  admin
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-accent-purple" /> Coordinator Mode
            </span>
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="p-2 rounded-full border border-border-neutral text-text-secondary hover:text-text-dark hover:border-accent-purple transition-colors focus-visible:outline-none disabled:opacity-50 cursor-pointer"
              title="Reload leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-dark">Enterprise Inquiry Dashboard</h1>
          <p className="text-xs sm:text-sm text-text-secondary font-body mt-1">
            Review upskilling inquiries, team audits, and coordinate response pipelines.
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Leads */}
          <div className="bg-white border border-border-neutral p-5 rounded-3xl flex items-center space-x-4 shadow-editorial hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-3.5 bg-accent-purple/10 text-accent-purple rounded-2xl shadow-sm">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Total Inquiries</p>
              <h2 className="text-2xl font-bold text-text-dark mt-0.5">{totalLeads}</h2>
            </div>
          </div>

          {/* Card 2: Enterprise accounts */}
          <div className="bg-white border border-border-neutral p-5 rounded-3xl flex items-center space-x-4 shadow-editorial hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-3.5 bg-accent-blue/15 text-accent-blue rounded-2xl shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Enterprise Tier Leads</p>
              <h2 className="text-2xl font-bold text-text-dark mt-0.5">{enterpriseLeads}</h2>
            </div>
          </div>

          {/* Card 3: Top Team size demand */}
          <div className="bg-white border border-border-neutral p-5 rounded-3xl flex items-center space-x-4 shadow-editorial hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-3.5 bg-accent-pink/10 text-accent-pink rounded-2xl shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Top Team Scale Demand</p>
              <h2 className="text-2xl font-bold text-text-dark mt-0.5">{topTeamSize}</h2>
            </div>
          </div>
        </div>

        {/* Visual Analytics Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Chart 1: Team Scale Distribution */}
          <div className="lg:col-span-8 bg-white border border-border-neutral rounded-3xl p-6 shadow-editorial flex flex-col">
            <div className="border-b border-border-neutral pb-3 mb-5 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-heading font-bold text-text-dark uppercase tracking-widest">Team Scale Distribution</h3>
                <p className="text-[10px] text-text-secondary font-body mt-0.5">Real-time count of upskilling requests classified by company size.</p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/5 px-2 py-0.5 rounded border border-accent-purple/20">
                Inquiry Breakdown
              </span>
            </div>
            <div className="flex items-end justify-between h-44 px-2 space-x-3 sm:space-x-6">
              {(() => {
                const sizeCategories = ["1-19", "20-99", "100-200", "201-1000", "1000+"];
                const categoryCounts = sizeCategories.map(cat => ({
                  category: cat,
                  count: leads.filter(l => l.teamSize === cat).length
                }));
                const maxCountVal = Math.max(...categoryCounts.map(c => c.count), 1);

                return categoryCounts.map(c => {
                  const percent = (c.count / maxCountVal) * 100;
                  return (
                    <div key={c.category} className="flex-1 flex flex-col items-center group cursor-pointer">
                      {/* Interactive Tooltip */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-text-dark text-white text-[9px] font-bold px-2 py-0.5 rounded-md mb-2 shadow-sm font-mono absolute -translate-y-9 border border-white/10 z-10">
                        {c.count} leads
                      </span>
                      {/* Animated Bar */}
                      <div className="w-full bg-bg-base border border-border-neutral rounded-2xl h-28 relative overflow-hidden flex items-end shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                        <div 
                          className="w-full bg-gradient-to-t from-accent-purple to-accent-pink rounded-t-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ height: `${percent}%` }}
                        />
                      </div>
                      {/* X-axis Label */}
                      <span className="text-[10px] text-text-secondary font-bold font-mono mt-3 leading-none group-hover:text-text-dark transition-colors">
                        {c.category}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Chart 2: Leads Quality Gauge Card */}
          <div className="lg:col-span-4 bg-white border border-border-neutral rounded-3xl p-6 shadow-editorial flex flex-col justify-between min-h-[220px]">
            <div className="border-b border-border-neutral pb-3 mb-4">
              <h3 className="text-sm font-heading font-bold text-text-dark uppercase tracking-widest">Inquiry Quality</h3>
              <p className="text-[10px] text-text-secondary font-body mt-0.5">Ratio of high-value enterprise accounts.</p>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-text-dark">Enterprise Ratio</span>
                  <span className="font-mono text-accent-purple font-bold">
                    {totalLeads > 0 ? Math.round((enterpriseLeads / totalLeads) * 100) : 0}%
                  </span>
                </div>
                <div className="h-3 w-full bg-bg-base border border-border-neutral rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${totalLeads > 0 ? (enterpriseLeads / totalLeads) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center font-mono">
                <div className="p-3 bg-bg-base border border-border-neutral rounded-2xl">
                  <p className="text-[8px] uppercase tracking-wider text-text-secondary font-bold">High Value</p>
                  <p className="text-md font-bold text-text-dark mt-0.5">{enterpriseLeads}</p>
                </div>
                <div className="p-3 bg-bg-base border border-border-neutral rounded-2xl">
                  <p className="text-[8px] uppercase tracking-wider text-text-secondary font-bold">Standard</p>
                  <p className="text-md font-bold text-text-dark mt-0.5">{totalLeads - enterpriseLeads}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="bg-white border border-border-neutral rounded-3xl p-4 shadow-editorial mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, company, email, message contents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-neutral bg-bg-base/70 text-xs sm:text-sm text-text-dark focus:border-text-dark focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={filterTeamSize}
              onChange={(e) => setFilterTeamSize(e.target.value)}
              className="rounded-xl border border-border-neutral bg-bg-base/75 px-4 py-2.5 text-xs sm:text-sm text-text-dark focus:border-text-dark focus:outline-none focus:ring-0 appearance-none min-w-[150px]"
            >
              <option value="">All Team Sizes</option>
              <option value="1-50">1 - 50 employees</option>
              <option value="51-200">51 - 200 employees</option>
              <option value="201-1000">201 - 1,000 employees</option>
              <option value="1000+">1,000+ employees</option>
            </select>
          </div>
        </div>

        {/* Leads Table Card */}
        <div className="bg-white border border-border-neutral rounded-3xl shadow-editorial overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-accent-purple" />
              <p className="text-xs text-text-secondary mt-3">Loading leads database...</p>
            </div>
          ) : filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-neutral bg-bg-base/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-text-secondary">
                    <th className="px-6 py-4">Inquirer</th>
                    <th className="px-6 py-4">Company Details</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-neutral text-xs sm:text-sm text-text-dark font-body bg-white">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-bg-base/40 transition-colors">
                      {/* Inquirer Name/Email */}
                      <td className="px-6 py-4 space-y-1">
                        <p className="font-semibold text-text-dark">{lead.name}</p>
                        <a href={`mailto:${lead.email}`} className="text-xs text-accent-purple hover:underline flex items-center space-x-1 font-bold">
                          <Mail className="w-3 h-3 mr-1 inline text-accent-purple" />
                          <span>{lead.email}</span>
                        </a>
                      </td>

                      {/* Company Name/Size */}
                      <td className="px-6 py-4 space-y-1">
                        <p className="font-semibold text-text-dark">{lead.company}</p>
                        <span className="inline-block px-2 py-0.5 bg-accent-blue/10 text-[10px] text-text-dark border border-accent-blue/20 rounded-md font-bold uppercase">
                          {lead.teamSize} emp
                        </span>
                      </td>

                      {/* Message text */}
                      <td className="px-6 py-4 max-w-[280px] truncate" title={lead.message}>
                        <p className="text-text-secondary truncate">
                          {lead.message || <span className="italic text-text-secondary/50 font-normal">No message provided</span>}
                        </p>
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 text-text-secondary text-xs">
                        {new Date(lead.timestamp).toLocaleDateString()} &mdash; {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-sm text-text-secondary">No leads found in database matching search criteria.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setFilterTeamSize("");
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
