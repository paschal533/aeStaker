import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "mqj23itr",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token:
    "skVNtG8326p1e8btzzKD0gcP0i7aZD7WqGivZaXuC3ax3dcJAaq3TyocfMFxZDS6y6XDDkiWQj4HdNO8qdWWBU2jM3DP4DPqQRS8pOeHgPtmBncEJm0NwbglPrLGS8yl4qLnwXYgXkksygfOWEBeMDpjQ9o10k2AMkrJulGuD6qYXRvvV7q6",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
