import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  User, 
  ShieldCheck, 
  Bug, 
  Lightbulb, 
  Settings, 
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  X,
  Paperclip,
  Smile,
  ThumbsUp,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Textarea } from '@/src/components/ui/Textarea';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';
import { Feedback, FeedbackType, FeedbackStatus } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_FEEDBACK: Feedback[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Rahul Sharma',
    userAvatar: 'https://i.pravatar.cc/150?u=rahul',
    type: 'bug',
    subject: 'Payment link not working on mobile',
    description: 'When I open the payment link on my Android phone, the checkout button is unresponsive. Works fine on desktop.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-03-28T10:00:00Z',
    updatedAt: '2024-03-29T09:30:00Z',
    replies: [
      {
        id: 'r1',
        userId: 'admin-1',
        userName: 'Sarah Chen',
        userAvatar: 'https://i.pravatar.cc/150?u=sarah',
        message: 'Hi Rahul, we are looking into this. It seems to be a CSS overlay issue on smaller screens. We will fix this by tomorrow.',
        isAdmin: true,
        createdAt: '2024-03-28T14:00:00Z'
      }
    ]
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Anjali Gupta',
    userAvatar: 'https://i.pravatar.cc/150?u=anjali',
    type: 'feature_request',
    subject: 'Dark mode for the dashboard',
    description: 'It would be great to have a dark mode option for the admin dashboard. It helps with eye strain during late-night work.',
    status: 'pending',
    priority: 'low',
    createdAt: '2024-03-30T15:45:00Z',
    updatedAt: '2024-03-30T15:45:00Z',
    replies: []
  }
];

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const filteredFeedback = feedbacks.filter(f => 
    f.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your feedback! Our team will review it and get back to you shortly.');
    setIsReportOpen(false);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedFeedback) return;
    
    const newReply = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'admin-1',
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      message: replyMessage,
      isAdmin: true,
      createdAt: new Date().toISOString()
    };

    const updatedFeedback = {
      ...selectedFeedback,
      replies: [...selectedFeedback.replies, newReply],
      updatedAt: new Date().toISOString()
    };

    setFeedbacks(prev => prev.map(f => f.id === selectedFeedback.id ? updatedFeedback : f));
    setSelectedFeedback(updatedFeedback);
    setReplyMessage('');
    toast.success('Reply sent successfully!');
  };

  const handleResolve = () => {
    if (!selectedFeedback) return;
    
    const resolveReply = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'admin-1',
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      message: "This issue has been resolved. We have verified the fix. Thank you for helping us improve Darbaan!",
      isAdmin: true,
      createdAt: new Date().toISOString()
    };

    const updatedFeedback: Feedback = {
      ...selectedFeedback,
      status: 'resolved',
      replies: [...selectedFeedback.replies, resolveReply],
      updatedAt: new Date().toISOString()
    };

    setFeedbacks(prev => prev.map(f => f.id === selectedFeedback.id ? updatedFeedback : f));
    setSelectedFeedback(updatedFeedback);
    toast.success('Ticket marked as resolved!');
  };

  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case 'pending': return <Badge className="bg-warning-50 text-warning-700 border-warning-100">Pending</Badge>;
      case 'in_progress': return <Badge className="bg-info-50 text-info-700 border-info-100">In Progress</Badge>;
      case 'resolved': return <Badge className="bg-success-50 text-success-700 border-success-100">Resolved</Badge>;
      case 'closed': return <Badge className="bg-muted text-muted-foreground border-border">Closed</Badge>;
    }
  };

  const getTypeIcon = (type: FeedbackType) => {
    switch (type) {
      case 'bug': return <Bug size={14} className="text-destructive" />;
      case 'feature_request': return <Lightbulb size={14} className="text-warning-500" />;
      case 'improvement': return <TrendingUp size={14} className="text-info-500" />;
      default: return <HelpCircle size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Feedback & Issues</h1>
          <p className="text-muted-foreground mt-1">Report bugs, suggest features, or ask for help. We're here to help!</p>
        </div>
        <Button className="btn-primary shadow-sm" onClick={() => setIsReportOpen(true)}>
          <Plus size={18} className="mr-2" /> Report Issue
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Stats Summary */}
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 border-border shadow-sm">
          <div className="p-3 bg-warning-50 text-warning-600 rounded-2xl">
            <Clock size={24} />
          </div>
          <div className="text-2xl font-bold">{feedbacks.filter(f => f.status === 'pending').length}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending Review</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 border-border shadow-sm">
          <div className="p-3 bg-info-50 text-info-600 rounded-2xl">
            <Settings size={24} className="animate-spin-slow" />
          </div>
          <div className="text-2xl font-bold">{feedbacks.filter(f => f.status === 'in_progress').length}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">In Progress</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 border-border shadow-sm">
          <div className="p-3 bg-success-50 text-success-600 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-2xl font-bold">{feedbacks.filter(f => f.status === 'resolved').length}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resolved</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 border-border shadow-sm">
          <div className="p-3 bg-primary/5 text-primary rounded-2xl">
            <MessageSquare size={24} />
          </div>
          <div className="text-2xl font-bold">{feedbacks.length}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Tickets</p>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by subject or user..." 
            className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFeedback.map((item) => (
          <Card 
            key={item.id} 
            className="p-4 hover:border-primary/50 transition-all cursor-pointer group border-border shadow-sm"
            onClick={() => {
              setSelectedFeedback(item);
              setIsDetailOpen(true);
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-xl shrink-0",
                  item.type === 'bug' ? "bg-destructive/10" : 
                  item.type === 'feature_request' ? "bg-warning-50" : "bg-info-50"
                )}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.subject}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1.5">
                      <img src={item.userAvatar} className="h-4 w-4 rounded-full" alt="" />
                      <span className="text-[10px] font-medium text-muted-foreground">{item.userName}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {item.replies.length > 0 && (
                      <>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] text-primary font-bold flex items-center gap-1">
                          <MessageSquare size={10} /> {item.replies.length} {item.replies.length === 1 ? 'reply' : 'replies'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      {/* Report Issue SlideOver */}
      <SlideOver
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="Report an Issue"
        description="Tell us what's wrong or what you'd like to see. We'll fix it!"
      >
        <form onSubmit={handleReportSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Type of Feedback</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bug', label: 'Bug Report', icon: Bug },
                  { id: 'feature_request', label: 'Feature Request', icon: Lightbulb },
                  { id: 'improvement', label: 'Improvement', icon: TrendingUp },
                  { id: 'other', label: 'Other', icon: HelpCircle }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                  >
                    <type.icon size={14} className="text-primary" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
              <Input placeholder="Brief summary of the issue" className="text-sm" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
              <Textarea 
                placeholder="Please provide as much detail as possible..." 
                className="min-h-[150px] text-sm resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="low">Low - Minor annoyance</option>
                <option value="medium">Medium - Affecting workflow</option>
                <option value="high">High - Critical issue</option>
                <option value="urgent">Urgent - System down</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <Button type="submit" className="w-full btn-primary">
              <Send className="mr-2 h-4 w-4" /> Submit Feedback
            </Button>
            <Button type="button" variant="ghost" className="w-full border border-border" onClick={() => setIsReportOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </SlideOver>

      {/* Feedback Detail SlideOver */}
      <SlideOver
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Ticket Details"
        description="View and reply to this feedback ticket."
      >
        {selectedFeedback && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
              {/* Original Post */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {getStatusBadge(selectedFeedback.status)}
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Flag size={10} /> Priority: <span className="font-bold uppercase text-foreground">{selectedFeedback.priority}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-foreground">{selectedFeedback.subject}</h2>
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                    <p className="text-sm leading-relaxed text-foreground">{selectedFeedback.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src={selectedFeedback.userAvatar} className="h-8 w-8 rounded-full" alt="" />
                  <div>
                    <p className="text-xs font-bold">{selectedFeedback.userName}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(selectedFeedback.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Assurance Banner */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-primary text-white rounded-lg shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary">Our Assurance</p>
                  <p className="text-[10px] text-primary/80 leading-relaxed">
                    We take every report seriously. Our engineering team has been notified and we guarantee a resolution or update within 24-48 hours.
                  </p>
                </div>
              </div>

              {/* Replies */}
              <div className="space-y-6 pt-4 border-t border-border">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conversation</h4>
                {selectedFeedback.replies.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFeedback.replies.map((reply) => (
                      <div key={reply.id} className={cn(
                        "flex flex-col gap-2",
                        reply.isAdmin ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "max-w-[85%] p-3 rounded-2xl text-sm",
                          reply.isAdmin ? "bg-primary text-white rounded-tr-none" : "bg-muted text-foreground rounded-tl-none"
                        )}>
                          {reply.message}
                        </div>
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-[10px] font-bold">{reply.userName}</span>
                          <span className="text-[10px] text-muted-foreground">• {new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/20 rounded-2xl border border-dashed border-border">
                    <MessageSquare size={24} className="mx-auto text-muted-foreground mb-2 opacity-20" />
                    <p className="text-xs text-muted-foreground">No replies yet. Be the first to respond!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reply Input */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-[10px] border-primary/30 text-primary hover:bg-primary/5"
                  onClick={() => setReplyMessage("We have received your report and our engineering team is already working on a fix. We assure you that this will be resolved within 24 hours. Thank you for your patience.")}
                >
                  <ShieldCheck size={12} className="mr-1.5" /> Send Assurance
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-[10px] border-info-200 text-info-600 hover:bg-info-50"
                  onClick={() => setReplyMessage("Could you please provide more details or a screenshot of the issue? This will help us investigate faster.")}
                >
                  <HelpCircle size={12} className="mr-1.5" /> Ask for Details
                </Button>
              </div>
              <div className="relative">
                <Textarea 
                  placeholder="Type your reply here..." 
                  className="min-h-[100px] text-sm resize-none pr-12"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Smile size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Paperclip size={18} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 text-[10px] font-bold uppercase tracking-wider"
                    onClick={handleResolve}
                    disabled={selectedFeedback.status === 'resolved'}
                  >
                    <CheckCircle2 size={14} className="mr-2 text-success-500" /> Resolve Ticket
                  </Button>
                </div>
                <Button className="btn-primary" onClick={handleSendReply}>
                  <Send size={16} className="mr-2" /> Send Reply
                </Button>
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
