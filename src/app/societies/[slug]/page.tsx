import { societies } from "@/data/societies";
import { members } from "@/data/members";
import { events } from "@/data/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Target, Eye, Calendar, Users } from "lucide-react";

export default async function SocietyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const society = societies.find(s => s.slug === slug);

  if (!society) {
    notFound();
  }

  // Get data specific to this society
  const societyMembers = members.filter(m => m.societyId === society.id);
  const societyEvents = events.filter(e => e.societyId === society.id).slice(0, 3); // Get latest 3 events

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className={`relative pt-32 pb-20 w-full overflow-hidden flex items-center min-h-[60vh] ${society.accentColor} text-white`}>
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${society.accentColor} opacity-30 rounded-full blur-[120px] mix-blend-screen`} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {society.logo ? (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-white flex items-center justify-center mb-8 shadow-2xl shadow-black/50 border-4 border-white/20 overflow-hidden p-3 md:p-4">
                <img 
                  src={society.logo} 
                  alt={society.name} 
                  className="w-full h-full object-contain"
                  style={{ transform: society.logoRotation }}
                />
              </div>
            ) : (
              <div className={`w-24 h-24 rounded-3xl ${society.accentColor} flex items-center justify-center text-3xl font-heading font-black mb-8 shadow-2xl shadow-black/50 border border-white/20 text-white`}>
                {society.shortName}
              </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              {society.name}
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {society.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-20">
            {/* Vision & Mission */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl border border-pale-silver shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 ${society.accentColor}`}>
                  <Eye size={24} />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {society.vision}
                </p>
              </div>
              
              <div className="glass p-8 rounded-3xl border border-pale-silver shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 ${society.accentColor}`}>
                  <Target size={24} />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {society.mission}
                </p>
              </div>
            </section>

            {/* Events */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                  <span className={`w-2 h-8 rounded-full inline-block ${society.accentColor}`}></span>
                  Chapter Events
                </h2>
                {societyEvents.length > 0 && (
                  <Link href={`/events?society=${society.id}`} className="text-ieee-blue font-semibold hover:underline hidden md:block">
                    View All Events
                  </Link>
                )}
              </div>
              
              {societyEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {societyEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="group">
                      <div className="h-full p-6 rounded-2xl border border-pale-silver bg-white shadow-sm hover:shadow-lg transition-all flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 font-medium">
                          <Calendar size={16} className="text-ieee-blue" />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-ieee-blue transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                          {event.description}
                        </p>
                        <div className="text-sm font-bold text-ieee-blue flex items-center mt-auto">
                          Details <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                  {[1, 2].map((i) => (
                    <div key={`placeholder-event-${i}`} className="h-full p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col relative overflow-hidden pointer-events-none">
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-3 font-medium">
                        <Calendar size={16} />
                        Date TBA
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2 text-slate-600 line-clamp-2">
                        {society.shortName} Upcoming Event
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
                        Exciting activities are being planned. More details about this event will be published here soon.
                      </p>
                      <div className="text-sm font-bold text-slate-400 flex items-center mt-auto">
                        Coming Soon
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Team Preview */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                  <span className={`w-2 h-8 rounded-full inline-block ${society.accentColor}`}></span>
                  Leadership Team
                </h2>
                {societyMembers.length > 0 && (
                  <Link href="/team" className="text-ieee-blue font-semibold hover:underline hidden md:block">
                    View Full Directory
                  </Link>
                )}
              </div>
              
              {societyMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {societyMembers.map((member) => (
                    <div key={member.id} className="p-6 rounded-2xl border border-pale-silver bg-white text-center flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-white shadow-sm mb-4 flex items-center justify-center text-xl font-bold text-slate-400">
                        {member.name.charAt(0)}
                      </div>
                      <h4 className="font-heading font-bold text-lg">{member.name}</h4>
                      <p className="text-sm font-medium text-muted-foreground">{member.position}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                  {['Chairperson', 'Vice Chair', 'Secretary'].map((position, i) => (
                    <div key={`placeholder-member-${i}`} className="p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center flex flex-col items-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-slate-400">
                        <Users size={32} />
                      </div>
                      <h4 className="font-heading font-bold text-lg text-slate-600">Name TBA</h4>
                      <p className="text-sm font-medium text-slate-500">{position}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 glass p-8 rounded-3xl border border-pale-silver shadow-xl shadow-slate-200">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 ${society.accentColor}`}>
                <Users size={32} />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4">Join {society.shortName}</h3>
              <p className="text-muted-foreground mb-8">
                Become a part of a global network of professionals and students passionate about {society.name.replace('IEEE ', '')}.
              </p>
              
              <Link 
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group ${society.accentColor}`}
              >
                Become a Member
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="mt-6 pt-6 border-t border-pale-silver/50">
                <p className="text-sm text-slate-500 text-center">
                  Need help joining? <a href="mailto:ieee@nssce.ac.in" className="font-bold hover:underline">Contact us</a>
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return societies.map((society) => ({
    slug: society.slug,
  }));
}
