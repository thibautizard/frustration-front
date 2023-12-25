import dotenv from "dotenv";
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

export async function getAllPostsWithSlugs() {
  const {
    data: { posts }
  } = await fetchAPI(`
   query getPostsWithSlugs {
      posts(first: 6) {
        nodes {
          title(format: RENDERED)
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              sourceUrl(size: ET_PB_IMAGE__RESPONSIVE__DESKTOP)
              title(format: RENDERED)
            }
          }
        }
      }
    }
  `);

  console.log(posts.nodes[0].featuredImage);
  return posts.nodes;
}
