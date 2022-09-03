import { useQuery } from "@tanstack/react-query";
import { fetchapi } from "../components/utility/fetchapi";
import { config } from "../config";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("Authorization", localStorage.getItem("token") || "");
