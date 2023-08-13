import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Regenerate the following static pages i.e. reinvoke getStaticProps for them
    await Promise.all([
      res.revalidate(`/clubs/static-isr-timed/${req.query.clubId}`),
      res.revalidate(`/clubs/static-isr-on-demand-only/${req.query.clubId}`),
    ]);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
}
