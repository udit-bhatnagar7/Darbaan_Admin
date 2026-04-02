import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  TrendingUp, 
  Award, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Building2, 
  UserCheck, 
  ChevronRight, 
  Download, 
  Share2, 
  ExternalLink, 
  Copy, 
  Eye, 
  Trash2, 
  Edit2, 
  Save, 
  Undo, 
  Redo, 
  Maximize2, 
  Minimize2, 
  LayoutGrid, 
  List, 
  Kanban, 
  GripVertical, 
  MessageSquare, 
  PieChart, 
  BarChart3, 
  Activity, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  Sun, 
  Moon, 
  Monitor, 
  Laptop, 
  Tablet, 
  Phone, 
  Plus, 
  Ban, 
  Check, 
  X, 
  Smartphone, 
  User, 
  Building, 
  Map, 
  Hash, 
  MapPin, 
  Tag, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  HelpCircle, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Receipt, 
  FileText, 
  Files, 
  Folder, 
  FolderPlus, 
  Image, 
  Video, 
  Music, 
  Mic, 
  Camera, 
  Navigation, 
  Compass, 
  Flag, 
  Bookmark, 
  Link, 
  Link2, 
  Paperclip, 
  Send, 
  Inbox, 
  Archive, 
  Trash, 
  Lock, 
  Unlock, 
  EyeOff, 
  UserMinus, 
  UserX, 
  Settings2, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  CheckSquare, 
  Square, 
  Circle, 
  Play, 
  Pause, 
  StopCircle, 
  FastForward, 
  Rewind, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  Battery, 
  BatteryCharging, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Thermometer, 
  Droplets, 
  Umbrella, 
  Flame, 
  Zap, 
  History, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ChevronsUp, 
  ChevronsDown, 
  ChevronsLeft, 
  ChevronsRight, 
  Move, 
  Maximize, 
  Minimize, 
  ZoomIn, 
  ZoomOut, 
  Layout, 
  Columns, 
  Rows, 
  Grid, 
  Sidebar, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  AppWindow, 
  MousePointer2, 
  Hand, 
  Fingerprint, 
  Shield, 
  ShieldAlert, 
  ShieldOff, 
  Bug, 
  LifeBuoy, 
  Smile, 
  Frown, 
  Meh, 
  Ghost, 
  Skull, 
  Lightbulb, 
  Palette, 
  Brush, 
  Eraser, 
  Pencil, 
  PenTool, 
  Scissors, 
  Sticker, 
  Shapes, 
  Component, 
  Box, 
  Layers, 
  Dribbble, 
  Github, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Slack, 
  Figma, 
  Chrome, 
  Framer, 
  Twitch, 
  Trello, 
  Cast, 
  Airplay, 
  Nfc, 
  Rss, 
  Radio, 
  Tv, 
  Headphones, 
  Speaker, 
  Projector, 
  Printer, 
  Mouse, 
  Keyboard, 
  Joystick, 
  Gamepad2, 
  Disc, 
  Usb, 
  Power, 
  Plug, 
  Microchip, 
  CircuitBoard, 
  Binary, 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest, 
  Webhook, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Ship, 
  Anchor, 
  Sunrise, 
  Sunset, 
  Mountain, 
  Waves, 
  Trees, 
  Flower2, 
  Leaf, 
  Bird, 
  Cat, 
  Dog, 
  Fish, 
  Rabbit, 
  Turtle, 
  Snail, 
  Worm, 
  Shell, 
  Bone, 
  PawPrint, 
  Footprints, 
  Brain, 
  HeartPulse, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Bandage, 
  Microscope, 
  Dna, 
  TestTube2, 
  FlaskConical, 
  Atom, 
  Orbit, 
  Telescope, 
  Satellite, 
  Space, 
  Gem, 
  Crown, 
  PartyPopper, 
  Cake, 
  IceCream, 
  Pizza, 
  Beer, 
  Wine, 
  GlassWater, 
  ChefHat, 
  Coins, 
  Warehouse, 
  Factory, 
  School, 
  University, 
  Church, 
  Hotel, 
  Hospital, 
  Store, 
  ShoppingBasket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';

export default function ReferralPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    societyName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    city: '',
    referrerName: '',
    referrerPhone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Refer & Earn ₹5,000</h1>
          <p className="mt-4 text-lg text-slate-600">
            Help societies modernize their management and get rewarded for every successful referral.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">For Societies</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    Modern tools for billing, security, and communication.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">For You</h3>
                  </div>
                  <p className="text-sm text-purple-700">
                    Earn ₹5,000 for every society that joins our platform.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">How it works:</h3>
                <div className="space-y-3">
                  {[
                    { icon: Share2, text: 'Share society details with us' },
                    { icon: Phone, text: 'Our team connects with the society' },
                    { icon: CheckCircle2, text: 'Get rewarded once they go live' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-600">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full h-12 text-lg" onClick={() => setStep(2)}>
                Start Referring
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Society Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Society Name</label>
                    <Input 
                      required
                      placeholder="e.g. Emerald Heights"
                      value={formData.societyName}
                      onChange={e => setFormData({...formData, societyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input 
                      required
                      placeholder="e.g. Gurgaon"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input 
                      required
                      placeholder="Name of Secretary/President"
                      value={formData.contactName}
                      onChange={e => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Phone</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-slate-900">Your Details (for Reward)</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input 
                      required
                      placeholder="Full Name"
                      value={formData.referrerName}
                      onChange={e => setFormData({...formData, referrerName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Phone</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="For reward updates"
                      value={formData.referrerPhone}
                      onChange={e => setFormData({...formData, referrerPhone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-[2] h-12">
                  Submit Referral
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Referral Submitted!</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Thank you for referring {formData.societyName}. Our team will reach out to them soon. We'll keep you updated on your reward status.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">Next Steps:</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    Our representative will call the society within 24 hours.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    You'll receive a confirmation SMS once the lead is verified.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    Reward will be processed after the society completes onboarding.
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="w-full h-12" onClick={() => {
                setStep(1);
                setFormData({
                  societyName: '',
                  contactName: '',
                  contactPhone: '',
                  contactEmail: '',
                  city: '',
                  referrerName: '',
                  referrerPhone: ''
                });
              }}>
                Refer Another Society
              </Button>
            </motion.div>
          )}
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Have questions? Contact our referral support at <span className="font-semibold">support@societypro.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
