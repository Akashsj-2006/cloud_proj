import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface HelpRequestFormProps {
  userId: string;
  onSubmit: (request: any) => void;
}

const HelpRequestForm = ({ userId, onSubmit }: HelpRequestFormProps) => {
  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      id: Date.now().toString(),
      requesterId: userId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    onSubmit(newRequest);
    toast({
      title: "Request submitted!",
      description: "The department will contact you soon.",
    });
    setFormData({
      subject: "",
      department: "",
      message: "",
    });
  };

  return (
    <Card className="border-2 shadow-[var(--shadow-md)]">
      <CardHeader>
        <CardTitle>Submit a Help Request</CardTitle>
        <CardDescription>
          Need assistance from another department? Fill out the form below and they'll contact you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Need help with..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Target Department</Label>
            <Input
              id="department"
              placeholder="e.g., IT Support, Admissions"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your request in detail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" variant="accent">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HelpRequestForm;
