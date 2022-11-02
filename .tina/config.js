import { defineStaticConfig } from "tinacms";

const schema = {
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH ||
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
      process.env.HEAD,
    token: process.env.TINA_TOKEN,
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Pages",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "title",
          label: "Main Heading",
          type: "string",
          isTitle: true,
          required: true,
        },
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          } else {
            return `/${document._sys.filename}`;
          }
        },
      },
    },
    {
      label: "Posts",
      name: "post",
      path: "content/posts",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          isTitle: true,
          required: true,
        },
        {
          type: "object",
          name: "advanced",
          label: "Advanced",
          fields: [
            {
              type: "image",
              label: "Main Image",
              name: "image",
            },
            {
              type: "datetime",
              label: "Date",
              name: "date",
            },
            {
              type: "string",
              label: "URL",
              description: "The page \"slug\"",
              name: "slug",

            },
            {
              type: "rich-text",
              label: "Description",
              name: "description",
            },
          ],
        },
        {
          type: "rich-text",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            defaultValue: {
              type: "root",
              children: [
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "My great new post",
                    },
                  ],
                },
              ],
            },
          },
          templates: [
            {
              name: "Tweet",
              label: "Tweet",
              fields: [
                {
                  ui: {
                    defaultValue: "1533470815550939136",
                  },
                  name: "tweetId",
                  label: "Tweet ID",
                  type: "string",
                  description: "Unique number (about 20-digits) at the end of the Tweet URL",
                },
              ],
            },
            {
              name: "CaptionedImage",
              label: "Img with caption",
              fields: [
                {
                  ui: {
                    defaultValue:
                      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                  },
                  name: "imgUrl",
                  label: "Image URL",
                  type: "image",
                },
                {
                  ui: {
                    defaultValue: "This is my caption",
                  },
                  name: "caption",
                  label: "Caption",
                  type: "string",
                },
                {
                  ui: {
                    alt: "This is my caption",
                  },
                  name: "alt",
                  label: "Image alt text",
                  type: "string",
                },
              ],
            },
            {
              name: "TextBox",
              label: "Text Box",
              fields: [
                {
                  name: "text",
                  label: "Text",
                  type: "rich-text",
                  isBody: false,
                },
              ],
            },
            {
              name: "PullQuote",
              label: "Pull Quote",
              fields: [
                {
                  name: "text",
                  label: "Text",
                  type: "string",
                  ui: {
                    defaultValue: "This is my quote",
                    component: "textarea",
                  },
                },
                {
                  name: "author",
                  label: "Author",
                  description: "Optional",
                  type: "string",
                  ui: {
                    defaultValue: "Herman Melville",
                  },
                },
                {
                  name: "authorLink",
                  label: "Author Link",
                  description: "Optional",
                  type: "string",
                  ui: {
                    defaultValue: "https://en.wikipedia.org/wiki/Herman_Melville",
                  },
                },
              ],
            },
          ],
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/posts/${document._sys.filename}`;
        },
      },
    },
    {
      label: "Authors",
      name: "author",
      path: "content/authors",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
          isTitle: true,
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
    {
      label: "Site Settings",
      name: "settins",
      path: "content/settings",
      format: "json",
      fields: [
        {
          name: "siteName",
          label: "Site Name",
          type: "string",
          description: "This is used in the footer and site meta data"
        },
        {
          type: "object",
          label: "Header",
          name: "header",
          fields: [
            {
              label: "Links",
              name: "links",
              type: "object",
              list: true,
              ui: {
                // This allows the customization of the list item UI
                // Data can be accessed by item?.<Name of field>
                itemProps: (item) => {
                  return { label: `${item?.text}` }
                },
                // Setting a default will auto-populate new items with the given values
                defaultItem: {
                  text: "My page",
                  url: "/my-page",
                }
              },
              fields: [
                {
                  label: "Text",
                  name: "text",
                  type: "string",
                  required: true,
                },
                {
                  label: "URL",
                  name: "url",
                  type: "string",
                  required: true,
                  description: "You can use relative links like /about or absolute links like https://mysite.com/about",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name",
            },
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              options: [
                {
                  label: "Blue",
                  value: "blue",
                },
                {
                  label: "Teal",
                  value: "teal",
                },
                {
                  label: "Green",
                  value: "green",
                },
                {
                  label: "Red",
                  value: "red",
                },
                {
                  label: "Pink",
                  value: "pink",
                },
                {
                  label: "Purple",
                  value: "purple",
                },
                {
                  label: "Orange",
                  value: "orange",
                },
                {
                  label: "Yellow",
                  value: "yellow",
                },
              ],
            },
            {
              type: "string",
              name: "font",
              label: "Font Family",
              options: [
                {
                  label: "System Sans",
                  value: "sans",
                },
                {
                  label: "Nunito",
                  value: "nunito",
                },
                {
                  label: "Lato",
                  value: "lato",
                },
              ],
            },
            {
              type: "string",
              name: "icon",
              label: "Icon Set",
              options: [
                {
                  label: "Boxicons",
                  value: "boxicon",
                },
                {
                  label: "Heroicons",
                  value: "heroicon",
                },
              ],
            },
            {
              type: "string",
              name: "darkMode",
              label: "Dark Mode",
              options: [
                {
                  label: "System",
                  value: "system",
                },
                {
                  label: "Light",
                  value: "light",
                },
                {
                  label: "Dark",
                  value: "dark",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config