"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  rentPrice: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  description?: string;
}

// Sample data
const initialProperties: Property[] = [
  {
    id: "1",
    name: "Sunny Apartment",
    address: "ul. Marszałkowska 123",
    city: "Warsaw",
    rentPrice: 3500,
    size: 65,
    bedrooms: 2,
    bathrooms: 1,
    description: "Beautiful apartment in the city center",
  },
  {
    id: "2",
    name: "Cozy Studio",
    address: "ul. Floriańska 45",
    city: "Kraków",
    rentPrice: 2200,
    size: 35,
    bedrooms: 1,
    bathrooms: 1,
    description: "Perfect for students or young professionals",
  },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    name: "",
    address: "",
    city: "",
    rentPrice: 0,
    size: 0,
    bedrooms: 1,
    bathrooms: 1,
    description: "",
  });

  const handleAdd = () => {
    setEditingProperty(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      rentPrice: 0,
      size: 0,
      bedrooms: 1,
      bathrooms: 1,
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      // Update existing property
      setProperties(
        properties.map((p) =>
          p.id === editingProperty.id
            ? ({ ...formData, id: p.id } as Property)
            : p,
        ),
      );
    } else {
      // Add new property
      const newProperty: Property = {
        ...formData,
        id: Date.now().toString(),
      } as Property;
      setProperties([...properties, newProperty]);
    }
    setIsDialogOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground mt-1">
              Manage your rental properties
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingProperty ? "Edit Property" : "Add New Property"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProperty
                      ? "Update the property details below"
                      : "Fill in the details for the new property"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Property Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Sunny Apartment"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g., ul. Marszałkowska 123"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Warsaw"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="rentPrice">Rent Price (zł)</Label>
                      <Input
                        id="rentPrice"
                        name="rentPrice"
                        type="number"
                        value={formData.rentPrice}
                        onChange={handleInputChange}
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="size">Size (m²)</Label>
                      <Input
                        id="size"
                        name="size"
                        type="number"
                        value={formData.size}
                        onChange={handleInputChange}
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Additional details about the property..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProperty ? "Update" : "Add"} Property
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Properties
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Monthly Revenue
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties
                  .reduce((sum, p) => sum + p.rentPrice, 0)
                  .toLocaleString("pl-PL")}{" "}
                zł
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rent
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties.length > 0
                  ? Math.round(
                      properties.reduce((sum, p) => sum + p.rentPrice, 0) /
                        properties.length,
                    ).toLocaleString("pl-PL")
                  : 0}{" "}
                zł
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                All Properties
              </h2>
              <p className="text-muted-foreground">
                A list of all your rental properties
              </p>
            </div>
          </div>

          {properties.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No properties yet</h3>
                <p className="text-muted-foreground mt-2">
                  Get started by adding your first property
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Card key={property.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">
                          {property.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <MapPin className="h-3 w-3" />
                          {property.address}, {property.city}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Maximize className="h-4 w-4 text-muted-foreground" />
                            <span>{property.size} m²</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4 text-muted-foreground" />
                            <span>{property.bathrooms}</span>
                          </div>
                        </div>
                      </div>
                      {property.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {property.description}
                        </p>
                      )}
                      <div className="pt-2 border-t">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">
                            {property.rentPrice.toLocaleString("pl-PL")}
                          </span>
                          <span className="text-muted-foreground">
                            zł / month
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(property)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
