import { JwtPayload } from 'jsonwebtoken';
import User from "../database/model/User";

declare global {
     namespace Express {
         interface Request {
               currentUser?: User
               newAccessToken?: string
               decodedAccessToken?: JwtPayload
         }
     }
 }