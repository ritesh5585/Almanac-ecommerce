import type Admin from "../models/admin.js";

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof Admin>;
    }
  }
}