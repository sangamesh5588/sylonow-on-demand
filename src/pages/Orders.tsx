import { useState } from "react";
import { Search, Filter, Package2, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderCard, Order } from "@/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allOrders: Order[] = [
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
  },
  {
    id: "3",
    orderNumber: "SN-2024-003",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 9876543212",
    pickupAddress: "Subway, Commercial Street, Bangalore",
    deliveryAddress: "HSR Layout, Bangalore",
    status: "in-transit",
    estimatedTime: "15 mins",
    distance: "2.8 km",
    items: 1,
    amount: "₹220",
    createdAt: "2024-01-15T12:00:00Z"
  },
  {
    id: "4",
    orderNumber: "SN-2024-004",
    customerName: "Sneha Patel",
    customerPhone: "+91 9876543213",
    pickupAddress: "McDonald's, Forum Mall, Bangalore",
    deliveryAddress: "Indiranagar, Bangalore",
    status: "delivered",
    estimatedTime: "Completed",
    distance: "4.1 km",
    items: 4,
    amount: "₹890",
    createdAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "5",
    orderNumber: "SN-2024-005",
    customerName: "Amit Gupta",
    customerPhone: "+91 9876543214",
    pickupAddress: "KFC, Cunningham Road, Bangalore",
    deliveryAddress: "Jayanagar, Bangalore",
    status: "delivered",
    estimatedTime: "Completed",
    distance: "5.2 km",
    items: 2,
    amount: "₹540",
    createdAt: "2024-01-15T08:30:00Z"
  }
];

const statusTabs = [
  { value: "all", label: "All Orders", icon: Package2 },
  { value: "pending", label: "Pending", icon: AlertCircle },
  { value: "active", label: "Active", icon: Clock },
  { value: "delivered", label: "Delivered", icon: CheckCircle }
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(allOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filterOrders = (status?: string) => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (status && status !== "all") {
      if (status === "active") {
        filtered = filtered.filter(order => 
          order.status === "picked-up" || order.status === "in-transit"
        );
      } else {
        filtered = filtered.filter(order => order.status === status);
      }
    }

    return filtered;
  };

  const getOrderCounts = () => {
    const all = orders.length;
    const pending = orders.filter(o => o.status === "pending").length;
    const active = orders.filter(o => o.status === "picked-up" || o.status === "in-transit").length;
    const delivered = orders.filter(o => o.status === "delivered").length;
    
    return { all, pending, active, delivered };
  };

  const counts = getOrderCounts();

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">
          Manage all your delivery orders in one place
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search orders, customers, or addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border"
          />
        </div>
        <Button variant="outline" className="border-border hover:bg-muted">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30 border border-border">
          {statusTabs.map((tab) => {
            const count = tab.value === "all" ? counts.all :
                         tab.value === "pending" ? counts.pending :
                         tab.value === "active" ? counts.active :
                         counts.delivered;
            
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
                <Badge variant="secondary" className="ml-2 bg-background/50">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {statusTabs.map((tab) => {
          const filteredOrders = filterOrders(tab.value);
          
          return (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
              {filteredOrders.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No orders found
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No orders match "${searchQuery}"`
                      : `No ${tab.label.toLowerCase()} orders at the moment`
                    }
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}