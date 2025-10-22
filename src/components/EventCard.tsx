import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trash2 } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    department: string;
  };
  onDelete?: () => void;
  isAdmin?: boolean;
}

const EventCard = ({ event, onDelete, isAdmin }: EventCardProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-md)] transition-all duration-300 border-2 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge className="mb-2">{event.department}</Badge>
          {isAdmin && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          )}
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-accent" />
          {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          {event.location}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
