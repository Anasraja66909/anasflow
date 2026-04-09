import os
import re

base_dir = r'c:\anasflow-complete\frontend-next\src'
landing_dir = os.path.join(base_dir, 'components', 'landing_page')
os.makedirs(landing_dir, exist_ok=True)

with open(os.path.join(base_dir, 'app', 'page.tsx'), 'r', encoding='utf-8') as f:
    code = f.read()

imports = '''"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Activity, Zap, Play, CheckCircle2, ChevronDown,
  BarChart3, Target, Link as LinkIcon, DollarSign,
  PieChart, Server, Fingerprint, Sparkles, Layers,
  Menu, X, TrendingUp
} from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

'''

# Extract CountUp
count_up_match = re.search(r'// --- Smooth Counter Component ---.*?(?=// ---)', code, re.DOTALL)
count_up_code = count_up_match.group(0) if count_up_match else ''
with open(os.path.join(landing_dir, 'CountUp.tsx'), 'w', encoding='utf-8') as f:
    f.write(imports + count_up_code + '\nexport default CountUp;\n')

sections = [
    ('Navbar', 'Navbar Component ---'),
    ('Hero', 'Hero Section ---'),
    ('IntegrationMarquee', 'Integration Marquee \\(Social Proof\\) ---'),
    ('Problems', 'Problem Section ---'),
    ('Solution', 'Solution Section ---'),
    ('Features', 'Features Bento Grid ---'),
    ('AIOptimizationHighlight', 'Highlight Feature: AI Optimization Section ---'),
    ('SupportedPlatforms', 'Supported Platforms Section ---'),
    ('HowItWorks', 'How It Works ---'),
    ('Pricing', 'Pricing ---'),
    ('Testimonials', 'Testimonials ---'),
    ('FAQ', 'FAQ Section ---'),
    ('Footer', 'Final CTA & Footer ---')
]

for comp_name, marker_name in sections:
    # Adding MarqueeLogo to IntegrationMarquee
    if comp_name == 'IntegrationMarquee':
        pattern = r"const MarqueeLogo.*?// --- " + marker_name + r".*?(?=// ---|\Z)"
    else:
        pattern = r"// --- " + marker_name + r".*?(?=// ---|\Z)"
        
    match = re.search(pattern, code, re.DOTALL)
    if match:
        comp_code = match.group(0)
        extra_import = 'import CountUp from "./CountUp";\n' if (comp_name == 'Hero' or comp_name == 'AIOptimizationHighlight') else ''
        with open(os.path.join(landing_dir, f'{comp_name}.tsx'), 'w', encoding='utf-8') as f:
            f.write(imports + extra_import + comp_code + f'\nexport default {comp_name};\n')
        print(f"Created {comp_name}")
    else:
        print(f"Failed to find {comp_name}")

imports_page = '''import React from "react";
'''
for comp, _ in sections:
    imports_page += f'import {comp} from "@/components/landing_page/{comp}";\n'

page_code = '''
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
'''
for comp, _ in sections:
    page_code += f'      <{comp} />\n'
page_code += '''    </div>
  );
}
'''
with open(os.path.join(base_dir, 'app', 'page.tsx'), 'w', encoding='utf-8') as f:
    f.write(imports_page + page_code)

print("Done")
