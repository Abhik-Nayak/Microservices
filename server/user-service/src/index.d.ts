// src/types/express/index.d.ts
// import {User} from "./models/user";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      // user?: User; // optional if you attach full user info
    }
  }
}
