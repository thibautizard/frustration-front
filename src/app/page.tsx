import "normalize.css/normalize.css";
import Image from "next/image";
export default async function Home() {
	const posts = await getPosts();

	return (
		<>
			<h1>Page d'accueil de Frustration Magazine</h1>
			{posts.map(async (post) => {
				let url = "";

				if (post?.featured_media) {
					url = await getImageUrl(post.featured_media);
				}
				return (
					<>
						<p key={post.id}>
							{post.slug} {url}
						</p>
						<Image
							src={url}
							width="200"
							height="200"
						></Image>
					</>
				);
			})}
		</>
	);
}

async function getPosts() {
	const res = await fetch("http://frustrationmagazine.fr/wp-json//wp/v2/posts/");

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch posts");
	}

	return res.json();
}

async function getImageUrl(featuredMediaId: string) {
	const res = await fetch(`http://frustrationmagazine.fr/wp-json/wp/v2/media/${featuredMediaId}`)
		.then((response) => response.json())
		.then((mediaData) => mediaData.source_url)
		.catch(() => new Error("Failed to fetch image from a post"));

	console.log(res);

	return res;
}
