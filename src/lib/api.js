import dotenv from "dotenv";
import { getNumberOfDaysFromNow, convertDifferenceOfDays } from "../utils/dates";
dotenv.config();
const API_URL = process.env.WP_URL;

async function fetchAPI(query, { variables } = {}) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables })
    });
    const json = await res.json();
    if (json.errors) {
      throw new Error("Failed to fetch wordpress API");
    }
    return json;
  } catch (e) {
    console.error(e);
  }
}

export async function getPosts() {
  let {
    data: { posts }
  } = await fetchAPI(`
   query getPosts {
        posts(first: 6) {
          nodes {
            title(format: RENDERED)
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                title(format: RENDERED)
                altText
                srcSet
              }
            }
            date
            categories {
              nodes {
                name
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
    }
  `);

  posts = posts.nodes.map(({ title, slug, excerpt, featuredImage: { node: image }, date, categories: { nodes: categories } }) => ({
    title,
    slug,
    excerpt,
    image,
    date: convertDifferenceOfDays(getNumberOfDaysFromNow(new Date(date))),
    categories: categories.map((category) => (category.parent ? category.parent.node.name : category.name))
  }));

  return posts;
}
