
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(
  process.cwd(),
  "content",
  "blog"
);

const BLOG_IMAGE_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "blog"
);

export type PostStatus =
  | "draft"
  | "published";

export type Post = {
  slug: string;
  title: string;
  subheading?: string;
  author?: string;
  date: string;
  image?: string;
  video?: string;
  status?: PostStatus;
  body?: string;
};

export type PostInput = Omit<
  Post,
  "slug" | "body"
> & {
  body: string;
  slug?: string;
};

/* =========================================================
   FILE HELPERS
========================================================= */

function filePath(
  slug: string,
  extension = "mdx"
) {
  return path.join(
    BLOG_DIR,
    `${slug}.${extension}`
  );
}

function findPostFile(
  slug: string
): string | null {
  const mdxPath = filePath(
    slug,
    "mdx"
  );

  const mdPath = filePath(
    slug,
    "md"
  );

  if (fs.existsSync(mdxPath)) {
    return mdxPath;
  }

  if (fs.existsSync(mdPath)) {
    return mdPath;
  }

  return null;
}

/* =========================================================
   SLUG
========================================================= */

export function makeSlug(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/* =========================================================
   READ POST
========================================================= */

function readPost(
  postFilePath: string
): Post {
  const source =
    fs.readFileSync(
      postFilePath,
      "utf8"
    );

  const {
    data,
    content,
  } = matter(source);

  const filename =
    path.basename(postFilePath);

  return {
    slug: filename.replace(
      /\.(md|mdx)$/,
      ""
    ),

    title: String(
      data.title ?? ""
    ),

    subheading: data.subheading
      ? String(data.subheading)
      : undefined,

    author: data.author
      ? String(data.author)
      : undefined,

    date: String(
      data.date ?? ""
    ),

    image: data.image
      ? String(data.image)
      : undefined,

    video: data.video
      ? String(data.video)
      : undefined,

    status:
      data.status === "published"
        ? "published"
        : "draft",

    body: content.trim(),
  };
}

/* =========================================================
   GET ALL POSTS
========================================================= */

export function getAllPosts(
  {
    includeDrafts = false,
  }: {
    includeDrafts?: boolean;
  } = {}
): Post[] {
  if (
    !fs.existsSync(BLOG_DIR)
  ) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) =>
      /\.(md|mdx)$/.test(file)
    )
    .map((file) =>
      readPost(
        path.join(
          BLOG_DIR,
          file
        )
      )
    )
    .filter(
      (post) =>
        includeDrafts ||
        post.status !== "draft"
    )
    .sort(
      (a, b) =>
        new Date(
          b.date
        ).getTime() -
        new Date(
          a.date
        ).getTime()
    );
}

/* =========================================================
   GET POST BY SLUG
========================================================= */

export function getPostBySlug(
  slug: string
): Post | null {
  const safeSlug =
    makeSlug(slug);

  if (!safeSlug) {
    return null;
  }

  const postFile =
    findPostFile(safeSlug);

  if (!postFile) {
    return null;
  }

  return readPost(postFile);
}

/* =========================================================
   RECENT POSTS
========================================================= */

export function getRecentPosts(
  count = 3
): Post[] {
  return getAllPosts().slice(
    0,
    count
  );
}

/* =========================================================
   ALL SLUGS
========================================================= */

export function getAllSlugs(): string[] {
  return getAllPosts().map(
    (post) => post.slug
  );
}

/* =========================================================
   SERIALIZE POST
========================================================= */

function serializePost(
  input: PostInput
) {
  const title =
    input.title?.trim();

  const body =
    input.body?.trim();

  if (!title) {
    throw new Error(
      "Post title is required."
    );
  }

  if (!body) {
    throw new Error(
      "Post content is required."
    );
  }

  if (!input.date) {
    throw new Error(
      "Post date is required."
    );
  }

  const frontmatter: Record<
    string,
    string
  > = {
    title,

    author:
      input.author?.trim() ||
      "Resty Montero",

    date: input.date,

    status:
      input.status ===
      "published"
        ? "published"
        : "draft",
  };

  const subheading =
    input.subheading?.trim();

  if (subheading) {
    frontmatter.subheading =
      subheading;
  }

  const image =
    input.image?.trim();

  if (image) {
    frontmatter.image =
      image;
  }

  const video = input.video?.trim();

  if (video) {
    frontmatter.video = video;
  }

  return matter.stringify(
    `${body}\n`,
    frontmatter
  );
}

/* =========================================================
   SAVE LOCAL IMAGE
========================================================= */

export async function savePostImage(
  file: File
): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error(
      "No image was selected."
    );
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (
    !allowedTypes.includes(
      file.type
    )
  ) {
    throw new Error(
      "Only JPG, PNG, WEBP, and GIF images are allowed."
    );
  }

  const maxSize =
    5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error(
      "Image must be smaller than 5MB."
    );
  }

  fs.mkdirSync(
    BLOG_IMAGE_DIR,
    {
      recursive: true,
    }
  );

  const extensionMap: Record<
    string,
    string
  > = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  const extension =
    extensionMap[file.type];

  const originalName =
    file.name
      .replace(
        /\.[^/.]+$/,
        ""
      )
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      )
      .slice(0, 50);

  const uniqueName =
    `${originalName || "cover"}-${Date.now()}.${extension}`;

  const destination =
    path.join(
      BLOG_IMAGE_DIR,
      uniqueName
    );

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  await fs.promises.writeFile(
    destination,
    buffer
  );

  return `/images/blog/${uniqueName}`;
}

/* =========================================================
   DELETE LOCAL IMAGE
========================================================= */

export async function deletePostImage(
  imagePath?: string
) {
  if (
    !imagePath ||
    !imagePath.startsWith(
      "/images/blog/"
    )
  ) {
    return;
  }

  const filename =
    path.basename(imagePath);

  const imageFile =
    path.join(
      BLOG_IMAGE_DIR,
      filename
    );

  if (
    fs.existsSync(imageFile)
  ) {
    await fs.promises.unlink(
      imageFile
    );
  }
}

/* =========================================================
   CREATE POST
========================================================= */

export function createPost(
  input: PostInput
) {
  const slug = makeSlug(
    input.slug ||
      input.title
  );

  if (!slug) {
    throw new Error(
      "A title or slug is required."
    );
  }

  if (
    findPostFile(slug)
  ) {
    throw new Error(
      "A post with this slug already exists."
    );
  }

  fs.mkdirSync(
    BLOG_DIR,
    {
      recursive: true,
    }
  );

  const destination =
    filePath(
      slug,
      "mdx"
    );

  fs.writeFileSync(
    destination,
    serializePost(input),
    {
      encoding: "utf8",
      flag: "wx",
    }
  );

  return slug;
}

/* =========================================================
   UPDATE POST
========================================================= */

export function updatePost(
  previousSlug: string,
  input: PostInput
) {
  const currentSlug =
    makeSlug(previousSlug);

  const nextSlug =
    makeSlug(
      input.slug ||
        input.title
    );

  if (!currentSlug) {
    throw new Error(
      "Current post slug is required."
    );
  }

  if (!nextSlug) {
    throw new Error(
      "A title or slug is required."
    );
  }

  const currentFile =
    findPostFile(
      currentSlug
    );

  if (!currentFile) {
    throw new Error(
      "Post not found."
    );
  }

  if (
    currentSlug !==
      nextSlug &&
    findPostFile(
      nextSlug
    )
  ) {
    throw new Error(
      "A post with this slug already exists."
    );
  }

  const nextFile =
    filePath(
      nextSlug,
      "mdx"
    );

  const serialized =
    serializePost(input);

  if (
    currentSlug !==
    nextSlug
  ) {
    fs.renameSync(
      currentFile,
      nextFile
    );
  }

  fs.writeFileSync(
    nextFile,
    serialized,
    {
      encoding: "utf8",
    }
  );

  return nextSlug;
}

/* =========================================================
   DELETE POST
========================================================= */

export async function deletePost(
  slug: string
) {
  const safeSlug =
    makeSlug(slug);

  if (!safeSlug) {
    throw new Error(
      "Post slug is required."
    );
  }

  const postFile =
    findPostFile(
      safeSlug
    );

  if (!postFile) {
    throw new Error(
      "Post not found."
    );
  }

  const post =
    readPost(postFile);

  await deletePostImage(
    post.image
  );

  await fs.promises.unlink(
    postFile
  );
}
