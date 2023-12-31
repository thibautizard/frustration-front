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
                sourceUrl
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
            author {
              node {
                lastName
                firstName
              }
            }
          }
        }
    }
  `);

  posts = posts.nodes.map(({ title, slug, excerpt, featuredImage: { node: image }, date, categories: { nodes: categories }, author: { node: author } }) => ({
    title,
    author: `${author.firstName ?? ""} ${author.lastName ?? ""}`,
    slug,
    excerpt,
    image,
    date: convertDifferenceOfDays(getNumberOfDaysFromNow(new Date(date))),
    categories: categories.map((category) => (category.parent ? category.parent.node.name : category.name))
  }));

  return posts;
}

export async function getInterviews() {
  const {
    data: { posts }
  } = await fetchAPI(`
   query getInterviews {
        posts(where: {categoryName: "Entretiens"}, first: 6) {
          nodes {
            title(format: RENDERED)
            slug
            featuredImage {
              node {
                title
                altText
                sourceUrl
              }
            }
          }
        }
    }
  `);

  const interviews = posts.nodes.map(({ title, slug, featuredImage: { node: image } }) => ({
    title,
    slug,
    image
  }));

  return interviews;
}
