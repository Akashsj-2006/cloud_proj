import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, Users, HelpCircle, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("campuslink_current_user") || "null");
    if (currentUser) {
      navigate(currentUser.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              CampusLink
            </h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="accent" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center py-20 space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Connect Your
              <span className="block bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                Campus Community
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A unified platform for students and administrators to share events, collaborate across departments, and stay connected.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/signup")} className="gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-card transition-all duration-300 hover:shadow-[var(--shadow-md)]">
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Event Management</h3>
              <p className="text-muted-foreground">
                Create, share, and discover campus events. Keep everyone informed about what's happening.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-card transition-all duration-300 hover:shadow-[var(--shadow-md)]">
              <div className="inline-flex p-4 bg-accent/10 rounded-2xl">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Department Support</h3>
              <p className="text-muted-foreground">
                Request help from any department. Connect via email or phone instantly.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-card transition-all duration-300 hover:shadow-[var(--shadow-md)]">
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Collaboration</h3>
              <p className="text-muted-foreground">
                Bridge departments and students. Foster a connected campus community.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto py-20">
          <div className="bg-gradient-to-br from-primary to-primary-glow rounded-3xl p-12 text-center text-primary-foreground shadow-[var(--shadow-lg)]">
            <h3 className="text-3xl font-bold mb-4">Ready to connect your campus?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join CampusLink today and experience seamless campus communication.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="gap-2"
            >
              Create Your Account
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 CampusLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
