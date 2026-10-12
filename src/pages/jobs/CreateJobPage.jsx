import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  X,
  Sparkles,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Stepper } from '../../components/ui/Stepper';
import { jobService } from '../../services/api/jobService';
import { toast } from 'sonner';

export const CreateJobPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: 'Senior Distributed Systems Engineer',
    department: 'Engineering',
    location: 'Remote / Islamabad, PK',
    type: 'Full-Time',
    description: 'Lead architecture of high-throughput real-time stream processing microservices, database caching layers, and distributed consensus infrastructure.',
    experienceMin: 4,
    experienceMax: 8,
    salaryMin: 95000,
    salaryMax: 135000,
    matchThreshold: 75,
    skills: ['Python', 'FastAPI', 'Rust', 'Docker', 'PostgreSQL', 'Redis', 'Kubernetes'],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science or Software Engineering",
      "4+ years building high-concurrency backend services",
      "Demonstrated open-source contributions or distributed systems experience"
    ]
  });

  const [newSkill, setNewSkill] = useState('');
  const [newQual, setNewQual] = useState('');

  const steps = [
    { title: 'Basics', description: 'Title & Department' },
    { title: 'Skills & Experience', description: 'Tech stack & years' },
    { title: 'Qualifications', description: 'Degree & Criteria' },
    { title: 'Review & Launch', description: 'Live preview check' }
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const handleAddQual = () => {
    if (newQual.trim()) {
      setFormData({ ...formData, qualifications: [...formData.qualifications, newQual.trim()] });
      setNewQual('');
    }
  };

  const handleRemoveQual = (index) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const created = await jobService.create({
        ...formData,
        experienceYears: [formData.experienceMin, formData.experienceMax]
      });
      toast.success('Job requisition created successfully!');
      navigate(`/app/jobs/${created.id}`);
    } catch (e) {
      toast.error('Failed to create job requisition.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
            Create Job Requisition
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Specify technical parameters for automated semantic matching and persona calibrations.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/app/jobs')}>
          Cancel
        </Button>
      </div>

      {/* Stepper Header */}
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Steps on Left */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Basics */}
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h2 className="text-lg font-bold font-heading text-foreground">Role Basics</h2>
                <Input
                  label="Job Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full h-11 px-3 bg-card border border-card-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-500/50"
                    >
                      <option>Engineering</option>
                      <option>AI Research</option>
                      <option>Product Design</option>
                      <option>Infrastructure</option>
                      <option>Human Resources</option>
                      <option>Analytics</option>
                    </select>
                  </div>

                  <Input
                    label="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Remote / Islamabad, PK"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    Job Description & Scope
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-card border border-card-border text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-500/50"
                    placeholder="Outline core responsibilities and technical expectations..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Skills & Experience */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-lg font-bold font-heading text-foreground">Skills & Experience Range</h2>

                {/* Skill Chips Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    Required Skills (Used for Semantic Vector Match)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a required skill (e.g. FastAPI, Docker)..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      className="flex-1 h-11 px-3.5 rounded-xl bg-card border border-card-border text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <Button variant="secondary" size="md" onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/25"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-foreground"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Range Sliders */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="font-semibold uppercase tracking-wider text-muted-foreground">
                      Experience Band
                    </label>
                    <span className="font-bold text-foreground">
                      {formData.experienceMin} to {formData.experienceMax} Years
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-muted-foreground block mb-1">Minimum (Years)</span>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        value={formData.experienceMin}
                        onChange={(e) => setFormData({ ...formData, experienceMin: parseInt(e.target.value) })}
                        className="w-full accent-brand-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block mb-1">Maximum (Years)</span>
                      <input
                        type="range"
                        min={formData.experienceMin}
                        max={20}
                        value={formData.experienceMax}
                        onChange={(e) => setFormData({ ...formData, experienceMax: parseInt(e.target.value) })}
                        className="w-full accent-brand-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    Annual Salary Range (USD)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Minimum ($)"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                    />
                    <Input
                      type="number"
                      label="Maximum ($)"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Qualifications */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-lg font-bold font-heading text-foreground">Qualifications & Benchmarks</h2>

                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    Add Degree or Experience Requirements
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. MS in Computer Science or proven track record..."
                      value={newQual}
                      onChange={(e) => setNewQual(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQual())}
                      className="flex-1 h-11 px-3.5 rounded-xl bg-card border border-card-border text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <Button variant="secondary" size="md" onClick={handleAddQual}>
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {formData.qualifications.map((qual, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-muted/40 border border-card-border flex items-center justify-between text-xs text-foreground"
                      >
                        <span className="flex-1">{qual}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQual(idx)}
                          className="text-muted-foreground hover:text-risk-500 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground font-semibold">Match Qualification Threshold</span>
                    <span className="font-bold text-brand-500">{formData.matchThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={95}
                    value={formData.matchThreshold}
                    onChange={(e) => setFormData({ ...formData, matchThreshold: parseInt(e.target.value) })}
                    className="w-full accent-brand-500"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Candidates scoring below this threshold will be flagged for secondary recruiter approval.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                  <h2 className="text-lg font-bold font-heading text-foreground">Ready to Launch Requisition</h2>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Review the parameters below. Once created, candidate resumes will be automatically cross-matched with semantic embedding vectors.
                </p>

                <div className="p-4 rounded-2xl bg-muted/40 border border-card-border space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-card-border">
                    <span className="text-muted-foreground">Role Title:</span>
                    <span className="font-bold text-foreground">{formData.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-card-border">
                    <span className="text-muted-foreground">Department & Location:</span>
                    <span className="font-semibold text-foreground">{formData.department} ({formData.location})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-card-border">
                    <span className="text-muted-foreground">Experience Range:</span>
                    <span className="font-mono text-foreground">{formData.experienceMin} - {formData.experienceMax} years</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Salary Budget:</span>
                    <span className="font-mono font-bold text-emerald-500">${formData.salaryMin / 1000}k - ${formData.salaryMax / 1000}k USD</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-card-border">
              <Button
                variant="ghost"
                size="md"
                onClick={handleBack}
                disabled={currentStep === 0}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Publish Requisition
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Live Preview Card on Right */}
        <div>
          <div className="sticky top-24 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Live Job Preview Card
            </span>
            <Card className="p-6 space-y-4 shadow-xl border border-brand-500/30">
              <div className="flex items-start justify-between">
                <Badge variant="brand" size="sm" dot>Live Draft</Badge>
                <span className="text-[11px] font-mono text-muted-foreground">Min {formData.matchThreshold}% Fit</span>
              </div>

              <div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  {formData.title || 'Untitled Role'}
                </h3>
                <p className="text-xs text-brand-500 font-mono mt-0.5">{formData.department}</p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3">
                {formData.description || 'Description will appear here...'}
              </p>

              <div className="space-y-2 pt-2 border-t border-card-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {formData.location}
                  </span>
                  <span className="font-bold text-foreground">
                    ${formData.salaryMin / 1000}k - ${formData.salaryMax / 1000}k
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {formData.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
