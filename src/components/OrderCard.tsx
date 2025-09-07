import { Clock, MapPin, Phone, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: "pending" | "picked-up" | "in-transit" | "delivered";
  estimatedTime: string;
  distance: string;
  items: number;
  amount: string;
  createdAt: string;
}

interface OrderCardProps {
  order: Order;
  onStatusUpdate?: (orderId: string, newStatus: Order["status"]) => void;
}

const statusConfig = {
  "pending": {
    label: "Pending Pickup",
    className: "status-pending",
    action: "Mark as Picked Up",
    nextStatus: "picked-up" as const
  },
  "picked-up": {
    label: "Picked Up",
    className: "status-picked-up", 
    action: "Start Delivery",
    nextStatus: "in-transit" as const
  },
  "in-transit": {
    label: "In Transit",
    className: "status-in-transit",
    action: "Mark as Delivered",
    nextStatus: "delivered" as const
  },
  "delivered": {
    label: "Delivered", 
    className: "status-delivered",
    action: "Completed",
    nextStatus: "delivered" as const
  }
};

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const config = statusConfig[order.status];

  const handleStatusUpdate = () => {
    if (onStatusUpdate && config.nextStatus !== order.status) {
      onStatusUpdate(order.id, config.nextStatus);
    }
  };

  return (
    <div className="order-card animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-heading font-semibold text-foreground">#{order.orderNumber}</h3>
            <Badge className={cn(config.className)}>
              {config.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-lg text-foreground">{order.amount}</p>
          <p className="text-xs text-muted-foreground">{order.items} items</p>
        </div>
      </div>

      {/* Addresses */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Package className="w-3 h-3 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-secondary mb-1">PICKUP</p>
            <p className="text-sm text-foreground truncate">{order.pickupAddress}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-3 h-3 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary mb-1">DELIVERY</p>
            <p className="text-sm text-foreground truncate">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{order.estimatedTime}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {order.distance}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary-foreground hover:bg-primary"
        >
          <Phone className="w-4 h-4 mr-1" />
          Call
        </Button>
      </div>

      {/* Action Button */}
      {order.status !== "delivered" && (
        <Button 
          onClick={handleStatusUpdate}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {config.action}
        </Button>
      )}
    </div>
  );
}