import { useState } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Star, 
  Camera, 
  Edit, 
  Save,
  Truck,
  Award,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DeliveryPartnerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
  rating: number;
  totalDeliveries: number;
  joinedDate: string;
  earnings: {
    today: string;
    thisWeek: string;
    thisMonth: string;
  };
  badges: string[];
}

const mockProfile: DeliveryPartnerProfile = {
  id: "DP001",
  name: "Rahul Sharma",
  phone: "+91 9876543210",
  email: "rahul.sharma@sylonow.com",
  address: "HSR Layout, Bangalore, Karnataka 560102",
  vehicleType: "Motorcycle",
  vehicleNumber: "KA 05 AB 1234",
  licenseNumber: "DL1420110012345",
  rating: 4.8,
  totalDeliveries: 1247,
  joinedDate: "2023-06-15",
  earnings: {
    today: "₹1,240",
    thisWeek: "₹8,750",
    thisMonth: "₹32,400"
  },
  badges: ["Top Performer", "Fast Delivery", "Customer Favorite"]
};

export default function Profile() {
  const [profile, setProfile] = useState<DeliveryPartnerProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: keyof DeliveryPartnerProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your delivery partner profile and settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-heading">Personal Information</CardTitle>
                <CardDescription>Update your personal details and vehicle information</CardDescription>
              </div>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing ? "bg-gradient-primary" : ""}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" alt={profile.name} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-delivery text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {profile.name}
                  </h3>
                  <p className="text-muted-foreground">Delivery Partner ID: {profile.id}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-medium text-foreground">{profile.rating}</span>
                    <span className="text-muted-foreground">({profile.totalDeliveries} deliveries)</span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Input
                    id="vehicleType"
                    value={profile.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input
                    id="vehicleNumber"
                    value={profile.vehicleNumber}
                    onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    className="bg-muted/30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Earnings Card */}
          <Card className="bg-glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Earnings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today</span>
                  <span className="font-semibold text-foreground">{profile.earnings.today}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-semibold text-foreground">{profile.earnings.thisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-semibold text-foreground">{profile.earnings.thisMonth}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{profile.totalDeliveries}</div>
                <p className="text-sm text-muted-foreground">Total Deliveries</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Badges Card */}
          <Card className="bg-glass border-border/50">
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    className="w-full justify-center py-2 bg-primary/20 text-primary border-primary/30"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}