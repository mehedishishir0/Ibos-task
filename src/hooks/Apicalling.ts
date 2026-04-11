import { logout } from "@/lib/auth";
import { createQuze, getAllQuze, getSingelQuze, updateQuze } from "@/lib/quze";
import { CreateQuzePayload } from "@/types/quzeDataType";
import { ApiResponse, SingelApiResponse } from "@/types/quzeGetDataType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateQuze(token: string, onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: (data: CreateQuzePayload) => createQuze(token, data),

    onSuccess: (data) => {
      toast.success(data.message || "Post created successfully!");

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Post created failed");
      else toast.error("Post created failed");
    },
  });
}

export function useUpdateQuze(token: string, onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: (data: CreateQuzePayload) => updateQuze(token, data),

    onSuccess: (data) => {
      toast.success(data.message || "Quze update successfully!");

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Quze update failed");
      else toast.error("Quze update failed");
    },
  });
}

export function useAllGetQuze() {
  return useQuery<ApiResponse>({
    queryKey: ["quze"],
    queryFn: () => {
      return getAllQuze();
    },
  });
}


export function useSingelGetQuze(id:string) {
  return useQuery<SingelApiResponse>({
    queryKey: ["singel-quze"],
    queryFn: () => {
      return getSingelQuze(id);
    },
  });
}


export function useLogout(token:string, onSuccessCallback?: () => void) {  
  return useMutation({ mutationFn: () => logout(token),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Logout  successfully");
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "logout failed");
      else toast.error("logout failed");
    },
  });
}