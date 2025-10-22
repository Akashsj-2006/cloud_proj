import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, HelpCircle, LogOut, Mail, Phone, GraduationCap } from "lucide-react";
import EventCard from "@/components/EventCard";
import HelpRequestForm from "@/components/HelpRequestForm";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("campuslink_current_user") || "null");
    if (!currentUser || currentUser.role !== "student") {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Load events
    const storedEvents = JSON.parse(localStorage.getItem("campuslink_events") || "[]");
    setEvents(storedEvents);

    // Load help requests
    const storedRequests = JSON.parse(localStorage.getItem("campuslink_help_requests") || "[]");
    setHelpRequests(storedRequests.filter((req: any) => req.requesterId === currentUser.id));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("campuslink_current_user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CampusLink</h1>
              <p className="text-sm text-muted-foreground">Student Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.department}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Card */}
        <Card className="border-2 shadow-[var(--shadow-md)]">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {user.name}!</CardTitle>
            <CardDescription>Here's what's happening in your campus community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{events.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg">
                <HelpCircle className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{helpRequests.length}</p>
                  <p className="text-sm text-muted-foreground">Your Requests</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{user.department}</p>
                  <p className="text-sm text-muted-foreground">Your Department</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Upcoming Events
            </h2>
          </div>
          {events.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No events scheduled yet
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* Help Requests Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            Request Help from Departments
          </h2>
          <HelpRequestForm userId={user.id} onSubmit={(request) => {
            const requests = JSON.parse(localStorage.getItem("campuslink_help_requests") || "[]");
            requests.push(request);
            localStorage.setItem("campuslink_help_requests", JSON.stringify(requests));
            setHelpRequests([...helpRequests, request]);
          }} />
        </div>

        {/* My Requests */}
        {helpRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Requests</h2>
            <div className="grid gap-4">
              {helpRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-accent">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{request.subject}</CardTitle>
                        <CardDescription>To: {request.department}</CardDescription>
                      </div>
                      <Badge variant={request.status === "pending" ? "secondary" : "default"}>
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                    <div className="mt-4 flex gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
