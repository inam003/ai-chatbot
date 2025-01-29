import { Card, CardContent } from "@/components/ui/card";

export default function ChatCard({ name, message }) {
  return (
    <Card className="h-full cursor-pointer">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-sm font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
