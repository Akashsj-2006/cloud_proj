import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, HelpCircle, LogOut, Plus, GraduationCap, Mail, Phone } from "lucide-react";
import EventCard from "@/components/EventCard";
import CreateEventForm from "@/components/CreateEventForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("campuslink_current_user") || "null");
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Load data
    const storedEvents = JSON.parse(localStorage.getItem("campuslink_events") || "[]");
    setEvents(storedEvents);

    const storedRequests = JSON.parse(localStorage.getItem("campuslink_help_requests") || "[]");
    setHelpRequests(storedRequests);

    const storedUsers = JSON.parse(localStorage.getItem("campuslink_users") || "[]");
    setUsers(storedUsers.filter((u: any) => u.role === "student"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("campuslink_current_user");
    navigate("/login");
  };

  const handleCreateEvent = (event: any) => {
    const newEvents = [...events, event];
    localStorage.setItem("campuslink_events", JSON.stringify(newEvents));
    setEvents(newEvents);
    setIsCreateEventOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    const newEvents = events.filter(e => e.id !== eventId);
    localStorage.setItem("campuslink_events", JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const getRequesterInfo = (requesterId: string) => {
    return users.find(u => u.id === requesterId);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-accent to-accent-glow rounded-lg">
              <GraduationCap className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CampusLink</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <Badge variant="default">Admin</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 shadow-[var(--shadow-md)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">Active campus events</p>
            </CardContent>
          </Card>
          <Card className="border-2 shadow-[var(--shadow-md)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Help Requests</CardTitle>
              <HelpCircle className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{helpRequests.length}</div>
              <p className="text-xs text-muted-foreground">Pending student requests</p>
            </CardContent>
          </Card>
          <Card className="border-2 shadow-[var(--shadow-md)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Events Management
            </h2>
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button variant="accent" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <CreateEventForm onSubmit={handleCreateEvent} creatorId={user.id} />
              </DialogContent>
            </Dialog>
          </div>
          {events.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No events created yet. Click "Create Event" to get started!
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onDelete={() => handleDeleteEvent(event.id)}
                  isAdmin
                />
              ))}
            </div>
          )}
        </div>

        {/* Help Requests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            Student Help Requests
          </h2>
          {helpRequests.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No help requests at the moment
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {helpRequests.map((request) => {
                const requester = getRequesterInfo(request.requesterId);
                return (
                  <Card key={request.id} className="border-l-4 border-l-accent shadow-[var(--shadow-sm)]">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.subject}</CardTitle>
                          <CardDescription>
                            From: {requester?.name || "Unknown"} • Department: {request.department}
                          </CardDescription>
                        </div>
                        <Badge variant={request.status === "pending" ? "secondary" : "default"}>
                          {request.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{request.message}</p>
                      {requester && (
                        <div className="flex flex-wrap gap-4 text-sm">
                          <a href={`mailto:${requester.email}`} className="flex items-center gap-1 text-accent hover:underline">
                            <Mail className="w-4 h-4" />
                            {requester.email}
                          </a>
                          <a href={`tel:${requester.phone}`} className="flex items-center gap-1 text-accent hover:underline">
                            <Phone className="w-4 h-4" />
                            {requester.phone}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
