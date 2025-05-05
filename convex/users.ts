import {mutation} from "./_generated/server";
import {v} from "convex/values";


export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string())
  },
  handler: async (context, args) => {

    const existingUser = await context.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if(existingUser) return;

    return await context.db.insert("users", args)
  }
});

export const updateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (context, args) => {
    const existingUser = await context.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingUser) return;

    return await context.db.patch(existingUser._id, args);
  },
});