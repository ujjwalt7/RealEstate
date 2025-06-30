"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

// --- Zod Schema (matches your DB schema, with reasonable defaults for add) ---
const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["residential", "commercial", "agricultural", "industrial"]),
  status: z.enum(["Available", "Sold", "Under Contract", "Reserved"]),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  dimensions: z.object({ area: z.coerce.number().optional(), length: z.coerce.number().optional(), width: z.coerce.number().optional(), units: z.string().optional() }).optional(),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
  }).optional(),
  price: z.object({ amount: z.coerce.number().optional(), currency: z.string().optional(), breakdown: z.string().optional() }).optional(),
  features: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  documents: z.array(z.any()).optional(),
  contact: z.object({ name: z.string().optional(), phone: z.string().optional(), email: z.string().optional() }).optional(),
  images: z.array(z.string()).optional(),
  nearby_properties: z.array(z.any()).optional(),
  zoning: z.string().optional(),
  soil_type: z.string().optional(),
  road_width: z.coerce.number().optional(),
  facing: z.string().optional(),
  slope: z.string().optional(),
  water_table: z.string().optional(),
  electricity: z.boolean().optional(),
  water_supply: z.boolean().optional(),
  sewage: z.boolean().optional(),
  internet: z.boolean().optional(),
  security: z.boolean().optional(),
  parking_spaces: z.coerce.number().optional(),
  construction_allowed: z.boolean().optional(),
  floor_area_ratio: z.coerce.number().optional(),
  building_height: z.coerce.number().optional(),
  setback: z.object({ front: z.coerce.number().optional(), rear: z.coerce.number().optional(), side: z.coerce.number().optional() }).optional(),
  environmental_factors: z.object({ flood: z.string().optional(), pollution: z.string().optional() }).optional(),
  investment_potential: z.object({ score: z.coerce.number().optional(), notes: z.string().optional() }).optional(),
  legal_status: z.object({ clear: z.boolean().optional(), notes: z.string().optional() }).optional(),
  infrastructure: z.object({ roads: z.string().optional(), transport: z.string().optional() }).optional(),
  future_plans: z.object({ plans: z.string().optional() }).optional(),
  similar_properties: z.array(z.any()).optional(),
  market_data: z.object({ trend: z.string().optional(), price_index: z.coerce.number().optional() }).optional(),
});

const PROPERTY_TYPES = ["residential", "commercial", "agricultural", "industrial"];
const STATUS_OPTIONS = ["Available", "Sold", "Under Contract", "Reserved"];

function showToast(msg, type = "info") {
  // Simple toast system (replace with Shadcn/toast if available)
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = `fixed top-4 right-4 z-[9999] px-4 py-2 rounded shadow text-white ${type === "error" ? "bg-red-600" : type === "success" ? "bg-green-600" : "bg-gray-800"}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

export default function AddPropertyPage() {
  // --- State for OSM search and map preview ---
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mapLoc, setMapLoc] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // --- Form setup ---
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      type: "residential",
      status: "Available",
      description: "",
      highlights: [],
      tags: [],
      dimensions: {},
      location: {},
      price: {},
      features: [],
      amenities: [],
      documents: [],
      contact: {},
      images: [],
      nearby_properties: [],
      zoning: "",
      soil_type: "",
      road_width: undefined,
      facing: "",
      slope: "",
      water_table: "",
      electricity: false,
      water_supply: false,
      sewage: false,
      internet: false,
      security: false,
      parking_spaces: 0,
      construction_allowed: true,
      floor_area_ratio: undefined,
      building_height: undefined,
      setback: {},
      environmental_factors: {},
      investment_potential: {},
      legal_status: {},
      infrastructure: {},
      future_plans: {},
      similar_properties: [],
      market_data: {},
    },
  });

  // --- Field Arrays for tags, highlights, features, amenities ---
  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control, name: "tags" });
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control, name: "highlights" });
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });
  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({ control, name: "amenities" });

  // --- OSM search ---
  const handleLocationSearch = async () => {
    setLoadingLoc(true);
    setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (e) {
      setSuggestions([]);
    }
    setLoadingLoc(false);
  };

  const handleSuggestionSelect = (item) => {
    setValue("location.address", item.display_name);
    setValue("location.city", item.address.city || item.address.town || item.address.village || "");
    setValue("location.state", item.address.state || "");
    setValue("location.pincode", item.address.postcode || "");
    setValue("location.lat", parseFloat(item.lat));
    setValue("location.lng", parseFloat(item.lon));
    setMapLoc({ lat: parseFloat(item.lat), lng: parseFloat(item.lon) });
    setSuggestions([]);
    setSearch(item.display_name);
  };

  // --- Submit handler ---
  const onSubmit = async (values) => {
    setSubmitError("");
    setSubmitSuccess("");
    // Insert property
    const { error } = await supabase.from("properties").insert([{ ...values }]);
    if (error) setSubmitError(error.message);
    else setSubmitSuccess("Property added successfully!");
  };

  // --- Image Upload Handler ---
  const handleImageUpload = async (e) => {
    setUploading(true);
    setUploadProgress(0);
    const files = Array.from(e.target.files);
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("property-images").upload(filePath, file, { upsert: true });
      if (!error) {
        const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(filePath);
        uploaded.push(urlData.publicUrl);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
        showToast(`Uploaded ${file.name}`, "success");
      } else {
        showToast(`Failed to upload ${file.name}`, "error");
      }
    }
    // Update form images array
    const current = getValues("images") || [];
    setValue("images", [...current, ...uploaded]);
    imageInputRef.current.value = "";
    setUploading(false);
    setUploadProgress(0);
  };

  // --- Remove Image Handler ---
  const handleRemoveImage = async (url) => {
    setUploading(true);
    // Extract file path from public URL
    const path = url.split("/property-images/")[1];
    if (path) {
      const { error } = await supabase.storage.from("property-images").remove([path]);
      if (!error) {
        showToast("Image deleted", "success");
        const current = getValues("images") || [];
        setValue("images", current.filter((img) => img !== url));
      } else {
        showToast("Failed to delete image", "error");
      }
    }
    setUploading(false);
  };

  // --- Document Upload Handler ---
  const handleDocUpload = async (e) => {
    setUploading(true);
    setUploadProgress(0);
    const files = Array.from(e.target.files);
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("property-documents").upload(filePath, file, { upsert: true });
      if (!error) {
        const { data: urlData } = supabase.storage.from("property-documents").getPublicUrl(filePath);
        uploaded.push({ name: file.name, url: urlData.publicUrl });
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
        showToast(`Uploaded ${file.name}`, "success");
      } else {
        showToast(`Failed to upload ${file.name}`, "error");
      }
    }
    // Update form documents array
    const current = getValues("documents") || [];
    setValue("documents", [...current, ...uploaded]);
    docInputRef.current.value = "";
    setUploading(false);
    setUploadProgress(0);
  };

  // --- Remove Document Handler ---
  const handleRemoveDoc = async (doc) => {
    setUploading(true);
    // Extract file path from public URL
    const path = doc.url.split("/property-documents/")[1];
    if (path) {
      const { error } = await supabase.storage.from("property-documents").remove([path]);
      if (!error) {
        showToast("Document deleted", "success");
        const current = getValues("documents") || [];
        setValue("documents", current.filter((d) => d.url !== doc.url));
      } else {
        showToast("Failed to delete document", "error");
      }
    }
    setUploading(false);
  };

  // --- UI ---
  const imageInputRef = useRef();
  const docInputRef = useRef();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input {...register("title")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Type</label>
              <select {...register("type")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting}>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select {...register("status")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting}>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea {...register("description")} className="border rounded px-3 py-2 w-full" rows={3} disabled={isSubmitting} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>
        {/* Highlights, Tags */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Highlights & Tags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Highlights</label>
              <div className="flex flex-wrap gap-2">
                {highlightFields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <input {...register(`highlights.${idx}`)} className="border rounded px-2 py-1" />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeHighlight(idx)}>-</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendHighlight("")}>+ Add</Button>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tagFields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <input {...register(`tags.${idx}`)} className="border rounded px-2 py-1" />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeTag(idx)}>-</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendTag("")}>+ Add</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Dimensions */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-medium mb-1">Area (sqft)</label>
              <input type="number" step="0.01" {...register("dimensions.area")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Length</label>
              <input type="number" step="0.01" {...register("dimensions.length")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Width</label>
              <input type="number" step="0.01" {...register("dimensions.width")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Units</label>
              <input {...register("dimensions.units")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Search for address/location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              disabled={isSubmitting}
            />
            <Button type="button" onClick={handleLocationSearch} disabled={loadingLoc || !search}>
              {loadingLoc ? "Searching..." : "Search"}
            </Button>
          </div>
          {suggestions.length > 0 && (
            <div className="bg-gray-50 border rounded p-2 mb-2">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={() => handleSuggestionSelect(item)}
                >
                  {item.display_name}
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input {...register("location.address")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">City</label>
              <input {...register("location.city")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">State</label>
              <input {...register("location.state")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Pincode</label>
              <input {...register("location.pincode")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Latitude</label>
              <Controller
                name="location.lat"
                control={control}
                render={({ field }) => (
                  <input type="number" step="any" {...field} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
                )}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Longitude</label>
              <Controller
                name="location.lng"
                control={control}
                render={({ field }) => (
                  <input type="number" step="any" {...field} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
                )}
              />
            </div>
          </div>
          {mapLoc && (
            <div className="mt-4">
              <iframe
                title="Map Preview"
                width="100%"
                height="250"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLoc.lng-0.01}%2C${mapLoc.lat-0.01}%2C${mapLoc.lng+0.01}%2C${mapLoc.lat+0.01}&layer=mapnik&marker=${mapLoc.lat}%2C${mapLoc.lng}`}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="text-xs text-gray-500 mt-1">Map data &copy; <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors</div>
            </div>
          )}
        </div>
        {/* Price */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Price</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Amount</label>
              <input type="number" step="0.01" {...register("price.amount")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Currency</label>
              <input {...register("price.currency")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Breakdown</label>
              <input {...register("price.breakdown")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
          </div>
        </div>
        {/* Features & Amenities */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Features & Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Features</label>
              <div className="flex flex-wrap gap-2">
                {featureFields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <input {...register(`features.${idx}`)} className="border rounded px-2 py-1" />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeFeature(idx)}>-</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendFeature("")}>+ Add</Button>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityFields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <input {...register(`amenities.${idx}`)} className="border rounded px-2 py-1" />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeAmenity(idx)}>-</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendAmenity("")}>+ Add</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input {...register("contact.name")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input {...register("contact.phone")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input {...register("contact.email")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
          </div>
        </div>
        {/* Images & Documents */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Images & Documents</h2>
          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Property Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imageInputRef}
              onChange={handleImageUpload}
              className="mb-2"
              disabled={isSubmitting || uploading}
            />
            {uploading && uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {(getValues("images") || []).map((url, idx) => (
                <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden group">
                  <img src={url} alt="Property" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                    onClick={() => handleRemoveImage(url)}
                    disabled={uploading || isSubmitting}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Document Upload */}
          <div>
            <label className="block font-medium mb-1">Property Documents</label>
            <input
              type="file"
              multiple
              ref={docInputRef}
              onChange={handleDocUpload}
              className="mb-2"
              disabled={isSubmitting || uploading}
            />
            {uploading && uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded h-2 mb-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            <ul className="list-disc pl-5">
              {(getValues("documents") || []).map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{doc.name || `Document ${idx+1}`}</a>
                  <button
                    type="button"
                    className="text-red-600 hover:underline text-xs"
                    onClick={() => handleRemoveDoc(doc)}
                    disabled={uploading || isSubmitting}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Advanced Details (accordion or sectioned) */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Advanced Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Zoning</label>
              <input {...register("zoning")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Soil Type</label>
              <input {...register("soil_type")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Road Width</label>
              <input type="number" step="0.01" {...register("road_width")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Facing</label>
              <input {...register("facing")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Slope</label>
              <input {...register("slope")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Water Table</label>
              <input {...register("water_table")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("electricity")} />
              <label>Electricity</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("water_supply")} />
              <label>Water Supply</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("sewage")} />
              <label>Sewage</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("internet")} />
              <label>Internet</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("security")} />
              <label>Security</label>
            </div>
            <div>
              <label className="block font-medium mb-1">Parking Spaces</label>
              <input type="number" {...register("parking_spaces")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("construction_allowed")} />
              <label>Construction Allowed</label>
            </div>
            <div>
              <label className="block font-medium mb-1">Floor Area Ratio</label>
              <input type="number" step="0.01" {...register("floor_area_ratio")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block font-medium mb-1">Building Height</label>
              <input type="number" step="0.01" {...register("building_height")} className="border rounded px-3 py-2 w-full" disabled={isSubmitting} />
            </div>
          </div>
          {/* Add more advanced fields as needed, e.g., setback, environmental_factors, etc. */}
        </div>
        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>Add Property</Button>
        </div>
        {submitError && <div className="text-red-500 mt-2">{submitError}</div>}
        {submitSuccess && <div className="text-green-600 mt-2">{submitSuccess}</div>}
      </form>
    </div>
  );
} 