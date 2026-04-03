import React from 'react';
import { 
  Palmtree, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Info,
  Users,
  Dumbbell,
  Waves,
  Music,
  Trophy,
  Search,
  Filter
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const amenities = [
  { id: 'gym', name: 'Elite Fitness Gym', icon: Dumbbell, color: 'text-blue-500 bg-blue-50', price: 'Free', capacity: 15 },
  { id: 'pool', name: 'Infinity Pool', icon: Waves, color: 'text-cyan-500 bg-cyan-50', price: '₹100/hr', capacity: 20 },
  { id: 'club', name: 'Grand Clubhouse', icon: Music, color: 'text-purple-500 bg-purple-50', price: '₹500/hr', capacity: 50 },
  { id: 'tennis', name: 'Tennis Court', icon: Trophy, color: 'text-emerald-500 bg-emerald-50', price: '₹200/hr', capacity: 4 }
];

const timeSlots = [
  { time: '06:00 AM', status: 'available' },
  { time: '07:00 AM', status: 'booked' },
  { time: '08:00 AM', status: 'available' },
  { time: '09:00 AM', status: 'available' },
  { time: '10:00 AM', status: 'booked' },
  { time: '11:00 AM', status: 'available' },
  { time: '12:00 PM', status: 'available' },
  { time: '01:00 PM', status: 'available' },
  { time: '02:00 PM', status: 'booked' },
  { time: '03:00 PM', status: 'available' },
  { time: '04:00 PM', status: 'available' },
  { time: '05:00 PM', status: 'available' },
  { time: '06:00 PM', status: 'booked' },
  { time: '07:00 PM', status: 'available' },
  { time: '08:00 PM', status: 'available' },
  { time: '09:00 PM', status: 'available' }
];

export default function BookingsPage() {
  const [selectedAmenity, setSelectedAmenity] = React.useState(amenities[0]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);
  const [isBooking, setIsBooking] = React.useState(false);
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false);

  const toggleSlot = (time: string) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(prev => prev.filter(s => s !== time));
    } else {
      setSelectedSlots(prev => [...prev, time]);
    }
  };

  const handleConfirmBooking = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingConfirmed(true);
    }, 1500);
  };

  if (bookingConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground max-w-md">
            Your slot for <span className="font-bold text-foreground">{selectedAmenity.name}</span> on {selectedDate.toLocaleDateString()} at {selectedSlots.join(', ')} has been successfully booked.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setBookingConfirmed(false)}>View My Bookings</Button>
          <Button onClick={() => {
            setBookingConfirmed(false);
            setSelectedSlots([]);
          }}>Book Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
            <Palmtree size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Amenity Bookings</h1>
            <p className="text-muted-foreground mt-1">Book society facilities and track availability.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Clock className="mr-2 h-4 w-4" />
            My Bookings
          </Button>
          <Button size="sm" className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Info className="mr-2 h-4 w-4" />
            Booking Rules
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: Amenity Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              Select Amenity
            </h3>
            <div className="grid gap-3">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => setSelectedAmenity(amenity)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group",
                    selectedAmenity.id === amenity.id 
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm" 
                      : "border-transparent bg-card hover:border-border"
                  )}
                >
                  <div className={cn("p-3 rounded-lg shrink-0", amenity.color)}>
                    <amenity.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{amenity.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users size={12} />
                        Max {amenity.capacity}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {amenity.price}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedAmenity.id === amenity.id ? "border-emerald-500 bg-emerald-500" : "border-muted"
                  )}>
                    {selectedAmenity.id === amenity.id && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Card className="p-5 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
            <div className="flex gap-3">
              <Info className="text-blue-500 shrink-0" size={20} />
              <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                Bookings can be made up to 7 days in advance. Cancellations must be done at least 2 hours prior to the slot.
              </p>
            </div>
          </Card>
        </div>

        {/* Right: Calendar & Slots */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg", selectedAmenity.color)}>
                  <selectedAmenity.icon size={20} />
                </div>
                <h3 className="text-xl font-bold">{selectedAmenity.name} Availability</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-bold px-2">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Date Selection (Mini Calendar) */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {[...Array(7)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const isSelected = date.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border-2 transition-all shrink-0",
                      isSelected 
                        ? "border-emerald-500 bg-emerald-500 text-white shadow-md" 
                        : "border-border bg-card hover:border-emerald-200"
                    )}
                  >
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", isSelected ? "text-emerald-100" : "text-muted-foreground")}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-xl font-bold">{date.getDate()}</span>
                  </button>
                );
              })}
            </div>

            {/* Time Slots Grid */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock size={18} className="text-muted-foreground" />
                  Available Time Slots
                </h4>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-border" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Selected</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((slot) => {
                  const isBooked = slot.status === 'booked';
                  const isSelected = selectedSlots.includes(slot.time);
                  return (
                    <button
                      key={slot.time}
                      disabled={isBooked}
                      onClick={() => toggleSlot(slot.time)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-sm font-medium transition-all text-center relative",
                        isBooked 
                          ? "bg-muted/50 border-transparent text-muted-foreground cursor-not-allowed" 
                          : isSelected
                            ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                            : "border-border bg-card hover:border-emerald-200"
                      )}
                    >
                      {slot.time}
                      {isBooked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-xl">
                          <Badge variant="outline" className="text-[8px] h-4 bg-white/80 dark:bg-black/50">BOOKED</Badge>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary & Action */}
            <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Duration</p>
                  <p className="text-lg font-bold">{selectedSlots.length} Hours</p>
                </div>
                <div className="h-8 w-[1px] bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Amount</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedAmenity.price === 'Free' ? 'Free' : `₹${selectedSlots.length * parseInt(selectedAmenity.price.replace(/\D/g, ''))}`}
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8"
                disabled={selectedSlots.length === 0 || isBooking}
                onClick={handleConfirmBooking}
              >
                {isBooking ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard size={18} />
                    Confirm & Book Now
                  </span>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
