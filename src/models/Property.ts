import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: {
    type:String, required: true,
    enum:["Point"],
    default:"Point"
  },
  coordinates:{
    type:[Number],
    required:true,
  }
  },
  category: {
    type: String,
    enum: [
      "apartment",
      "house",
      "commercial",
      "land",
      "industrial",
      "farmhouse",
      "villa",
      "office",
      "shop",
      "warehouse",
      "factory",
      "plot",
      "residential",
      "retail",
      "mixed-use",
      "hospitality",
      "hospital",
      "school",
      "university",
      "college",
      "hotel",
      "mansion",
      "penthouse",
      "studio",
      "duplex",
      "triplex",
      "townhouse",
    ],
    required: true,
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  amenities: { type: [String], required: true },
  owner: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false },
  },

  status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available",
  },
  featured: { type: Boolean, default: false },
  images: { type: [String], required: true },
  address:{
    city:{type:String,
    required:true,},
    state:{type:String,required:true},
    country:{type:String,required:true},
    postalCode:{type:String,required:true}
  },
  slug:{
    type:String,
    required:true,
    unique:true,
  }

},{
  timestamps:true
});

propertySchema.index({ title: "text", description: "text" });
propertySchema.index({ location: "2dsphere" });
propertySchema.index({price:1});
propertySchema.index({bedrooms:1});
propertySchema.index({bathrooms:1});
propertySchema.index({area:1});
propertySchema.index({createdAt:-1});
const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
export default Property;
