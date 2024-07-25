import prisma from "@/utils/prisma";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const job = await prisma.job.findUnique({ where: { id: parseInt(id) } });
            if (!job) return res.status(404).json({ error: 'Job not found' });

            res.json(job);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(405).end();
    }
}
