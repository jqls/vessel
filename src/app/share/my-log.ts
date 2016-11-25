import {environment} from "../../environments/environment";

export function mylog(location: string, func: string, message: string): void {
  console.log(location + "-" + func + ": " + message);
}
export function mydebug(location: string, func: string, message: string): void {
  if (environment.isDebug)
    console.debug(location + "-" + func + ": " + message);
}
export function myerror(location: string, func: string, message: string): void {
  console.error(location + "-" + func + ": " + message);
}
export function myinfo(location: string, func: string, message: string): void {
  console.info(location + "-" + func + ": " + message);
}
