import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Edit3,
  Search,
  Filter,
  ShieldCheck,
  Check,
  Sparkles,
  AlertTriangle,
  Clock,
  ThumbsUp,
  Sliders
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { communicationService } from '../../services/api/communicationService';
import { toast } from 'sonner';

export const CommunicationsHubPage = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'Pending' | 'Approved' | 'Sent' | 'Rejected'
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Email editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('Warm');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Send Confirmation Modal
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Bulk Approve Modal
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const data = await communicationService.getAll({ status: activeTab, search });
        setEmails(data);
        if (data.length > 0 && !selectedEmail) {
          setSelectedEmail(data[0]);
          setEditedContent(data[0].content);
          setSelectedTone(data[0].tone || 'Warm');
        } else if (selectedEmail) {
          const fresh = data.find(e => e.id === selectedEmail.id);
          if (fresh) {
            setSelectedEmail(fresh);
            setEditedContent(fresh.content);
          }
        }
      } catch (e) {
        console.error('Failed to load email queue', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, [activeTab, search]);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setEditedContent(email.content);
    setSelectedTone(email.tone || 'Warm');
    setIsEditing(false);
  };

  const handleRegenerate = async (tone) => {
    if (!selectedEmail) return;
    setIsRegenerating(true);
    try {
      const updated = await communicationService.regenerateEmail(selectedEmail.id, tone);
      setSelectedEmail(updated);
      setEditedContent(updated.content);
      setSelectedTone(tone);
      toast.success(`Draft regenerated with ${tone} tone`);
    } catch (e) {
      toast.error('Failed to regenerate draft');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveEdits = async () => {
    if (!selectedEmail) return;
    try {
      const updated = await communicationService.updateEmail(selectedEmail.id, { content: editedContent });
      setSelectedEmail(updated);
      setEmails(emails.map(e => e.id === updated.id ? updated : e));
      setIsEditing(false);
      toast.success('Email draft saved');
    } catch (e) {
      toast.error('Failed to save draft');
    }
  };

  const handleApprove = async () => {
    if (!selectedEmail) return;
    try {
      const updated = await communicationService.approveEmail(selectedEmail.id);
      setSelectedEmail(updated);
      setEmails(emails.map(e => e.id === updated.id ? updated : e));
      toast.success('Draft email approved by recruiter');
    } catch (e) {
      toast.error('Failed to approve email');
    }
  };

  const handleSendConfirm = async () => {
    if (!selectedEmail) return;
    setIsSending(true);
    try {
      await communicationService.sendEmail(selectedEmail.id);
      const updated = { ...selectedEmail, status: 'Sent' };
      setSelectedEmail(updated);
      setEmails(emails.map(e => e.id === updated.id ? updated : e));
      setIsSendModalOpen(false);
      toast.success(`Email officially dispatched to ${selectedEmail.candidateName} (${selectedEmail.candidateEmail})`);
    } catch (e) {
      toast.error('Failed to dispatch email');
    } finally {
      setIsSending(false);
    }
  };

  const handleBulkApprove = async () => {
    const pendingIds = emails.filter(e => e.status === 'Pending').map(e => e.id);
    if (pendingIds.length === 0) return;
    try {
      await communicationService.bulkApprove(pendingIds);
      setEmails(emails.map(e => pendingIds.includes(e.id) ? { ...e, status: 'Approved' } : e));
      if (selectedEmail && pendingIds.includes(selectedEmail.id)) {
        setSelectedEmail({ ...selectedEmail, status: 'Approved' });
      }
      setIsBulkModalOpen(false);
      toast.success(`Approved ${pendingIds.length} pending candidate email drafts`);
    } catch (e) {
      toast.error('Failed to bulk approve');
    }
  };

  const pendingCount = emails.filter(e => e.status === 'Pending').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm" dot>Module 9 / Communications Hub</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Human-Reviewed Outreach</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            Candidate Communications Hub
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            AI-drafted selection and constructive feedback emails. Nothing sends without explicit recruiter sign-off.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <Button
              onClick={() => setIsBulkModalOpen(true)}
              variant="outline"
              size="sm"
              leftIcon={<Check className="w-3.5 h-3.5 text-emerald-500" />}
              className="text-xs"
            >
              Bulk Approve All Pending ({pendingCount})
            </Button>
          )}
        </div>
      </div>

      {/* Human-Review Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold font-heading text-foreground block">
              Ethical AI Human-in-the-Loop Protocol
            </span>
            <span className="text-[11px] text-muted-foreground leading-relaxed block font-medium">
              Autonomous emails are prohibited. Recruiters can adjust the tone, customize feedback bullets, and click Send only when satisfied.
            </span>
          </div>
        </div>
        <Badge variant="success" size="sm">
          Approval Required
        </Badge>
      </div>

      {/* Status Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-card-border pb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
        {['all', 'Pending', 'Approved', 'Sent', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors shrink-0 ${
              activeTab === tab
                ? 'bg-brand-500 text-white font-bold shadow-glow-sm'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'all' ? 'All Drafts' : tab}
          </button>
        ))}
      </div>

      {/* Gmail-Style Split View: List on Left, Rich Preview/Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: Email Queue List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Quick search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search candidate name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-muted/40 rounded-xl text-xs text-foreground placeholder:text-muted-foreground outline-none border border-card-border focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
            </div>
          ) : emails.length === 0 ? (
            <Card className="p-8 text-center text-xs text-muted-foreground">
              <Mail className="w-8 h-8 mx-auto text-muted-foreground stroke-1 mb-2" />
              <p>No email drafts in this view.</p>
            </Card>
          ) : (
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1 no-scrollbar">
              {emails.map((email) => {
                const isSelected = selectedEmail?.id === email.id;

                return (
                  <div
                    key={email.id}
                    onClick={() => handleSelectEmail(email)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 shadow-glow-sm'
                        : 'bg-card border-card-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          email.type === 'Selection' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {email.type}
                        </span>
                        <span className="text-xs font-bold text-foreground truncate max-w-[160px]">
                          {email.candidateName}
                        </span>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        email.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-500' :
                        email.status === 'Sent' ? 'bg-blue-500/15 text-blue-400' :
                        'bg-amber-500/15 text-amber-500'
                      }`}>
                        {email.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-foreground mt-2 line-clamp-1">
                      {email.subject}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {email.previewSnippet}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 mt-2 border-t border-card-border/60">
                      <span>Score: {email.score}%</span>
                      <span>{email.generatedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Rich Preview & Editor (7 cols) */}
        <div className="lg:col-span-7">
          {selectedEmail ? (
            <Card className="p-6 sm:p-8 space-y-6 h-full flex flex-col justify-between border-brand-500/30 glass-panel shadow-2xl">
              <div className="space-y-5">
                {/* Email Header Metadata */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-card-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={selectedEmail.type === 'Selection' ? 'success' : 'risk'} size="sm">
                        {selectedEmail.type} Dispatch
                      </Badge>
                      <Badge variant={selectedEmail.status === 'Approved' ? 'success' : selectedEmail.status === 'Sent' ? 'brand' : 'warning'} size="sm">
                        {selectedEmail.status}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold font-heading text-foreground mt-1">
                      {selectedEmail.subject}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      To: <strong className="text-foreground">{selectedEmail.candidateName}</strong> ({selectedEmail.candidateEmail})
                    </p>
                  </div>

                  {/* Tone Selector & Regenerate Actions */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Tone:</span>
                    {['Warm', 'Formal', 'Concise'].map(t => (
                      <button
                        key={t}
                        onClick={() => handleRegenerate(t)}
                        disabled={isRegenerating || selectedEmail.status === 'Sent'}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                          selectedTone === t
                            ? 'bg-brand-500 text-white font-bold'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Feedback Highlights Tags */}
                {selectedEmail.feedbackHighlights && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEmail.feedbackHighlights.map((hl, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-brand-500/10 text-brand-400 border border-brand-500/20">
                        {hl}
                      </span>
                    ))}
                  </div>
                )}

                {/* Email Body: Read-only Preview or Inline Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>Message Body</span>
                    {!isEditing && selectedEmail.status !== 'Sent' && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-brand-500 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Text
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        rows={11}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-card border border-brand-500/50 text-xs sm:text-sm text-foreground outline-none font-sans leading-relaxed focus:ring-2 focus:ring-brand-500"
                      />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" variant="primary" onClick={handleSaveEdits}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-muted/30 border border-card-border text-xs sm:text-sm text-foreground font-sans leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
                      {selectedEmail.content}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-4 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Evaluation Score: {selectedEmail.score}/100 • Requires Recruiter Approval
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedEmail.status === 'Pending' && (
                    <Button
                      onClick={handleApprove}
                      variant="secondary"
                      size="md"
                      leftIcon={<Check className="w-4 h-4 text-emerald-500" />}
                      className="text-xs flex-1 sm:flex-initial"
                    >
                      Approve Draft
                    </Button>
                  )}

                  {selectedEmail.status !== 'Sent' ? (
                    <Button
                      onClick={() => setIsSendModalOpen(true)}
                      variant="primary"
                      size="md"
                      leftIcon={<Send className="w-4 h-4" />}
                      className="text-xs shadow-glow-sm flex-1 sm:flex-initial"
                    >
                      Send Email
                    </Button>
                  ) : (
                    <Badge variant="brand" size="md">
                      Dispatched to Recipient
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-12 text-center text-xs text-muted-foreground">
              Select an email from the left queue to review and authorize dispatch.
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Modal Before Sending Email */}
      <Modal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        title="Authorize & Dispatch Email"
        subtitle={`Confirm final dispatch to ${selectedEmail?.candidateName}`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-card-border space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">Recipient:</span>
              <span className="font-bold text-foreground">{selectedEmail?.candidateEmail}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">Subject:</span>
              <span className="font-bold text-foreground">{selectedEmail?.subject}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-bold text-emerald-500">{selectedEmail?.type}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            By confirming, this email will be logged in the recruitment audit trail and dispatched immediately.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-card-border">
            <Button variant="ghost" size="md" onClick={() => setIsSendModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isSending}
              onClick={handleSendConfirm}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Confirm & Send Now
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Approval Modal */}
      <Modal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        title="Bulk Authorize Draft Emails"
        subtitle={`Approve all ${pendingCount} pending email drafts simultaneously`}
      >
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            You are about to approve {pendingCount} candidate selection and constructive rejection emails. Each email has passed automated rubric benchmarking.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-card-border">
            <Button variant="ghost" size="md" onClick={() => setIsBulkModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleBulkApprove}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Approve All ({pendingCount})
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
