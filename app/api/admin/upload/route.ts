
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();

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

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "images",
      "blog"
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extension}`;

    const filePath = path.join(
      uploadDirectory,
      uniqueName
    );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const publicPath = `/images/blog/${uniqueName}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      {
        error: "You are not authorized to upload images.",
      },
      {
        status: 401,
      }
    );
  }
}

