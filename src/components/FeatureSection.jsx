import React from 'react';
import { 
  Magnifier, 
  UniversalAccess, 
  BarsAscendingAlignLeft, 
  Bookmark, 
  HandPointUp, 
  SquareDashedText, 
  Circle, 
 ArrowUpRightFromSquare
} from '@gravity-ui/icons'; 
export default function FeaturesSection() {
  const features = [
    {
      icon: <Magnifier className="w-5 h-5 text-purple-400" />,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters."
    },
    {
      icon: <UniversalAccess className="w-5 h-5 text-purple-400" />,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently."
    },
    {
      icon: <BarsAscendingAlignLeft className="w-5 h-5 text-purple-400" />,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring."
    },
    {
      icon: <Bookmark className="w-5 h-5 text-purple-400" />,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard."
    },
    {
      icon: <HandPointUp className="w-5 h-5 text-purple-400" />,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!"
    },
    {
      icon: <SquareDashedText className="w-5 h-5 text-purple-400" />,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates."
    },
    {
      icon: <Circle className="w-5 h-5 text-purple-400" />,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience."
    },
    {
      icon: <ArrowUpRightFromSquare className="w-5 h-5 text-purple-400" />,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips."
    }
  ];

  return (
    <section className="bg-[#0b0b0c] text-white py-20 px-4 md:px-8 flex flex-col items-center justify-center min-h-screen">
      
      {/* Top Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-purple-600 inline-block"></span>
        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
          FEATURES JOB
        </span>
        <span className="w-1.5 h-1.5 bg-purple-600 inline-block"></span>
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-center tracking-tight max-w-xl leading-tight mb-16">
        Everything you need <br /> to succeed
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-7xl w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            
            {/* Icon Wrapper (Dark border, glowing background effect) */}
            <div className="flex items-center justify-center min-w-[48px] h-12 rounded-xl bg-[#121214] border border-[#1f1f23] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              {feature.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-[15px] font-medium text-gray-100 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-[13px] text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}