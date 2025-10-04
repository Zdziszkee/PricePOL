"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ThemeSelector } from "@/components/theme-selector";
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+48 123 456 789",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    rentReminders: true,
    maintenanceAlerts: true,
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save profile
    alert("Profile saved successfully!");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Color Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>
              <ThemeSelector />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Manage how you receive notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={() =>
                  handleNotificationToggle("emailNotifications")
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications in your browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.pushNotifications}
                onCheckedChange={() =>
                  handleNotificationToggle("pushNotifications")
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="rent-reminders">Rent Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders for upcoming rent payments
                </p>
              </div>
              <Switch
                id="rent-reminders"
                checked={notifications.rentReminders}
                onCheckedChange={() =>
                  handleNotificationToggle("rentReminders")
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for property maintenance issues
                </p>
              </div>
              <Switch
                id="maintenance-alerts"
                checked={notifications.maintenanceAlerts}
                onCheckedChange={() =>
                  handleNotificationToggle("maintenanceAlerts")
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline" className="w-full sm:w-auto">
                Enable 2FA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Data Management</CardTitle>
            </div>
            <CardDescription>Export or delete your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Export Data</Label>
              <p className="text-sm text-muted-foreground">
                Download a copy of your property and financial data
              </p>
              <Button variant="outline" className="w-full sm:w-auto">
                Export All Data
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-destructive">Danger Zone</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete your account? This action cannot be undone.",
                    )
                  ) {
                    alert("Account deletion requested");
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
