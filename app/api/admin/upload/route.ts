
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { uploadPortfolioFile } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json(
      { error: "You are not authorized to upload images." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB." },
        { status: 400 }
      );
    }

    const allowedTypes: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };

    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        {
          error:
            "Supported formats: JPG, PNG, WEBP, and GIF.",
        },
        { status: 400 }
      );
    }

    const publicPath = await uploadPortfolioFile(file, "posts");

    return NextResponse.json({
      success: true,
      path: publicPath,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      {
        error: "Unable to upload the image. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
