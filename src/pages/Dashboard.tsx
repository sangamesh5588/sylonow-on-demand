import { useState } from "react";
import { Package, Clock, CheckCircle, DollarSign, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard, Order } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "SN-2024-001",
    customerName: "John Smith",
    customerPhone: "+91 9876543210",
    pickupAddress: "Pizza Palace, MG Road, Bangalore",
    deliveryAddress: "Apartment 3B, Koramangala 4th Block, Bangalore",
    status: "pending",
    estimatedTime: "25 mins",
    distance: "3.2 km",
    items: 2,
    amount: "₹380",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    orderNumber: "SN-2024-002",
    customerName: "Priya Sharma",
    customerPhone: "+91 9876543211",
    pickupAddress: "Burger King, Brigade Road, Bangalore",
    deliveryAddress: "Tech Park, Whitefield, Bangalore",
    status: "picked-up",
    estimatedTime: "35 mins",
    distance: "8.5 km", 
    items: 3,
    amount: "₹650",
    createdAt: "2024-01-15T11:00:00Z"
  }
];

const stats = [
  {
    title: "Today's Orders",
    value: "12",
    description: "+2 from yesterday",
    icon: Package,
    trend: "+16.7%"
  },
  {
    title: "Total Earnings",
    value: "₹2,340",
    description: "This week",
    icon: DollarSign,
    trend: "+12.3%"
  },
  {
    title: "Completed",
    value: "8",
    description: "Orders delivered",
    icon: CheckCircle,
    trend: "100%"
  },
  {
    title: "Avg Delivery Time",
    value: "28 mins",
    description: "Target: 30 mins",
    icon: Clock,
    trend: "-6.7%"
  }
];

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const activeOrders = orders.filter(order => order.status !== "delivered");

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Good Morning! 👋
        </h1>
        <p className="text-muted-foreground">
          You have {activeOrders.length} active deliveries today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-muted-foreground">{stat.description}</span>
                <span className={`font-medium ${
                  stat.trend.startsWith('+') ? 'text-success' : 
                  stat.trend.startsWith('-') && stat.title === 'Avg Delivery Time' ? 'text-success' :
                  'text-destructive'
                }`}>
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-gradient-primary hover:opacity-90">
          <MapPin className="w-4 h-4 mr-2" />
          Go Online
        </Button>
        <Button variant="outline" className="border-border hover:bg-muted">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Active Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Active Orders
          </h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
            View All
          </Button>
        </div>

        {activeOrders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-glass border-border/50 p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              No Active Orders
            </h3>
            <p className="text-muted-foreground">
              You're all caught up! New orders will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}