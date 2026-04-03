import React from 'react';
import { 
  MessageSquareText, 
  Search, 
  Plus, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  Send, 
  Paperclip, 
  Smile, 
  Check, 
  CheckCheck, 
  Clock,
  User,
  ShieldCheck,
  Building2,
  Filter,
  Circle
} from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const contacts = [
  {
    id: '1',
    name: 'Security Desk',
    lastMessage: 'Visitor at Gate 2 for Block B-402',
    time: '10:45 AM',
    unread: 2,
    online: true,
    type: 'Service',
    avatar: 'S',
    color: 'bg-orange-500'
  },
  {
    id: '2',
    name: 'Maintenance Team',
    lastMessage: 'Plumbing work in Block C completed.',
    time: '09:30 AM',
    unread: 0,
    online: true,
    type: 'Service',
    avatar: 'M',
    color: 'bg-blue-500'
  },
  {
    id: '3',
    name: 'Society Management',
    lastMessage: 'Please review the AGM minutes.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    type: 'Admin',
    avatar: 'A',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'John Doe (B-402)',
    lastMessage: 'Thank you for the quick response.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    type: 'Resident',
    avatar: 'JD',
    color: 'bg-emerald-500'
  },
  {
    id: '5',
    name: 'Sarah Smith (A-105)',
    lastMessage: 'Is the gym open today?',
    time: '2 days ago',
    unread: 0,
    online: true,
    type: 'Resident',
    avatar: 'SS',
    color: 'bg-pink-500'
  }
];

const messages = [
  { id: '1', senderId: '1', text: 'Good morning. There is a visitor at Gate 2 for Block B-402.', time: '10:40 AM', status: 'read' },
  { id: '2', senderId: 'me', text: 'Did they provide an invite code?', time: '10:42 AM', status: 'read' },
  { id: '3', senderId: '1', text: 'Yes, code 8829. Resident has approved via app.', time: '10:44 AM', status: 'delivered' },
  { id: '4', senderId: '1', text: 'Visitor has been logged in.', time: '10:45 AM', status: 'delivered' },
];

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = React.useState(contacts[0]);
  const [messageText, setMessageText] = React.useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    // Logic to send message
    setMessageText('');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6 overflow-hidden">
      {/* Sidebar - Contacts List */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-600 rounded-full text-white shadow-lg shadow-cyan-500/20">
              <MessageSquareText size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Messages</h1>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus size={18} />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9 h-10 bg-card border-border/50" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-hide">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group relative",
                selectedContact.id === contact.id 
                  ? "bg-primary/10 border border-primary/20 shadow-sm" 
                  : "hover:bg-muted/50 border border-transparent"
              )}
            >
              <div className="relative shrink-0">
                <div className={cn("h-11 w-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm", contact.color)}>
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className={cn("font-semibold truncate text-sm", contact.unread > 0 ? "text-foreground" : "text-muted-foreground")}>
                    {contact.name}
                  </h4>
                  <span className="text-[10px] text-muted-foreground shrink-0">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate pr-2">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <Badge className="h-4 min-w-[16px] px-1 bg-primary text-[10px] flex items-center justify-center">
                      {contact.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm", selectedContact.color)}>
              {selectedContact.avatar}
            </div>
            <div>
              <h3 className="font-bold text-sm">{selectedContact.name}</h3>
              <div className="flex items-center gap-1.5">
                <Circle size={8} className={cn("fill-current", selectedContact.online ? "text-success-500" : "text-muted-foreground")} />
                <span className="text-[10px] text-muted-foreground">{selectedContact.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Info size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="flex justify-center">
            <Badge variant="secondary" className="bg-muted/50 text-[10px] uppercase tracking-widest font-bold">Today</Badge>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[80%]",
                msg.senderId === 'me' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl text-sm shadow-sm",
                msg.senderId === 'me' 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-muted text-foreground rounded-tl-none"
              )}>
                {msg.text}
              </div>
              <div className="flex items-center gap-1.5 mt-1 px-1">
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                {msg.senderId === 'me' && (
                  msg.status === 'read' ? <CheckCheck size={12} className="text-info-500" /> : <Check size={12} className="text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border/50 bg-card">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground shrink-0">
              <Paperclip size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="h-11 bg-muted/50 border-transparent focus-visible:ring-primary/20 pr-10"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Smile size={20} />
              </button>
            </div>
            <Button type="submit" size="icon" className="h-11 w-11 shrink-0 shadow-lg shadow-primary/20" disabled={!messageText.trim()}>
              <Send size={20} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
