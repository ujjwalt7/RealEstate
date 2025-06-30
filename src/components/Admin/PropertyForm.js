"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  price: z.coerce.number().min(0, "Price is required"),
  location: z.object({
    locality: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().optional(),
  }),
});

const PROPERTY_TYPES = ["apartment", "house", "plot", "villa", "commercial"];
const STATUS_OPTIONS = ["active", "inactive", "deleted"];

export default function PropertyForm({ open, onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      type: "apartment",
      status: "active",
      price: 0,
      location: { locality: "", city: "", state: "", pincode: "" },
    },
  });

  useEffect(() => {
    if (open) {
      reset(initialData || {
        title: "",
        description: "",
        type: "apartment",
        status: "active",
        price: 0,
        location: { locality: "", city: "", state: "", pincode: "" },
      });
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Property" : "Add Property"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input {...register("title")}
              className="border rounded px-3 py-2 w-full"
              disabled={isSubmitting}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea {...register("description")}
              className="border rounded px-3 py-2 w-full"
              rows={3}
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Type</label>
              <select {...register("type")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Status</label>
              <select {...register("status")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Price (INR)</label>
            <input type="number" step="0.01" {...register("price")}
              className="border rounded px-3 py-2 w-full"
              disabled={isSubmitting}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium mb-1">Locality</label>
              <input {...register("location.locality")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">City</label>
              <input {...register("location.city")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              />
              {errors.location?.city && <p className="text-red-500 text-xs mt-1">{errors.location.city.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">State</label>
              <input {...register("location.state")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              />
              {errors.location?.state && <p className="text-red-500 text-xs mt-1">{errors.location.state.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Pincode</label>
              <input {...register("location.pincode")}
                className="border rounded px-3 py-2 w-full"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? "Update Property" : "Add Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 