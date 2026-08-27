
"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = searchParams.get("saved");
    const deleted = searchParams.get("deleted");
    const error = searchParams.get("error");

    if (saved === "created") {
      toast.success("Post created successfully!");
    }

    if (saved === "updated") {
      toast.success("Post updated successfully!");
    }

    if (deleted === "1") {
      toast.success("Post deleted successfully!");
    }

    if (error) {
      toast.error(decodeURIComponent(error));
    }

    // Remove query parameters after displaying the toast
    if (saved || deleted || error) {
      const url = new URL(window.location.href);

      url.searchParams.delete("saved");
      url.searchParams.delete("deleted");
      url.searchParams.delete("error");

      router.replace(`${pathname}${url.search}`, {
        scroll: false,
      });
    }
  }, [searchParams, pathname, router]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
}

